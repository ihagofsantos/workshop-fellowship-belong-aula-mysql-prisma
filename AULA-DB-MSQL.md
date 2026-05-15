# Aula: Introdução a Banco de Dados com MySQL e Prisma


## 1. O que é Banco de Dados?

### Definição

Um **Banco de Dados** (Database) é uma coleção organizada de dados, armazenados e acessados eletronicamente. É o componente fundamental de qualquer aplicação que precisa persistir informações.

### Analogia

Imagine um arquivo de escritório tradicional:
- **Gavetas** = Tabelas
- **Pastas** = Registros
- **Documentos** = Dados dentro dos registros

Um banco de dados faz isso de forma digital, muito mais rápida e organizada.

### Por que usar Banco de Dados?

| Sem Banco de Dados | Com Banco de Dados |
|---------------------|-------------------|
| Arquivos texto/JSON espalhados | Dados centralizados |
| Dificuldade para buscar dados | Consultas rápidas e eficientes |
| Problemas de concorrência | Acesso controlado e seguro |
| Difícil manter integridade | Regras de integridade automática |
| Não escala bem | Suporta milhões de registros |

### Exemplo Prático

Armazenando dados de alunos em JSON (sem banco de dados):

```json
// alunos.json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 25
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@email.com",
    "idade": 23
  }
]
```

**Problemas:**
- Precisamos carregar o arquivo inteiro para buscar um aluno
- Se dois usuários tentam editar ao mesmo tempo, um vai sobrescrever o outro
- Difícil manter relacionamentos com outras entidades

---

## 2. O que é MySQL?

### Definição

**MySQL** é um Sistema de Gerenciamento de Banco de Dados Relacional (RDBMS) de código aberto. É um dos bancos de dados mais populares do mundo, usado por empresas como Facebook, Twitter, Netflix e Uber.

### Características Principais

| Característica | Descrição |
|----------------|-----------|
| **Open Source** | Código livre para usar e modificar |
| **Relacional** | Usa modelo de tabelas com relacionamentos |
| **SQL** | Linguagem padrão para consulta |
| **ACID** | Garante transações confiáveis |
| **Escalável** | Suporta pequenos e grandes projetos |
| **Multiplataforma** | Roda em Windows, Linux, macOS |

### Comando Básico de Conexão

```bash
# Conectar ao MySQL
mysql -u root -p

# Criar um banco de dados
CREATE DATABASE escola;

# Usar o banco de dados
USE escola;
```

---

## 3. Principais Bancos de Dados

### Bancos Relacionais (SQL)

| Banco | Linguagem | Quando usar |
|-------|-----------|-------------|
| **MySQL** | SQL | Projetos web, aplicações tradicionais |
| **PostgreSQL** | SQL | Projetos complexos, dados geoespaciais |
| **SQLite** | SQL | Aplicações mobile, pequenos projetos |
| **SQL Server** | SQL | Empresas Microsoft, enterprise |
| **Oracle** | SQL | Grandes corporações, financeiro |

### Bancos Não Relacionais (NoSQL)

| Banco | Tipo | Quando usar |
|-------|------|-------------|
| **MongoDB** | Documento | Dados flexíveis, rápida prototipagem |
| **Redis** | Key-Value | Cache, sessões, dados temporários |
| **Cassandra** | Colunas | Big data, alta escrita |
| **Elasticsearch** | Documento | Busca full-text, análise |
| **Neo4j** | Grafo | Dados complexos, redes sociais |

---

## 4. Banco de Dados Relacional vs Não Relacional

### Banco de Dados Relacional (RDBMS)

**Modelo:** Dados organizados em tabelas com linhas e colunas, relacionadas entre si.

```sql
-- Exemplo: Tabela de alunos
+----+------------+-------------------+-------+
| id | nome       | email             | idade |
+----+------------+-------------------+-------+
|  1 | João Silva | joao@email.com    |    25 |
|  2 | Maria      | maria@email.com   |    23 |
+----+------------+-------------------+-------+
```

**Características:**
- Estrutura fixa (schema definido antes)
- Relacionamentos com chaves estrangeiras
- Integridade dos dados garantida
- Linguagem SQL padrão
- Ideal para dados estruturados
- **Linhas** são chamadas de registros
- **Colunas** são chamadas de atributos

### Banco de Dados Não Relacional (NoSQL)

**Modelo:** Dados armazenados de forma flexível, sem schema rígido.

```json
// Exemplo MongoDB - Documento
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25,
  "cursos": ["JavaScript", "Node.js"],
  "endereco": {
    "rua": "Rua A",
    "numero": 123,
    "cidade": "São Paulo"
  },
  "tags": ["fullstack", "backend"]
}
```

**Características:**
- Schema flexível (sem estrutura fixa)
- Escalabilidade horizontal
- Alta performance em grandes volumes
- Ideal para dados semi-estruturados
- Consultas específicas para cada banco

### Quando usar cada um?

| Critério | Relacional (SQL) | Não Relacional (NoSQL) |
|----------|------------------|------------------------|
| **Estrutura dos dados** | Fixa e bem definida | Flexível e mutável |
| **Relacionamentos** | Complexos e importantes | Poucos ou simples |
| **Escalabilidade** | Vertical (mais recursos) | Horizontal (mais servidores) |
| **Transações** | ACID é crítico | Eventual consistency aceitável |
| **Tipo de dados** | Estruturados | Semi ou não estruturados |

---

## 5. Tipos de Dados: Estruturados, Semi-estruturados e Não Estruturados

### Dados Estruturados

**Definição:** Dados organizados em formato fixo, com schema pré-definido.

**Exemplos:**
- Tabelas de banco de dados relacional
- Planilhas Excel/CSV
- Arquivos JSON com estrutura consistente

```json
// Dado estruturado (schema bem definido)
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25
}
```

### Dados Semi-estruturados

**Definição:** Dados com alguma organização, mas estrutura flexível.

**Exemplos:**
- Documentos NoSQL (MongoDB)
- Arquivos XML/JSON
- Logs de aplicação

```json
// Dado semi-estruturado (estrutura flexível)
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25,
  "cursos": ["JavaScript", "Python"],      // Campo opcional
  "endereco": {                           // Estrutura aninhada
    "rua": "Rua A",
    "cidade": "São Paulo"
  },
  "metadata": {                           // Outro registro pode ter campos diferentes
    "ultima_visita": "2024-01-15"
  }
}
```

### Dados Não Estruturados

**Definição:** Dados sem organização predefinida, como texto livre ou binários.

**Exemplos:**
- E-mails, documentos de texto
- Imagens, vídeos, áudio
- Redes sociais (posts, tweets)
- Sensor data bruto

```text
// Dado não estruturado (texto livre)
"Olá! Gostaria de saber mais sobre o curso de Node.js. Tenho experiência com JavaScript básico e quero aprender backend. Atenciosamente, João Silva."
```

### Resumo Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    TIPOS DE DADOS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ESTRUTURADOS          SEMI-ESTRUTURADOS    NÃO ESTRUTURADOS │
│  ─────────────         ─────────────────    ────────────── │
│  • Tabelas SQL         • Documentos NoSQL   • Texto livre   │
│  • CSV/Excel           • JSON/XML           • Imagens       │
│  • Schema fixo         • Estrutura flexível • Vídeos        │
│                        • Hierárquico        • Áudio         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Comandos MySQL: DDL (Data Definition Language)

### O que é DDL?

DDL (Data Definition Language) são comandos usados para DEFINIR a estrutura do banco de dados: criar, modificar e excluir tabelas.

### CREATE TABLE - Criar Tabela

**Sintaxe básica:**

```sql
CREATE TABLE nome_tabela (
    coluna1 tipo_dado constraints,
    coluna2 tipo_dado constraints,
    ...
);
```

**Exemplo prático:**

```sql
-- Criar tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	idade INT,
	data_nascimento DATE,
	ativo BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

-- Criar tabela de disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    carga_horaria INT NOT NULL,
    descricao TEXT
);
```

**Tipos de dados comuns:**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `INT` | Número inteiro | 1, 100, -5 |
| `VARCHAR(n)` | Texto de tamanho variável | `VARCHAR(100)` |
| `TEXT` | Texto longo | Parágrafos |
| `BOOLEAN` | Verdadeiro/Falso | TRUE/FALSE |
| `DATE` | Data (ano-mês-dia) | '2024-01-15' |
| `TIMESTAMP` | Data e hora | '2024-01-15 10:30:00' |
| `DECIMAL(m,d)` | Número decimal | `DECIMAL(10,2)` |

**Constraints (Restrições):**

| Constraint | Descrição |
|------------|-----------|
| `PRIMARY KEY` | Chave primária única |
| `NOT NULL` | Campo obrigatório |
| `UNIQUE` | Valores únicos |
| `DEFAULT` | Valor padrão |
| `AUTO_INCREMENT` | Auto-incremento |

### ALTER TABLE - Alterar Tabela

**Adicionar coluna:**

```sql
-- Adicionar uma nova coluna
ALTER TABLE alunos ADD COLUMN telefone VARCHAR(20);
```

**Modificar coluna:**

```sql
-- Alterar tipo e tamanho de coluna existente
ALTER TABLE alunos MODIFY COLUMN nome VARCHAR(200) NOT NULL;

-- Alterar nome da coluna
ALTER TABLE alunos RENAME COLUMN email TO email_institucional;
```

**Remover coluna:**

```sql
-- Remover coluna
ALTER TABLE alunos DROP COLUMN telefone;
```

**Adicionar constraint:**

```sql
-- Adicionar chave estrangeira (veremos depois)
ALTER TABLE alunos ADD CONSTRAINT fk_turma FOREIGN KEY (turma_id) REFERENCES turmas(id);
```

### DROP TABLE - Excluir Tabela

```sql
-- Excluir tabela (permanente!)
DROP TABLE alunos;

-- Excluir apenas se existir
DROP TABLE IF EXISTS alunos;
```

⚠️ **CUIDADO:** `DROP TABLE` remove a tabela e TODOS os dados permanentemente!

---

## 7. Comandos MySQL: DML (Data Manipulation Language)

### O que é DML?

DML (Data Manipulation Language) são comandos usados para MANIPULAR os dados: inserir, alterar, consultar e excluir registros.

### INSERT - Inserir Dados

**Sintaxe básica:**

```sql
INSERT INTO nome_tabela (coluna1, coluna2, ...) VALUES (valor1, valor2, ...);
```

**Exemplo prático:**

```sql
-- Inserir um aluno
INSERT INTO alunos (nome, email, idade, data_nascimento)
VALUES ('João Silva', 'joao@email.com', 25, '1999-05-15');

-- Inserir omitindo colunas com DEFAULT ou NOT NULL com valor
INSERT INTO alunos (nome, email)
VALUES ('Maria Santos', 'maria@email.com');
-- idade será NULL, ativo será TRUE, created_at será NOW()
```

**Inserir múltiplos registros:**

```sql
INSERT INTO alunos (nome, email, idade) VALUES
    ('Pedro Souza', 'pedro@email.com', 28),
    ('Ana Costa', 'ana@email.com', 22),
    ('Carlos Lima', 'carlos@email.com', 30);
```

**Inserir disciplinas:**

```sql
INSERT INTO disciplinas (nome, codigo, carga_horaria, descricao) VALUES
    ('Programação Web', 'PW101', 80, 'Desenvolvimento web com HTML, CSS e JavaScript'),
    ('Banco de Dados', 'BD102', 60, 'Conceitos e práticas de banco de dados'),
    ('Estruturas de Dados', 'ED103', 90, 'Listas, pilhas, filas, árvores e grafos');
```

### SELECT - Consultar Dados

**Sintaxe básica:**

```sql
SELECT coluna1, coluna2, ... FROM nome_tabela WHERE condição;
```

**Exemplos práticos:**

```sql
-- Selecionar todos os alunos
SELECT * FROM alunos;

-- Selecionar colunas específicas
SELECT nome, email FROM alunos;

-- Filtrar com WHERE
SELECT * FROM alunos WHERE idade > 25;

-- Múltiplas condições
SELECT * FROM alunos WHERE idade > 20 AND ativo = TRUE;

-- Ordenar resultados
SELECT * FROM alunos ORDER BY nome ASC;

-- Limitar resultados
SELECT * FROM alunos ORDER BY idade DESC LIMIT 5;

-- Paginar resultados
SELECT * FROM alunos ORDER BY idade DESC LIMIT 1 OFFSET 1;


-- Contar registros
SELECT COUNT(*) FROM alunos;

-- Renomear coluna resultado
SELECT COUNT(*) as total_alunos FROM alunos;

-- Buscar por parte do texto (LIKE)
SELECT * FROM alunos WHERE nome LIKE '%Silva%';
```

### UPDATE - Atualizar Dados

**Sintaxe básica:**

```sql
UPDATE nome_tabela SET coluna1 = valor1, coluna2 = valor2 WHERE condição;
```

**Exemplos práticos:**

```sql
-- Atualizar idade de um aluno
UPDATE alunos SET idade = 26 WHERE id = 1;

-- Atualizar múltiplas colunas
UPDATE alunos SET email = 'novoemail@email.com', ativo = FALSE WHERE id = 1;

-- Atualizar múltiplos registros
UPDATE alunos SET ativo = TRUE WHERE idade >= 18;

-- ⚠️ SEMPRE usar WHERE!
UPDATE alunos SET nome = 'Nome Padrão';
-- Isso atualiza TODOS os registros!
```

### DELETE - Excluir Dados

**Sintaxe básica:**

```sql
DELETE FROM nome_tabela WHERE condição;
```

**Exemplos práticos:**

```sql
-- Excluir um aluno específico
DELETE FROM alunos WHERE id = 1;

-- Excluir múltiplos registros
DELETE FROM alunos WHERE ativo = FALSE;

-- ⚠️ SEMPRE usar WHERE!
DELETE FROM alunos;
-- Isso exclui TODOS os registros!
```

---

## 8. Relacionamentos entre Tabelas

### Por que relacionar tabelas?

Relacionamentos permitem organizar dados em tabelas separadas e conectá-las através de referências, evitando redundância e mantendo integridade.

### Tipos de Relacionamentos

#### 1. Relacionamento 1:1 (Um para Um)

**Definição:** Cada registro em uma tabela se relaciona com exatamente um registro em outra tabela.

**Exemplo prático:** Aluno e Endereço

```
┌─────────────┐       ┌─────────────┐
│   ALUNOS    │       │ ENDEREÇOS   │
├─────────────┤       ├─────────────┤
│ id (PK)     │──────>│ id (PK)     │
│ nome        │       │ aluno_id(FK)│
│ email       │<──────│ rua         │
│ endereco_id(FK)     │ numero      │
└─────────────┘       │ cidade      │
                      └─────────────┘
```

```sql
-- Tabela de endereços
CREATE TABLE enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT UNIQUE,  -- UNIQUE garante 1:1
    rua VARCHAR(100),
    numero VARCHAR(20),
    cidade VARCHAR(50),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

-- Adicionar FK na tabela alunos
ALTER TABLE alunos ADD COLUMN endereco_id INT UNIQUE;
ALTER TABLE alunos ADD CONSTRAINT fk_endereco
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id);
```

#### 2. Relacionamento 1:N (Um para Muitos)

**Definição:** Um registro em uma tabela se relaciona com muitos registros em outra tabela.

**Exemplo prático:** Aluno e Matrículas

```
┌─────────────┐       ┌─────────────┐
│   ALUNOS    │       │ MATRÍCULAS  │
├─────────────┤       ├─────────────┤
│ id (PK)     │────┐  │ id (PK)     │
│ nome        │    └─>│ aluno_id(FK)│
│ email       │       │ disciplina  │
│             │       │ semestre    │
│             │<──────│ data        │
└─────────────┘       └─────────────┘
```

```sql
-- Tabela de matrículas (muitas para um aluno)
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    semestre VARCHAR(10),
    data_matricula DATE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- UM aluno pode ter MUITAS matrículas
-- Uma matrícula pertence a UM aluno
```

#### 3. Relacionamento N:N (Muitos para Muitos)

**Definição:** Muitos registros em uma tabela se relacionam com muitos registros em outra tabela.

**Exemplo prático:** Alunos e Disciplinas

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   ALUNOS     │       │ALUNO_DISCIPLINA│      │ DISCIPLINAS │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id (PK)     │──────>│ aluno_id (FK) │<──────│ id (PK)     │
│ nome        │       │ disciplina_id (FK)    │ nome        │
│ email       │       └──────────────┘       │ codigo      │
└─────────────┘                                └─────────────┘
  │                                            │
  └────────────────────┬───────────────────────┘
                       │
                       v
                 Tabela intermediária
                 (tabela de junção)
```

```sql
-- Criar tabela de junção para N:N
CREATE TABLE aluno_disciplina (
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data_matricula DATE DEFAULT CURRENT_DATE,
    nota DECIMAL(5,2),
    PRIMARY KEY (aluno_id, disciplina_id),  -- PK composta
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- MUITOS alunos podem cursar MUITAS disciplinas
-- Uma tabela intermediária armazena os relacionamentos
```

### Resumo dos Relacionamentos

| Tipo | Descrição | Exemplo | FK Obrigatória? |
|------|-----------|---------|-----------------|
| **1:1** | Um registro tem um relacionado | Aluno ↔ Endereço | Sim (UNIQUE) |
| **1:N** | Um tem muitos | Professor ↔ Alunos | No "muitos" |
| **N:N** | Muitos têm muitos | Alunos ↔ Disciplinas | Tabela intermediária |

### Ações de Integridade Referencial: ON DELETE e ON UPDATE

Quando definimos uma chave estrangeira (FOREIGN KEY), podemos especificar o que acontece quando o registro relacionado é **excluído** (ON DELETE) ou **atualizado** (ON UPDATE).

#### ON DELETE - O que fazer ao excluir o registro referenciado

| Ação | Descrição | Quando usar |
|------|-----------|-------------|
| **CASCADE** | Exclui automaticamente todos os registros que referenciam o registro excluído | Quando o filho não pode existir sem o pai |
| **RESTRICT** | Impede a exclusão se houver registros referenciando (padrão se não especificado) | Quando não deve excluir o pai enquanto tiver filhos |
| **SET NULL** | Define a FK como NULL quando o pai é excluído | Quando o filho pode existir sem pai |
| **SET DEFAULT** | Define a FK com valor padrão quando o pai é excluído | Quando há um valor padrão válido |
| **NO ACTION** | Similar a RESTRICT (diferença apenas em momento da verificação) | Quando não quer ação automática |

#### ON UPDATE - O que fazer ao atualizar o registro referenciado

| Ação | Descrição | Quando usar |
|------|-----------|-------------|
| **CASCADE** | Atualiza automaticamente a FK nos registros filhos quando o PK do pai muda | Raramente usado (PKs geralmente não mudam) |
| **RESTRICT** | Impede a atualização se houver registros referenciando (padrão) | Quando o ID não deve mudar |
| **SET NULL** | Define a FK como NULL quando o PK do pai é atualizado | Quando o filho pode perder a referência |
| **SET DEFAULT** | Define a FK com valor padrão quando o PK do pai é atualizado | Quando há um valor padrão válido |
| **NO ACTION** | Similar a RESTRICT | Quando não quer ação automática |

#### Exemplos Práticos

**1. CASCADE - Exclusão em cascata**

```sql
-- Se um aluno for excluído, todas as matrículas também são excluídas
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- Ao excluir o aluno com id=1:
DELETE FROM alunos WHERE id = 1;
-- Todas as matrículas com aluno_id=1 são automaticamente excluídas
```

**2. RESTRICT - Impedir exclusão**

```sql
-- Não permite excluir um aluno se ele tiver matrículas
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE RESTRICT
);

-- Ao tentar excluir:
DELETE FROM alunos WHERE id = 1;
-- ERRO: Cannot delete or update a parent row: a foreign key constraint fails
```

**3. SET NULL - Definir como NULL**

```sql
-- Quando o aluno for excluído, as matrículas ficam sem aluno (NULL)
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,  -- Pode ser NULL
    disciplina_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE SET NULL
);

-- Ao excluir o aluno com id=1:
DELETE FROM alunos WHERE id = 1;
-- Todas as matrículas com aluno_id=1 ficam com aluno_id = NULL
```

**4. SET DEFAULT - Definir valor padrão**

```sql
-- Quando o aluno for excluído, as matrículas ficam associadas a um aluno "padrão"
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT DEFAULT 0,  -- Aluno padrão (id=0)
    disciplina_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE SET DEFAULT
);

-- Ao excluir o aluno com id=1:
DELETE FROM alunos WHERE id = 1;
-- Todas as matrículas com aluno_id=1 ficam com aluno_id = 0
```

#### Qual usar em cada situação?

| Cenário | ON DELETE Recomendado | Exemplo |
|---------|----------------------|---------|
| Ordem e Itens | `CASCADE` | Excluir pedido → excluir itens |
| Categoria e Produtos | `RESTRICT` | Não excluir categoria se tiver produtos |
| Departamento e Funcionários | `SET NULL` | Excluir departamento → funcionários ficam sem departamento |
| Perfil e Usuário | `CASCADE` | Excluir usuário → excluir perfil |

> ⚠️ **Atenção:** `CASCADE` pode ser perigoso! Certifique-se de que realmente quer excluir tudo relacionado. Use com cuidado em produção.

#### Diferença entre RESTRICT e NO ACTION

Ambos impedem a exclusão, mas há uma pequena diferença técnica:

- **RESTRICT**: A verificação é feita imediatamente
- **NO ACTION**: A verificação é adiada até o final da transação

Na prática, na maioria dos casos, eles se comportam de forma idêntica.

#### No Prisma

No schema.prisma, você define essas ações com `onDelete`:

```prisma
model Matricula {
  id           Int       @id @default(autoincrement())
  alunoId      Int
  disciplinaId Int

  aluno      Aluno       @relation(
    fields: [alunoId],
    references: [id],
    onDelete: Cascade  // CASCADE, Restrict, SetNull, NoAction
  )
  disciplina Disciplina  @relation(
    fields: [disciplinaId],
    references: [id],
    onDelete: Cascade
  )
}
```

---

## 9. Tipos de JOIN

### O que é JOIN?

JOIN é usado para combinar dados de duas ou mais tabelas baseadas em relacionamentos.

### Preparando os Dados para Exemplos

```sql
-- Vamos usar estas tabelas para os exemplos
SELECT * FROM alunos;
-- Resultado:
-- id  | nome       | email
-- -----|------------|-----------------
-- 1    | João       | joao@email.com
-- 2    | Maria      | maria@email.com
-- 3    | Pedro      | pedro@email.com

SELECT * FROM matriculas;
-- Resultado:
-- id  | aluno_id | disciplina
-- -----|----------|-------------
-- 1    | 1        | BD102
-- 2    | 1        | PW101
-- 3    | 2        | BD102
```

### 1. INNER JOIN

**O que faz:** Retorna apenas registros que têm correspondência em AMBAS as tabelas.

**Quando usar:** Quando você só quer dados que existem nos dois lados.

```sql
SELECT a.nome, m.disciplina
FROM alunos a
INNER JOIN matriculas m ON a.id = m.aluno_id;
```

**Resultado:**
```
nome       | disciplina
-----------|------------
João       | BD102
João       | PW101
Maria      | BD102
```

**Visualmente:**
```
Alunos          Matrículas        Resultado
  ●●●   ──>      ●●●   ──>         ●●
  ●     ──>      ●●                ●●
```

### 2. LEFT JOIN

**O que faz:** Retorna TODOS os registros da tabela da esquerda e os correspondentes da direita (NULL se não houver).

**Quando usar:** Quando você quer todos os registros da tabela principal, mesmo sem correspondência.

```sql
SELECT a.nome, m.disciplina
FROM alunos a
LEFT JOIN matriculas m ON a.id = m.aluno_id;
```

**Resultado:**
```
nome       | disciplina
-----------|------------
João       | BD102
João       | PW101
Maria      | BD102
Pedro      | NULL        ← Pedro não tem matrícula
```

**Visualmente:**
```
Alunos          Matrículas        Resultado
  ●●●   ──>      ●●●   ──>         ●●
  ●●    ──>      ●●                ●●
                 ↑
                 Pedro aparece com NULL
```

### 3. RIGHT JOIN

**O que faz:** Retorna TODOS os registros da tabela da direita e os correspondentes da esquerda (NULL se não houver).

**Quando usar:** Quando você quer todos os registros da tabela secundária.

```sql
SELECT a.nome, m.disciplina
FROM alunos a
RIGHT JOIN matriculas m ON a.id = m.aluno_id;
```

**Resultado:**
```
nome       | disciplina
-----------|------------
João       | BD102
João       | PW101
Maria      | BD102
NULL       | ED103      ← Matrícula sem aluno órfã
```

### 4. FULL OUTER JOIN (MySQL não suporta)

**O que faz:** Retorna todos os registros de AMBAS as tabelas.

**No MySQL:** Use `UNION` de LEFT e RIGHT JOIN.

```sql
-- Alternativa no MySQL
SELECT a.nome, m.disciplina
FROM alunos a
LEFT JOIN matriculas m ON a.id = m.aluno_id
UNION
SELECT a.nome, m.disciplina
FROM alunos a
RIGHT JOIN matriculas m ON a.id = m.aluno_id;
```

### Resumo dos Tipos de JOIN

| Tipo | O que retorna | Quando usar |
|------|---------------|-------------|
| **INNER JOIN** | Apenas correspondências | Apenas dados completos |
| **LEFT JOIN** | Todos da esquerda + correspondentes | Todos do registro principal |
| **RIGHT JOIN** | Todos da direita + correspondentes | Todos da tabela relacionada |
| **FULL JOIN** | Todos de ambos | Todos os dados (raramente usado) |

### Diagrama Visual dos JOINs

```
        INNER JOIN           LEFT JOIN
         ┌───┐               ┌───┐
      ┌──┤   ├──┐         ┌──┤   ├──┐
      │  └───┘  │         │  └───┘  │
   ┌──┴──┐ ┌───┴──┐     ┌──┴──┐ ┌───┴──┐
   │ A  │ │  B   │     │ A  │ │  B   │
   └────┘ └──────┘     └────┘ └──────┘

        RIGHT JOIN           FULL JOIN
         ┌───┐               ┌───┐
      ┌──┤   ├──┐         ┌──┤   ├──┐
      │  └───┘  │         │  └───┘  │
   ┌──┴──┐ ┌───┴──┐     ┌──┴──┐ ┌───┴──┐
   │ A  │ │  B   │     │ A  │ │  B   │
   └────┘ └──────┘     └────┘ └──────┘
```

---

## 10. Integração com Node.js: Prisma

### O que é Prisma?

**Prisma** é um ORM (Object-Relational Mapping) moderno para Node.js e TypeScript que permite trabalhar com banco de dados usando JavaScript/TypeScript, em vez de SQL direto.

### Vantagens do Prisma

| Vantagem | Descrição |
|----------|-----------|
| **Type Safety** | Tipagem forte com TypeScript (opcional para JS) |
| **Schema Declarativo** | Único arquivo define toda a estrutura |
| **Migrations** | Controle de versão do schema |
| **Auto-complete** | Suporte excelente em editores |
| **Prisma Studio** | Interface visual para explorar o banco |
| **Multi-banco** | Suporta MySQL, PostgreSQL, SQLite, etc. |

---

## 11. Configurando o Prisma

### Pré-requisitos

```bash
# Node.js instalado (v18+)
# MySQL instalado e rodando
```

### Instalação

```bash
# Criar projeto
mkdir projeto-escolar
cd projeto-escolar

# Iniciar projeto
npm init -y
npm install @prisma/client
npm install prisma --save-dev
```

### Inicializar o Prisma

```bash
npx prisma init
```

Isso cria:
- `prisma/schema.prisma` - Arquivo de configuração do schema
- `.env` - Variáveis de ambiente

### Configuração do arquivo .env

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_banco"
```

### Schema Básico

Crie o arquivo `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Aluno {
  id        Int      @id @default(autoincrement())
  nome      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(100)
  idade     Int?
  ativo     Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

### Gerar o Prisma Client

```bash
npx prisma generate
```

Isso gera o código do client que vamos usar no JavaScript.

### Criar as Tabelas (Migration)

```bash
npx prisma migrate dev --name init
```

Isso cria as tabelas no banco de dados baseadas no schema.

---

## 12. Criando Models no schema.prisma

### Estrutura de Pastas

```
projeto-escolar/
├── prisma/
│   ├── schema.prisma     # Schema do Prisma
│   └── seed.js         # Script para popular dados
├── src/
│   ├── client.js        # Configuração do Prisma Client
│   └── index.js        # Arquivo principal
├── package.json
└── .env
```

### Model Aluno


- Modelo Aluno - Representa a tabela 'alunos' no banco de dados
- Relacionamento: 1:N (Um aluno tem muitas matrículas)
  
No arquivo `prisma/schema.prisma`:

```prisma
model Aluno {
  id              Int        @id @default(autoincrement())
  nome            String     @db.VarChar(100)
  email           String     @unique @db.VarChar(100)
  idade           Int?
  telefone        String?    @db.VarChar(20)
  dataNascimento  DateTime?
  ativo           Boolean    @default(true)
  createdAt       DateTime   @default(now())

  matriculas Matricula[]
}
```

### Model Disciplina
- Modelo Disciplina - Representa a tabela 'disciplinas' no banco de dados
- Esta entidade é referenciada pela entidade Matricula

```prisma
model Disciplina {
  id           Int      @id @default(autoincrement())
  nome         String   @db.VarChar(100)
  codigo       String   @unique @db.VarChar(20)
  cargaHoraria Int
  professor    String?  @db.VarChar(100)
  descricao    String?  @db.Text
  ativa        Boolean  @default(true)

  matriculas Matricula[]
}
```

### Model Matricula (Tabela de Junção)
- Modelo Matricula - Tabela de junção para relacionamento N:N
- Esta tabela conecta Alunos e Disciplinas, permitindo que:
  - Um aluno se matricule em várias disciplinas
  - Uma disciplina tenha vários alunos matriculados
- Relacionamentos:
  - N:1 Uma matrícula pertence a um aluno
  - N:1 Uma matrícula pertence a uma disciplina

```prisma
model Matricula {
  id            Int       @id @default(autoincrement())
  alunoId       Int
  disciplinaId  Int
  dataMatricula DateTime  @default(now())
  semestre      String?   @db.VarChar(10)
  nota          Decimal?  @db.Decimal(5, 2)
  status        String    @default("ativa") @db.VarChar(20)

  aluno      Aluno       @relation(fields: [alunoId], references: [id], onDelete: Cascade)
  disciplina Disciplina  @relation(fields: [disciplinaId], references: [id], onDelete: Cascade)

  @@unique([alunoId, disciplinaId])
}
```

---

## 12.5. Gerenciando Migrations: Reset e Rollback

### Reset Completo do Banco de Dados

O comando `migrate reset` limpa o banco de dados e recria todas as migrations do zero. É útil para desenvolvimento e testes.

**⚠️ ATENÇÃO:** Este comando DELETA todos os dados do banco!

```bash
# Reset completo (remove todas as migrations e recria)
npx prisma migrate reset

# Reset sem executar o seed
npx prisma migrate reset --skip-seed

# Reset com força (pula confirmação)
npx prisma migrate reset --force
```

**O que o reset faz:**
1. Remove todas as tabelas do banco de dados
2. Recria o banco com todas as migrations
3. Executa o script de seed (se existir, a menos que `--skip-seed` seja usado)

### Rollback de Migration

O Prisma **não possui comando nativo de rollback automático**. No entanto, você pode usar algumas abordagens:

#### 1. Marcar Migration como Rolled Back (Manual)

```bash
# Marca a migration mais recente como "rolled back"
npx prisma migrate resolve --rolled-back

# Marca uma migration específica como "rolled back"
npx prisma migrate resolve --rolled-back <nome-da-migration>

# Exemplo:
npx prisma migrate resolve --rolled-back 20260513180351_create_tables
```

**⚠️ CUIDADO:** Isso apenas marca a migration no histórico do Prisma. Você precisa reverter as mudanças no banco manualmente!

#### 2. Abordagem Manual (Recomendada)

```bash
# 1. Listar migrations aplicadas
npx prisma migrate status

# 2. Identificar a migration que deseja reverter

# 3. Reverter manualmente as mudanças no banco de dados
#    (use o Prisma Studio ou SQL direto para desfazer as alterações)

# 4. Marcar a migration como rolled back
npx prisma migrate resolve --rolled-back <nome-da-migration>
```

#### 3. Criar Migration de Reversão

A melhor abordagem é criar uma nova migration que reverta as mudanças:

```bash
# 1. Reverta as mudanças no schema.prisma (remova/altere os models)

# 2. Crie uma nova migration que faz o oposto
npx prisma migrate dev --name revert_alteracao
```

### Scripts no package.json

Adicione scripts úteis no `package.json` para facilitar o gerenciamento:

```json
{
  "scripts": {
    "dev": "node src/index.js",
    "generate": "npx prisma generate",
    "migrate": "npx prisma migrate dev",
    "studio": "npx prisma studio",
    "seed": "node prisma/seed.js",
    "reset": "npx prisma migrate reset",
    "rollback": "npx prisma migrate resolve --rolled-back"
  }
}
```

**Uso dos scripts:**

```bash
# Reset do banco de dados
npm run reset

# Marcar última migration como rolled back
npm run rollback
```

### Status da Migration

Para verificar o estado das migrations:

```bash
# Verificar status de todas as migrations
npx prisma migrate status
```

**Saída esperada:**

```
Schema synced from shadow database

No pending migrations to apply.

Applied migrations:
  20260513180351_create_tables  (applied)
```

### Boas Práticas

| Situação | Comando Recomendado | Observação |
|----------|--------------------|------------|
| Desenvolvimento limpo | `npx prisma migrate reset` | Perde todos os dados |
| Reverter última migration | `resolve --rolled-back` + SQL manual | Precisa reverter manualmente |
| Corrigir migration errada | `migrate dev --name correcao` | Criar nova migration |
| Verificar status | `npx prisma migrate status` | Sempre antes de operações |
| Produção | **NUNCA use reset** | Crie migrations de correção |

### Fluxo de Trabalho Recomendado

```
1. Desenvolvimento:
   └─> npm run migrate      (cria e aplica migration)

2. Algo deu errado:
   └─> npm run reset        (volta tudo ao zero)

3. Em produção:
   └─> Criar migration de correção
       └─> npx prisma migrate dev --name fix_issue
```

> ⚠️ **IMPORTANTE:** Em produção, NUNCA use `migrate reset` ou faça rollbacks manuais. Sempre crie uma nova migration para corrigir problemas.

---

## 13. Operações CRUD com Prisma

### Configuração do Client

Crie o arquivo `src/client.js`:

```javascript
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function disconnect() {
  await prisma.$disconnect()
}
```

### CREATE - Criar Registros

```javascript
import { prisma } from './client.js'

// Criar um aluno
const aluno = await prisma.aluno.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    idade: 25,
  },
})

// Criar uma disciplina
const disciplina = await prisma.disciplina.create({
  data: {
    nome: 'Banco de Dados',
    codigo: 'BD102',
    cargaHoraria: 60,
    descricao: 'Conceitos e práticas de banco de dados',
  },
})

// Criar uma matrícula
const matricula = await prisma.matricula.create({
  data: {
    alunoId: 1,
    disciplinaId: 1,
    nota: 8.5,
    semestre: '2024.1',
  },
})
```

### READ - Ler Registros

```javascript
// Buscar todos
const todosAlunos = await prisma.aluno.findMany()

// Buscar por ID
const aluno = await prisma.aluno.findUnique({
  where: { id: 1 },
})

// Buscar com filtro
const alunosAtivos = await prisma.aluno.findMany({
  where: { ativo: true },
})

// Buscar com ordenação
const alunosOrdenados = await prisma.aluno.findMany({
  orderBy: { nome: 'asc' },
})

// Buscar com paginação
const primeiros10 = await prisma.aluno.findMany({
  take: 10,
  skip: 0,
})

// Buscar com JOIN (include)
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
```

### UPDATE - Atualizar Registros

```javascript
// Atualizar um aluno
const alunoAtualizado = await prisma.aluno.update({
  where: { id: 1 },
  data: { idade: 26 },
})

// Atualizar múltiplos campos
await prisma.aluno.update({
  where: { id: 1 },
  data: {
    nome: 'João Silva Jr.',
    email: 'novoemail@email.com',
  },
})

// Atualizar múltiplos registros
await prisma.aluno.updateMany({
  where: { ativo: false },
  data: { ativo: true },
})
```

### DELETE - Excluir Registros

```javascript
// Excluir um registro específico
await prisma.aluno.delete({
  where: { id: 1 },
})

// Excluir com filtro
await prisma.matricula.deleteMany({
  where: { status: 'cancelada' },
})
```

---

## 14. Mapeamento: SQL ↔ Prisma

| Operação SQL | Prisma (Client) |
|--------------|-----------------|
| `CREATE TABLE` | `model` no schema.prisma |
| `ALTER TABLE` | Editar model e rodar `npx prisma migrate` |
| `DROP TABLE` | `prisma.model.deleteMany()` |
| `INSERT INTO` | `prisma.model.create({ data: ... })` |
| `SELECT * FROM` | `prisma.model.findMany()` |
| `SELECT WHERE id = 1` | `prisma.model.findUnique({ where: { id: 1 } })` |
| `SELECT ... JOIN` | `prisma.model.find({ include: {...} })` |
| `UPDATE ... SET` | `prisma.model.update({ where: ..., data: ... })` |
| `DELETE FROM` | `prisma.model.delete({ where: ... })` |
| `COUNT(*)` | `prisma.model.count()` |
| `ORDER BY` | `prisma.model.findMany({ order: {...} })` |
| `WHERE campo LIKE '%texto%'` | `prisma.model.findMany({ where: { campo: { contains: 'texto' } } })` |
| `WHERE campo > valor` | `prisma.model.findMany({ where: { campo: { gt: valor } } })` |

---

## 💡 Exemplos Adicionais

### Exemplo 1: Relacionamento 1:1 com Prisma

Cria um model de Endereço com relação 1:1 com Aluno:

```prisma
model Endereco {
  id       Int    @id @default(autoincrement())
  rua      String
  numero   String
  cidade   String
  uf       String  @db.VarChar(2)
  cep      String @db.VarChar(9)

  alunoId  Int    @unique
  aluno    Aluno  @relation(fields: [alunoId], references: [id])
}
```

Adicionar relação no model Aluno:

```prisma
model Aluno {
  // ... campos existentes
  endereco   Endereco?
}
```

### Exemplo 2: Busca Avançada

```javascript
// Buscar alunos com matrículas em disciplinas específicas
const alunosComBD = await prisma.aluno.findMany({
  where: {
    matriculas: {
      some: {
        disciplina: {
          codigo: 'BD102',
        },
      },
    },
  },
  include: {
    matriculas: {
      include: {
        disciplina: true,
      },
    },
  },
})

console.log('Alunos matriculados em Banco de Dados:')
console.table(alunosComBD)
```

### Exemplo 3: Transações

```javascript
// Criar aluno e matricula em uma transação (tudo ou nada)
await prisma.$transaction(async (tx) => {
  const novoAluno = await tx.aluno.create({
    data: {
      nome: 'Carlos Lima',
      email: 'carlos@email.com',
      idade: 30,
    },
  })

  await tx.matricula.create({
    data: {
      alunoId: novoAluno.id,
      disciplinaId: 1,  // Supondo que BD existe
      nota: 7.5,
    },
  })

  // Se der erro aqui, nada é salvo no banco
})
```

### Exemplo 4: Queries Agregadas

```javascript
// Calcular média de notas de um aluno
const resultado = await prisma.matricula.aggregate({
  where: { alunoId: 1 },
  _avg: {
    nota: true,
  },
  _count: true,
})

console.log(`Média: ${resultado._avg.nota}`)
console.log(`Total de matrículas: ${resultado._count}`)

// Agrupar e contar
const alunosPorIdade = await prisma.aluno.groupBy({
  by: ['idade'],
  _count: true,
})

console.table(alunosPorIdade)
```

---

## 📚 Referências

- [Documentação oficial do Prisma](https://www.prisma.io/docs)
- [Documentação oficial do MySQL](https://dev.mysql.com/doc/)
- [Guia de relacionamentos Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [Comandos SQL essenciais](https://www.w3schools.com/sql/)
