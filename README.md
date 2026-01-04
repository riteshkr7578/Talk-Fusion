# 🤖 Full stack AI chat app

A modern **AI-powered chat frontend** built with **React**, designed to work seamlessly with a Groq-powered backend.  
The application supports **context-aware conversations**, **Markdown rendering**, and **clean UI interactions**.

---

## 🚀 Features

- 💬 **Real-time AI Chat Interface**
- 🧠 **Conversation Memory Support** (multi-turn context)
- ✍️ **Markdown Rendering** (code blocks, headings, lists)
- ⚡ **Fast & Responsive UI**
- 🔗 **Backend-agnostic** (works with Express/FastAPI)
- 🌐 **CORS-friendly API integration**

---

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript (ES6+)
- CSS / Tailwind CSS 
- React Hooks (`useState`, `useEffect`)
- Axios for API calls

**Backend (Connected)**
- Express.js
- Groq LLM API (LLaMA 3.1)
- REST API



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

- The frontend **stores the full chat history**
- Every new request sends:
  - Current user message
  - Previous messages (`history`)
- Backend injects history into the LLM prompt
- Enables **context-aware AI responses**

✔ Stateless backend  
✔ Scalable architecture  

---

## 🖥️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Backend URL
Update API endpoint inside your chat service or component:
```js
const API_URL = "http://localhost:8000/chat";
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

---

## 📸 UI Highlights

- Clean chat bubbles for **user & assistant**
- Markdown-supported AI responses
- Smooth scrolling and input handling
- Minimal, distraction-free design

---

## 📈 Future Enhancements

- 🔐 User authentication (JWT)
- 📜 Chat history persistence
- ⏳ Streaming responses (typing effect)
- 🎨 Theme switch (dark/light)
- 📱 Mobile-first UI improvements

---

## 🧑‍💻 Author

**Ritesh Kumar**  
Frontend / Full Stack Developer  
Passionate about building scalable web & AI-powered applications.

---

## ⭐ Why This Project Matters

This project demonstrates:
- Modern React architecture
- AI + frontend integration
- Prompt engineering awareness
- Real-world full-stack design thinking

Perfect for **frontend**, **full-stack**, and **AI-integrated web** roles.

---

If you want, I can also:
- ✨ Customize README for **resume screening**
- 📄 Write **project explanation for interviews**
- 🎥 Create a **video walkthrough script**
- 🧾 Generate **resume bullet points**

Just tell me 👌