/* eslint-disable prettier/prettier */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { unlinkSync } from "node:fs";

const prisma = new PrismaClient();

if (!process.env.DATABASE_URL) {
  throw new Error("please provide a database_url environment variable");
}

function generateUniqueDatabaseURL() {
  // Gera um arquivo SQLite único com base no UUID
  const uuid = randomUUID();
  return `file:./test-${uuid}.db`;
}

const databaseURL = generateUniqueDatabaseURL();
console.log(databaseURL)

beforeAll(async () => {
  process.env.DATABASE_URL = databaseURL;

  // Atualize o schema.prisma para apontar para o banco SQLite
  execSync("npx prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$disconnect();

  // Deleta o arquivo do banco de dados SQLite após os testes
  const dbFilePath = databaseURL.replace("file:", "");
  try {
    unlinkSync(dbFilePath);
    console.log(`Deleted test database: ${dbFilePath}`);
  } catch (error) {
    console.error(`Error deleting test database: ${dbFilePath}`, error);
  }
});
