-- CreateTable
CREATE TABLE `alunos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `idade` INTEGER NULL,
    `telefone` VARCHAR(20) NULL,
    `dataNascimento` DATETIME(3) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `alunos_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `cargaHoraria` INTEGER NOT NULL,
    `professor` VARCHAR(100) NULL,
    `descricao` TEXT NULL,
    `ativa` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `disciplinas_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matriculas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alunoId` INTEGER NOT NULL,
    `disciplinaId` INTEGER NOT NULL,
    `dataMatricula` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `semestre` VARCHAR(10) NULL,
    `nota` DECIMAL(5, 2) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ativa',
    `observacoes` VARCHAR(191) NULL,

    UNIQUE INDEX `matriculas_alunoId_disciplinaId_key`(`alunoId`, `disciplinaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
