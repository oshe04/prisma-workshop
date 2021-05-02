import pkg from "@prisma/client";
const { PrismaClient } = pkg; 
const prisma = new PrismaClient();

const userData = [
  {
    name: "Joseph",
    email: "joseph@hhub.com",
    posts: {
      create: [
        {
          title: "Joint the Hhub Slack",
          content: "https://slack.hhub.io",
          published: true
        }
      ]
    }
  },{
    name: "Isaac",
    email: "isaac@hhub.com",
    posts: {
      create: [
        {
          title: "Follow Hhub on Twitter",
          content:"https://www.twitter.com/hhub",
          published: true
        }
      ]
    }
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
