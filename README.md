🤖 Talk Fusion — Full-Stack AI Chat Application (MERN)

**Talk Fusion** is a modern **full-stack AI chat application** built using the **MERN stack** and powered by **Groq’s LLaMA 3.1** large language model.
It delivers **context-aware, multi-turn conversations**, **Markdown-formatted responses**, and a **responsive, production-grade UI** inspired by real-world AI chat systems.

---

## 🚀 Features

* 💬 **Real-Time AI Chat** with low-latency responses
* 🧠 **Conversation Memory** for coherent multi-turn interactions
* ✍️ **Markdown Rendering** (headings, lists, code blocks)
* ⚡ **Fast & Responsive UI** (desktop + mobile)
* 🧩 **Intent-Aware Prompt Handling** (code vs explanation)
* 🗂️ **Multiple Chat Sessions** with sidebar-based navigation
* 🔗 **REST-based Frontend–Backend Architecture**
* 🌐 **CORS-enabled API** for secure cross-origin communication

---

## 🛠️ Tech Stack (MERN)

### Frontend

* **React (Vite)**
* JavaScript (ES6+)
* Tailwind CSS
* React Hooks (`useState`, `useEffect`, `useMemo`)
* Axios (API communication)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** (chat persistence for logged-in users)
* Mongoose (ODM)
* Groq SDK (LLaMA 3.1)
* RESTful APIs
* JWT-based authentication
* dotenv (environment configuration)
* CORS middleware

### Deployment

* **Backend:** Render
* **Frontend:** Vercel / Netlify

---

## 🔗 API Overview

### POST `/chat`

**Request**

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

## 🧠 Conversation Memory Design

* The **frontend maintains full chat history**
* Every request includes:

  * Current user message
  * Previous conversation messages
* The backend injects this history into the LLM prompt

### Design Benefits

* Stateless AI backend
* Scalable and cloud-friendly
* Easy to extend with streaming or advanced memory strategies

---

## 💬 Chat Lifecycle Logic (Key Highlight)

* The app always maintains **one empty chat**
* When the user sends the **first message**:

  * The chat becomes active
  * A **new empty chat is auto-created** in the background
* Logged-in users get **persistent chat history** from MongoDB
* Guest users can chat instantly without login

This logic closely mirrors **real-world AI chat platforms** and ensures a smooth multi-chat experience.

---

## 🖥️ Local Setup

### 1️⃣ Clone Repository

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

Create `.env` file:

```
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
MONGO_URI=uri_url
```

Start backend:

```bash
npm start
```

Backend runs at:

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

### 4️⃣ Frontend Environment Config

```js
const API_URL = "http://localhost:8000";
```

---

## 📸 UI Highlights

* Clean chat bubbles for **User & AI**
* Markdown-formatted AI responses
* Smooth auto-scrolling and typing indicators
* Sidebar-based multi-chat navigation
* Mobile-friendly slide-in sidebar
* Minimal, distraction-free design

---

## 🚀 Deployment Notes

* Backend deployed on **Render**
* Frontend deployed on **Vercel / Netlify**
* Secure environment variable handling
* Production-ready API and CORS configuration

---

## 📈 Planned Enhancements

* 🔐 Enhanced session-based authentication
* ⏳ Streaming AI responses (typing effect)
* 🎨 Theme toggle (dark / light)
* 📁 Chat search & categorization
* 📱 Improved mobile gestures

---

## 🧑‍💻 Author

**Ritesh Kumar**
Frontend / Full-Stack Developer

Passionate about building scalable web applications and AI-powered user experiences.

---

## ⭐ Why This Project Matters

This project demonstrates:

* Real-world **MERN stack application architecture**
* Clean and scalable Express.js API design
* Practical LLM integration with prompt engineering
* Advanced React state management
* End-to-end full-stack system design


