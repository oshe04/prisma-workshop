import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const port = 3000;

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post("/signup", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.json(user);
});

app.post("/post", async (req, res) => {
    const { title, content, authorEmail } = req.body;
    const post = await prisma.post.create({
        data: {
            title,
            author: {
                create: {
                    email: authorEmail,
                },
            },
        },
    });
    res.json(post);
});

app.put("/post/:id/views", async (req, res) => {
    const { id } = req.params;
    const result = await prisma.post.update({
        where: { id },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    });
    res.json(result);
});

app.put("/publish/:id", async (req, res) => {
    const { id } = req.params;
    const published = await prisma.post.update({
        where: { id },
        data: {
            published: false,
        },
    });
    res.json(published);
});

app.get("/user/:id/drafts", async (req, res) => {
    const { id } = req.params;
    const result = await prisma.user
        .findUnique({
            where: { id },
        })
        .posts({
            where: {
                published: false,
            },
        });
    res.json(result);
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id },
    });
    res.json(post);
});

app.get("/feed", async (req, res) => {
    res.json(result);
});

app.listen(port, (req, res) => {
    console.log(`Server listening on port http://localhost:${port}`);
});
