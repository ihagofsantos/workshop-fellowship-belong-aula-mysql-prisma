// src/client.js
// Configuração do Prisma Client para conectar ao banco de dados

import { PrismaClient } from '@prisma/client'

// Cria uma única instância do Prisma Client
// Isso evita criar múltiplas conexões ao banco
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Mostra queries no console
})

// Função para desconectar do banco quando a aplicação encerrar
export async function disconnect() {
  await prisma.$disconnect()
}
