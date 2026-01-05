🤖 Talk Fusion — Full-Stack AI Chat Application

Talk Fusion is a modern full-stack AI chat application built with React and Express.js, powered by Groq’s LLaMA 3.1 model.
It delivers context-aware, multi-turn conversations, Markdown-formatted responses, and a responsive, production-grade UI inspired by real-world chat systems.

⸻

🚀 Features
	•	💬 Real-Time AI Chat with low-latency responses
	•	🧠 Conversation Memory for coherent multi-turn interactions
	•	✍️ Markdown Rendering (headings, lists, code blocks)
	•	⚡ Fast & Responsive UI (desktop + mobile)
	•	🧩 Intent-Aware Prompt Handling (code vs explanation)
	•	🔗 REST-based Frontend–Backend Architecture
	•	🌐 CORS-enabled Express Backend
	•	🗂️ Multiple Chat Sessions with sidebar navigation

⸻

🛠️ Tech Stack

Frontend
	•	React (Vite)
	•	JavaScript (ES6+)
	•	Tailwind CSS
	•	React Hooks (useState, useEffect, useMemo)
	•	Axios (API communication)

Backend
	•	Node.js
	•	Express.js
	•	Groq SDK (LLaMA 3.1)
	•	RESTful APIs
	•	dotenv (environment configuration)
	•	CORS middleware

Deployment
	•	Backend: Render
	•	Frontend: Vercel / Netlify

⸻

🔗 API Overview

POST /chat

Request

{
  "message": "Your message here",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi!" }
  ]
}

Response

{
  "reply": "AI-generated response"
}


⸻

🧠 Conversation Memory Design
	•	The frontend maintains chat history
	•	Each request sends:
	•	Current user input
	•	Previous conversation messages
	•	The backend injects this history into the LLM prompt
	•	Enables context-aware, multi-turn conversations

Design Benefits
	•	Stateless backend
	•	Scalable and cloud-friendly
	•	Easy to extend with persistence or streaming

⸻

🖥️ Local Setup

1️⃣ Clone Repository

git clone https://github.com/riteshkr7578/Talk-Fusion.git
cd Talk-Fusion


⸻

2️⃣ Backend Setup

cd backend
npm install

Create .env:

GROQ_API_KEY=your_groq_api_key

Start server:

npm start

Backend runs at:

http://localhost:8000


⸻

3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev


⸻

4️⃣ Environment Configuration (Frontend)

const API_URL = "http://localhost:8000";


⸻

📸 UI Highlights
	•	Clean chat bubbles for user and AI
	•	Markdown-formatted AI responses
	•	Smooth auto-scrolling and input handling
	•	Sidebar-based multi-chat navigation
	•	Minimal, distraction-free design

⸻

🚀 Deployment Notes
	•	Backend deployed on Render
	•	Frontend deployed on Vercel / Netlify
	•	Environment variables managed via platform settings
	•	Production-ready CORS and API configuration

⸻

📈 Planned Enhancements
	•	🔐 JWT-based authentication
	•	💾 Persistent chat storage
	•	⏳ Streaming AI responses (typing effect)
	•	🎨 Theme toggle (dark / light)
	•	📱 Advanced mobile interactions

⸻

🧑‍💻 Author

Ritesh Kumar
Frontend / Full-Stack Developer

Passionate about building scalable web applications and AI-powered user experiences.

⸻

⭐ Why This Project Matters

This project showcases:
	•	Real-world React application architecture
	•	Clean and scalable Express.js backend
	•	Practical LLM integration
	•	Prompt-engineering awareness
	•	End-to-end full-stack system design

