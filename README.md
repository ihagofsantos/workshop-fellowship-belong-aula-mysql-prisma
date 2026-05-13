# 🎓 Projeto Prático: Sistema Escolar com Prisma e MySQL

Este projeto é um exemplo prático para a aula de **Introdução a Banco de Dados com MySQL e Prisma**.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 ou superior) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** (opcional) - [Download](https://git-scm.com/)

## 🚀 Configuração Rápida

### 1. Instalar dependências

```bash
cd projeto-pratico
npm install
```

### 2. Configurar MySQL

Crie o arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/escola"
```

### 3. Criar o banco de dados

Crie o banco de dados `escola` no MySQL:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE escola;
EXIT;
```

### 4. Inicializar o Prisma

```bash
# Gerar o Prisma Client
npm run generate

# Criar as tabelas (migration)
npm run migrate
```

💡 **Opcional**: Use o Prisma Studio para visualizar e editar os dados:

```bash
npm run studio
```

### 5. Popular o banco com dados de exemplo

```bash
npm run seed
```

### 6. Executar o projeto

```bash
npm run dev
```

O projeto vai demonstrar todas as operações CRUD com Prisma.

## 📁 Estrutura do Projeto

```
projeto-pratico/
├── prisma/
│   ├── schema.prisma       # Schema do Prisma (define os models)
│   └── seed.js           # Script para popular dados iniciais
├── src/
│   ├── client.js          # Configuração do Prisma Client
│   └── index.js         # Arquivo principal com demonstrações
├── package.json         # Dependências do projeto
└── README.md            # Este arquivo
```

## 🎯 O que você vai aprender

### Schema Prisma

O `schema.prisma` é um arquivo único que define toda a estrutura do banco:

```prisma
model Aluno {
  id        Int      @id @default(autoincrement())
  nome      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(100)
  idade     Int?
  telefone  String?  @db.VarChar(20)
  ativo     Boolean  @default(true)
  createdAt DateTime @default(now())

  matriculas Matricula[]
}
```

### Operações CRUD

#### CREATE - Inserir dados

```javascript
const aluno = await prisma.aluno.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    idade: 25,
  },
})
```

#### READ - Consultar dados

```javascript
// Buscar todos
const todos = await prisma.aluno.findMany()

// Buscar por ID
const um = await prisma.aluno.findUnique({
  where: { id: 1 },
})

// Com JOIN (include)
const comMatriculas = await prisma.aluno.findUnique({
  where: { id: 1 },
  include: {
    matriculas: {
      include: {
        disciplina: true,
      },
    },
  },
})
```

#### UPDATE - Atualizar dados

```javascript
await prisma.aluno.update({
  where: { id: 1 },
  data: { idade: 26 },
})
```

#### DELETE - Excluir dados

```javascript
await prisma.aluno.delete({
  where: { id: 1 },
})
```

### Filtros e Consultas Avançadas

```javascript
// Filtrar por condição
const alunosMaiores25 = await prisma.aluno.findMany({
  where: {
    idade: {
      gt: 25,
    },
  },
})

// Busca por parte do texto (LIKE)
const alunosComSilva = await prisma.aluno.findMany({
  where: {
    nome: {
      contains: 'Silva',
    },
  },
})

// Ordenar e limitar
const alunosOrdenados = await prisma.aluno.findMany({
  orderBy: {
    idade: 'desc',
  },
  take: 10,
})

// Contar registros
const total = await prisma.aluno.count()
```

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm install` | Instalar dependências |
| `npm run generate` | Gerar o Prisma Client |
| `npm run migrate` | Criar/alterar tabelas no banco |
| `npm run studio` | Abrir Prisma Studio (interface visual) |
| `npm run seed` | Popular o banco com dados de exemplo |
| `npm run dev` | Executar o projeto |

## 📊 Modelo do Banco de Dados

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   ALUNOS     │       │ MATRÍCULAS   │       │ DISCIPLINAS │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id (PK)     │──────>│ id (PK)      │<──────│ id (PK)     │
│ nome        │       │ aluno_id (FK) │       │ nome        │
│ email       │       │ disciplina_id(FK)     │ codigo      │
│ idade       │       │ data_matricula│       │ carga_horaria│
│ telefone    │       │ semestre     │       │ professor   │
│ ativo       │       │ nota         │       │ descricao   │
│ created_at  │       │ status       │       │ ativa       │
└─────────────┘       └──────────────┘       └─────────────┘
```

### Relacionamentos

- **Aluno ↔ Matricula**: 1:N (Um aluno tem muitas matrículas)
- **Disciplina ↔ Matricula**: 1:N (Uma disciplina tem muitas matrículas)
- **Aluno ↔ Disciplina**: N:N (Através da tabela Matricula)

## 🧪 Exercícios Práticos

Após executar o projeto e entender o código, tente:

1. **Adicionar um campo** `data_nascimento` na entidade Aluno
2. **Criar uma nova model** chamada `Turma` com relacionamento 1:N com Aluno
3. **Implementar uma função** que busca alunos por parte do nome (contém)
4. **Criar uma função** que calcula a média de notas de um aluno
5. **Usar Prisma Studio** para visualizar e editar os dados interativamente

## 📚 Recursos Adicionais

- [Documentação oficial do Prisma](https://www.prisma.io/docs)
- [Documentação oficial do MySQL](https://dev.mysql.com/doc/)
- [Material da aula](../aula-introducao-banco-dados-mysql-prisma.md)

## ❓ Solução de Problemas

### Erro: "Access denied for user 'root'@'localhost'"

**Solução:** Verifique sua senha do MySQL e atualize no arquivo `.env`

### Erro: "Unknown database 'escola'"

**Solução:** Crie o banco de dados no MySQL:
```sql
CREATE DATABASE escola;
```

### Erro: "Table doesn't exist"

**Solução:** Execute `npm run migrate` para criar as tabelas

### Erro: "Prisma Client is not generated"

**Solução:** Execute `npm run generate` para gerar o client

## 📝 Notas Importantes

- ⚠️ Use **migrations** em produção para controlar mudanças no schema
- 📊 O Prisma mostra todas as queries SQL no console quando `log: ['query']` está ativo
- 🔄 `onDelete: Cascade` remove registros relacionados automaticamente
- 🖥️ **Prisma Studio** é uma ferramenta visual excelente para explorar o banco
- 📋 Sempre use Transactions para operações que precisam ser atômicas

---

**Bons estudos! 🎓**
