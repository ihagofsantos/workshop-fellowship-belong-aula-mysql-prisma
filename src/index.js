// src/index.js
// Demonstração de operações CRUD com Prisma em JavaScript puro

import { prisma, disconnect } from './client.js'

async function main() {
  console.log('🔌 Conectando ao banco de dados...')

  // ==========================================
  // CREATE - Criar registros
  // ==========================================

  console.log('\n📝 Criando alunos...')

  const joao = await prisma.aluno.create({
    data: {
      nome: 'João Silva',
      email: 'joao@email.com',
      idade: 25,
    },
  })

  const maria = await prisma.aluno.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria@email.com',
      idade: 23,
    },
  })

  const pedro = await prisma.aluno.create({
    data: {
      nome: 'Pedro Souza',
      email: 'pedro@email.com',
      idade: 28,
    },
  })

  console.log('✅ Alunos criados!')
  console.table([joao, maria, pedro].map(a => ({ id: a.id, nome: a.nome, email: a.email })))

  console.log('\n📝 Criando disciplinas...')

  const bd = await prisma.disciplina.create({
    data: {
      nome: 'Banco de Dados',
      codigo: 'BD102',
      cargaHoraria: 60,
      professor: 'Prof. Carlos',
      descricao: 'Conceitos e práticas de banco de dados',
    },
  })

  const pw = await prisma.disciplina.create({
    data: {
      nome: 'Programação Web',
      codigo: 'PW101',
      cargaHoraria: 80,
      professor: 'Prof. Ana',
      descricao: 'Desenvolvimento web com HTML, CSS e JavaScript',
    },
  })

  const ed = await prisma.disciplina.create({
    data: {
      nome: 'Estruturas de Dados',
      codigo: 'ED103',
      cargaHoraria: 90,
      professor: 'Prof. Roberto',
      descricao: 'Listas, pilhas, filas, árvores e grafos',
    },
  })

  console.log('✅ Disciplinas criadas!')
  console.table([bd, pw, ed].map(d => ({ id: d.id, nome: d.nome, codigo: d.codigo })))

  console.log('\n📝 Criando matrículas...')

  const matricula1 = await prisma.matricula.create({
    data: {
      alunoId: joao.id,
      disciplinaId: bd.id,
      nota: 8.5,
      semestre: '2024.1',
    },
  })

  const matricula2 = await prisma.matricula.create({
    data: {
      alunoId: joao.id,
      disciplinaId: pw.id,
      semestre: '2024.1',
    },
  })

  const matricula3 = await prisma.matricula.create({
    data: {
      alunoId: maria.id,
      disciplinaId: bd.id,
      nota: 9.0,
      semestre: '2024.1',
    },
  })

  const matricula4 = await prisma.matricula.create({
    data: {
      alunoId: maria.id,
      disciplinaId: ed.id,
      nota: 7.5,
      semestre: '2024.1',
    },
  })

  const matricula5 = await prisma.matricula.create({
    data: {
      alunoId: pedro.id,
      disciplinaId: pw.id,
      nota: 8.0,
      semestre: '2024.1',
    },
  })

  console.log('✅ Matrículas criadas!')
  console.table([matricula1, matricula2, matricula3, matricula4, matricula5]
    .map(m => ({ id: m.id, alunoId: m.alunoId, disciplinaId: m.disciplinaId, nota: m.nota })))

  // ==========================================
  // READ - Ler registros
  // ==========================================

  console.log('\n📖 Listar todos os alunos:')
  const todosAlunos = await prisma.aluno.findMany()
  console.table(todosAlunos.map(a => ({ id: a.id, nome: a.nome, email: a.email, idade: a.idade })))

  console.log('\n📖 Buscar aluno por ID:')
  const alunoBuscado = await prisma.aluno.findUnique({
    where: { id: 1 },
  })
  console.log(alunoBuscado)

  console.log('\n📖 Buscar aluno com matrículas (include = JOIN):')
  const alunoComMatriculas = await prisma.aluno.findUnique({
    where: { id: 1 },
    include: {
      matriculas: {
        include: {
          disciplina: true,
        },
      },
    },
  })
  console.log('Aluno:', alunoComMatriculas?.nome)
  console.log('Matrículas:', alunoComMatriculas?.matriculas.length)
  alunoComMatriculas?.matriculas.forEach(m => {
    console.log(`  - ${m.disciplina.nome}: nota ${m.nota || 'N/A'}`)
  })

  console.log('\n📖 Listar disciplinas:')
  const todasDisciplinas = await prisma.disciplina.findMany()
  console.table(todasDisciplinas.map(d => ({ id: d.id, nome: d.nome, codigo: d.codigo, cargaHoraria: d.cargaHoraria })))

  console.log('\n📖 Listar todas as matrículas com detalhes:')
  const todasMatriculas = await prisma.matricula.findMany({
    include: {
      aluno: true,
      disciplina: true,
    },
  })
  todasMatriculas.forEach(m => {
    console.log(`${m.aluno.nome} - ${m.disciplina.nome}: ${m.nota || 'N/A'}`)
  })

  console.log('\n📖 Buscar alunos por idade (WHERE):')
  const alunosMaiores25 = await prisma.aluno.findMany({
    where: {
      idade: {
        gt: 25,
      },
    },
  })
  console.table(alunosMaiores25.map(a => ({ id: a.id, nome: a.nome, idade: a.idade })))

  console.log('\n📖 Buscar alunos por parte do nome (LIKE - contains):')
  const alunosComSilva = await prisma.aluno.findMany({
    where: {
      nome: {
        contains: 'Silva',
      },
    },
  })
  console.table(alunosComSilva.map(a => ({ id: a.id, nome: a.nome })))

  // ==========================================
  // UPDATE - Atualizar registros
  // ==========================================

  console.log('\n✏️ Atualizando idade do João...')
  const joaoAtualizado = await prisma.aluno.update({
    where: { id: 1 },
    data: { idade: 26 },
  })
  console.log('Nova idade:', joaoAtualizado.idade)

  console.log('\n✏️ Atualizando nota de uma matrícula...')
  const matriculaAtualizada = await prisma.matricula.update({
    where: { id: 1 },
    data: { nota: 9.5 },
  })
  console.log('Nova nota:', matriculaAtualizada.nota)

  // ==========================================
  // DELETE - Excluir registros
  // ==========================================

  console.log('\n🗑️ Excluindo uma matrícula...')
  await prisma.matricula.delete({
    where: { id: 5 }, // Matrícula do Pedro em Programação Web
  })
  console.log('✅ Matrícula excluída!')

  // ==========================================
  // EXTRAS - Consultas avançadas
  // ==========================================

  console.log('\n📊 Estatísticas:')
  const totalAlunos = await prisma.aluno.count()
  const totalDisciplinas = await prisma.disciplina.count()
  const totalMatriculas = await prisma.matricula.count()
  console.log(`Total de alunos: ${totalAlunos}`)
  console.log(`Total de disciplinas: ${totalDisciplinas}`)
  console.log(`Total de matrículas: ${totalMatriculas}`)

  console.log('\n📊 Alunos ordenados por idade:')
  const alunosOrdenados = await prisma.aluno.findMany({
    orderBy: {
      idade: 'desc',
    },
    select: {
      id: true,
      nome: true,
      idade: true,
    },
  })
  console.table(alunosOrdenados)

  console.log('\n✅ Demonstração concluída com sucesso!')
}

main()
  .catch((error) => {
    console.error('❌ Erro ao executar:', error)
  })
  .finally(async () => {
    await disconnect()
    console.log('\n👋 Conexão encerrada!')
  })
