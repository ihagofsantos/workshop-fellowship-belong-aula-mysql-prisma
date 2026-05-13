// prisma/seed.js
// Script para popular o banco de dados com dados iniciais

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  console.log('\n🧹 Limpando dados existentes...')
  await prisma.matricula.deleteMany()
  await prisma.disciplina.deleteMany()
  await prisma.aluno.deleteMany()
  console.log('✅ Dados limpos!')

  // Criar alunos
  console.log('\n👤 Criando alunos...')
  const alunos = await Promise.all([
    prisma.aluno.create({
      data: {
        nome: 'João Silva',
        email: 'joao@email.com',
        idade: 25,
        telefone: '(11) 98765-4321',
        dataNascimento: new Date('1999-05-15'),
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Maria Santos',
        email: 'maria@email.com',
        idade: 23,
        telefone: '(11) 91234-5678',
        dataNascimento: new Date('2001-03-22'),
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Pedro Souza',
        email: 'pedro@email.com',
        idade: 28,
        telefone: '(11) 92345-6789',
        dataNascimento: new Date('1996-08-10'),
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Ana Costa',
        email: 'ana@email.com',
        idade: 22,
        telefone: '(11) 93456-7890',
        dataNascimento: new Date('2002-11-05'),
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Carlos Lima',
        email: 'carlos@email.com',
        idade: 30,
        telefone: '(11) 94567-8901',
        dataNascimento: new Date('1994-01-30'),
      },
    }),
  ])
  console.log(`✅ Criados ${alunos.length} alunos!`)

  // Criar disciplinas
  console.log('\n📚 Criando disciplinas...')
  const disciplinas = await Promise.all([
    prisma.disciplina.create({
      data: {
        nome: 'Banco de Dados',
        codigo: 'BD102',
        cargaHoraria: 60,
        professor: 'Prof. Carlos',
        descricao: 'Conceitos e práticas de banco de dados relacionais e não relacionais.',
      },
    }),
    prisma.disciplina.create({
      data: {
        nome: 'Programação Web',
        codigo: 'PW101',
        cargaHoraria: 80,
        professor: 'Prof. Ana',
        descricao: 'Desenvolvimento web moderno com HTML, CSS, JavaScript e frameworks.',
      },
    }),
    prisma.disciplina.create({
      data: {
        nome: 'Estruturas de Dados',
        codigo: 'ED103',
        cargaHoraria: 90,
        professor: 'Prof. Roberto',
        descricao: 'Estudo de listas, pilhas, filas, árvores, grafos e algoritmos.',
      },
    }),
    prisma.disciplina.create({
      data: {
        nome: 'Engenharia de Software',
        codigo: 'ES104',
        cargaHoraria: 75,
        professor: 'Prof. Helena',
        descricao: 'Processos de desenvolvimento, metodologias ágeis e padrões de projeto.',
      },
    }),
  ])
  console.log(`✅ Criadas ${disciplinas.length} disciplinas!`)

  // Criar matrículas
  console.log('\n📝 Criando matrículas...')
  const matriculas = await Promise.all([
    // João
    prisma.matricula.create({
      data: {
        alunoId: alunos[0].id,
        disciplinaId: disciplinas[0].id,
        nota: 8.5,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[0].id,
        disciplinaId: disciplinas[1].id,
        nota: 7.0,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[0].id,
        disciplinaId: disciplinas[2].id,
        semestre: '2024.2',
        status: 'ativa',
      },
    }),
    // Maria
    prisma.matricula.create({
      data: {
        alunoId: alunos[1].id,
        disciplinaId: disciplinas[0].id,
        nota: 9.0,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[1].id,
        disciplinaId: disciplinas[3].id,
        semestre: '2024.1',
        status: 'ativa',
      },
    }),
    // Pedro
    prisma.matricula.create({
      data: {
        alunoId: alunos[2].id,
        disciplinaId: disciplinas[1].id,
        nota: 8.0,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[2].id,
        disciplinaId: disciplinas[2].id,
        nota: 6.5,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    // Ana
    prisma.matricula.create({
      data: {
        alunoId: alunos[3].id,
        disciplinaId: disciplinas[0].id,
        semestre: '2024.2',
        status: 'ativa',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[3].id,
        disciplinaId: disciplinas[1].id,
        semestre: '2024.2',
        status: 'ativa',
      },
    }),
    // Carlos
    prisma.matricula.create({
      data: {
        alunoId: alunos[4].id,
        disciplinaId: disciplinas[2].id,
        nota: 7.5,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
    prisma.matricula.create({
      data: {
        alunoId: alunos[4].id,
        disciplinaId: disciplinas[3].id,
        nota: 8.8,
        semestre: '2024.1',
        status: 'concluida',
      },
    }),
  ])
  console.log(`✅ Criadas ${matriculas.length} matrículas!`)

  // Estatísticas finais
  console.log('\n📊 Estatísticas do banco de dados:')
  console.log(`  Alunos: ${await prisma.aluno.count()}`)
  console.log(`  Disciplinas: ${await prisma.disciplina.count()}`)
  console.log(`  Matrículas: ${await prisma.matricula.count()}`)

  console.log('\n✅ Seed concluído com sucesso!')
}

seed()
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
