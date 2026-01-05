import express from "express";
import Chat from "../models/Chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Get all chats for logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  const chats = await Chat.find({ userId: req.userId }).sort({ updatedAt: -1 });
  res.json(chats);
});

/**
 * Create new chat
 */
router.post("/", authMiddleware, async (req, res) => {
  const chat = await Chat.create({
    userId: req.userId,
    title: "New Chat",
    messages: [],
  });

  res.json(chat);
});

/**
 * Append message to chat
 */
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

  res.json(chat);
});

// Rename chat
router.patch("/:chatId", authMiddleware, async (req, res) => {
  const { title } = req.body;

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.chatId, userId: req.userId },
    { title },
    { new: true }
  );

  res.json(chat);
});


// Delete chat
router.delete("/:chatId", authMiddleware, async (req, res) => {
  await Chat.findOneAndDelete({
    _id: req.params.chatId,
    userId: req.userId,
  });

  res.json({ success: true });
});


export default router;
