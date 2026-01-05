import express from "express";
import Chat from "../models/Chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all chats
router.get("/", authMiddleware, async (req, res) => {
  const chats = await Chat.find({ userId: req.userId }).sort({
    updatedAt: -1,
  });
  res.json(chats);
});

// Create new chat
router.post("/", authMiddleware, async (req, res) => {
  const chat = await Chat.create({
    userId: req.userId,
    title: "New Chat",
    messages: [],
  });

  res.json(chat);
});

// Append message
router.post("/:chatId/message", authMiddleware, async (req, res) => {
  const { sender, text } = req.body;

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.chatId, userId: req.userId },
    {
      $push: { messages: { sender, text } },
      $set: { updatedAt: new Date() },
    },
    { new: true }
  );

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.json(chat);
});

// Rename chat
router.patch("/:chatId", authMiddleware, async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.chatId, userId: req.userId },
    { title: title.trim() },
    { new: true }
  );

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.json(chat);
});


// Delete chat
router.delete("/:chatId", authMiddleware, async (req, res) => {
  const deleted = await Chat.findOneAndDelete({
    _id: req.params.chatId,
    userId: req.userId,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.json({ success: true });
});

export default router;
