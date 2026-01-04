# 🤖 Talk Fusion — Full-Stack AI Chat Application

**Talk Fusion** is a modern **full-stack AI chat application** built with **React (frontend)** and **Express.js (backend)**, powered by **Groq’s LLaMA 3.1** model.
It supports **context-aware conversations**, **Markdown-formatted responses**, and a **clean, responsive UI**.

---

## 🚀 Features

* 💬 **Real-time AI Chat Interface**
* 🧠 **Conversation Memory (Multi-turn Context)**
* ✍️ **Markdown Rendering** (headings, lists, code blocks)
* ⚡ **Fast & Responsive UI**
* 🔗 **REST-based Frontend–Backend Integration**
* 🌐 **CORS-enabled Express Backend**
* 🧩 **Intent-based Prompt Handling** (code vs explanation)

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* CSS / Tailwind CSS
* React Hooks (`useState`, `useEffect`)
* Axios (API communication)

### Backend

* Node.js
* Express.js
* Groq SDK (LLaMA 3.1)
* REST API
* dotenv (environment variables)
* CORS middleware

---

## 🔗 Backend API Contract

### POST `/chat`

**Request Body**

```json
{
  "message": "Your message here",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi!" }
  ]
}
```

**Response**

```json
{
  "reply": "AI-generated response"
}
```

---

## 🧠 How Conversation Memory Works

* The **frontend maintains full chat history**
* Each request sends:

  * Current user message
  * Previous messages (`history`)
* The backend injects history into the LLM prompt
* Enables **context-aware, multi-turn conversations**

✔ Stateless backend
✔ Scalable & cloud-friendly design

---

## 🖥️ Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/riteshkr7578/Talk-Fusion.git
cd Talk-Fusion
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key
```

Start backend server:

```bash
npm start
```

Backend runs on:

```
http://localhost:8000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

### 4️⃣ Configure Backend URL (Frontend)

```js
const API_URL = "http://localhost:8000/chat";
```

---

## 📸 UI Highlights

* Clean chat bubbles for **User & AI**
* Markdown-formatted AI responses
* Smooth scrolling and input handling
* Minimal, distraction-free interface

---

## 🚀 Deployment

* **Backend**: Render (Express.js)
* **Frontend**: Vercel / Netlify
* Environment variables handled securely via platform settings

---

## 📈 Future Enhancements

* 🔐 JWT-based user authentication
* 💾 Persistent chat history
* ⏳ Streaming responses (typing effect)
* 🎨 Dark / Light mode
* 📱 Enhanced mobile responsiveness

---

## 🧑‍💻 Author

**Ritesh Kumar**
Frontend / Full-Stack Developer

Passionate about building scalable web applications and AI-powered systems.

---

## ⭐ Why This Project Matters

This project demonstrates:

* Modern React architecture
* Clean Express.js backend design
* AI integration using LLM APIs
* Prompt engineering awareness
* Real-world full-stack system design

Ideal for **Frontend**, **Full-Stack**, and **AI-Integrated Web Developer** roles.

---