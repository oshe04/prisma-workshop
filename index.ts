import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.user.findMany({
        skip: 2,
        take: 2,
    });
    console.log(result);
}

main()
    .catch((err) => {
        console.log(`${err.message}\n`);
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
