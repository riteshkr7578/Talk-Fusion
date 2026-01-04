import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";


dotenv.config();
connectDB();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use("/auth", authRoutes);

app.post("/chat",authMiddleware, async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const userMessage = message.toLowerCase();

    const isCodeQuestion = [
      "code", "program", "wap", "python", "java",
      "c++", "function", "algorithm", "script"
    ].some(keyword => userMessage.includes(keyword));

    let systemPrompt;

    if (isCodeQuestion) {
      systemPrompt = `
You are a programming assistant.
Respond in a clean and concise format:
- Short title
- Code in a markdown code block
- Brief explanation (2–3 lines max)
Avoid unnecessary theory.
      `;
    } else {
      systemPrompt = `
You are a knowledgeable assistant.
Respond using MARKDOWN formatting:
- Start with a clear heading
- Use bullet points or short paragraphs
- Highlight key sections with **bold text**
- Do NOT include code blocks unless explicitly asked
- Keep the explanation moderately detailed and structured
      `;
    }

    // Build messages with history (memory)
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Health check (GET + HEAD)
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is awake!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
