import pkg from "@prisma/client";
const { PrismaClient, Prisma } = pkg; 
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