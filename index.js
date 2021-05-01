import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {}

main()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
