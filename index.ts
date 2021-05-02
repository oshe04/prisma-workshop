import { ApolloServer } from "apollo-server";
import { PrismaClient } from '@prisma/client';
// const { PrismaClient } = pkg;
const prisma = new PrismaClient();


const typeDefs = `
type Query {
  allUsers: [User!]!
  postById(id: Int!): Post
  feed(searchString: String, skip: Int, take: Int): [Post!]!
  draftsByUser(id: Int!): [Post]
}

type Mutation {
  signupUser(name: String, email: String!): User!
  createDraft(title: String!, content: String, authorEmail: String): Post
  incrementPostViewCount(id: Int!): Post
  deletePost(id: Int!): Post
}

type User {
  id: Int!
  email: String!
  name: String
  posts: [Post!]!
}

type Post {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String
  published: Boolean!
  viewCount: Int!
  author: User
}

scalar DateTime
`;

const resolvers = {
  Query: {
    allUsers: async (parent, args, context) => {
      const { prisma } = context;
      return await prisma.user.findMany();
    },
    postById: async (parent, args: { id }, context) => {
      const { prisma } = context;
      return await prisma.post.findUnique({
        where: { id: args.id}
      })
    },
    feed: (parent, args, context) => {
      // TODO
    },
    draftsByUser: async (parent, args: { id }, context) => {
      const { prisma } = context;
      return await prisma.user.findUnique({
        where: { id: args.id}
      }).posts({
        where: { published: false } 
      })
    },
  },
  Mutation: {
    signupUser: async (parent,args,context) => {
      const { prisma } = context;
      return await prisma.user.create({
        data: {
          email:args.email,
          name: args.name
        }
      })
    },
    createDraft: async (parent, args: { title: string; content: string | undefined; authorEmail: string }, context) => {
      const { prisma } = context;
      return await prisma.post.findUnique({})
    },
    incrementPostViewCount: async ( parent, args, context) => {
      const { prisma } = context;
      return await prisma.post.update({
        where: { id: args.id},
        data: {
          viewCount: {
            increment: 1,
          }
        }
      })
    },
    deletePost: async (parent, args, context) => {
      const { prisma } = context;
      return await prisma.post.delete({
        where: { id : args.id}
      })
    },
  },
  Post: {
    author: async (parent, args, context) => {
      const { prisma } = context;
      return await prisma.post.findUnique({
        where : { id : parent.id }
      }).author();
    },
  },
  User: {
    posts: async (parent, args, context) => {
      const { prisma } = context;
      return await prisma.user.findUnique({
        where: { id: parent.id}
      }).posts()
    },
  },
  // DateTime: DateTimeResolver,
};

const server = new ApolloServer({ typeDefs, resolvers, context: () => ({prisma}) });
server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);