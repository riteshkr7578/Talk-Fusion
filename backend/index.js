import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://talk-fusion-chat.vercel.app"
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use("/auth", authRoutes);

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const userMessage = message.toLowerCase();

    const isCodeQuestion = [
      "code", "program", "wap", "python", "java",
      "c++", "function", "algorithm", "script"
    ].some(keyword => userMessage.includes(keyword));

    const systemPrompt = isCodeQuestion
      ? `You are a programming assistant.
- Short title
- Code in markdown
- Brief explanation (2–3 lines)`
      : `You are a knowledgeable assistant.
Use markdown formatting and structured explanations.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error("CHAT ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is awake!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
