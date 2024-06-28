import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3333;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

app.post("/query", async (req, res) => {
  const { query } = req.body;

  try {
    await prisma.searchHistory.create({
      data: {
        queryTerms: query
      }
    })

    res.send(200).json({ message: "Query terms saved in the database successfully!"})
  } catch (error) {
    console.error("Unable to perform query write in the database /query", error)
    res.status(500).json({ error });
  }
});

app.get("/query", async (req, res) => {
  try {
    const terms = await prisma.searchHistory.findMany();
    res.status(200).json(terms);
  } catch (error) {
    console.error("Error on trying retrieving terms:", error);
		res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
