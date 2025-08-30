# React + Vite
# Hari ChatBot

A modern, professional ChatGPT-like chatbot UI built with React, TailwindCSS, and Groq Llama3 API.

---



## System Architecture

![System Architecture](architecture-diagram.png)

---

## Workflow Chart

![Workflow Chart](workflow-chart.png)

---

## Components & Workflow

### 1. User (Client)
- Interacts with the chatbot UI, types messages, and views responses.

### 2. React Chatbot UI (Frontend)
- Built with React and TailwindCSS for a modern, responsive design.
- Handles user input, displays chat history, and manages chat sessions.
- Sends user messages to the backend API and displays responses.

### 3. API Server (Groq/Llama3)
- Receives chat requests from the frontend.
- Forwards messages to the Llama3 LLM model for processing.
- Returns generated responses to the frontend.

### 4. LLM Model (Llama3)
- Processes the prompt and generates a relevant, human-like response.

---

## Workflow Process

1. **User** types a message in the chat UI.
2. **Frontend** sends the message to the backend API endpoint.
3. **API Server** receives the message and forwards it to the LLM model.
4. **LLM Model** generates a response and sends it back to the API server.
5. **API Server** returns the response to the frontend.
6. **Frontend** displays the response in the chat UI.

---

## Example API Response

```json
{
	"id": "chatcmpl-123",
	"object": "chat.completion",
	"created": 1714400000,
	"model": "llama3-8b-8192",
	"choices": [
		{
			"index": 0,
			"message": {
				"role": "assistant",
				"content": "Hello! How can I help you today?"
			},
			"finish_reason": "stop"
		}
	]
}
```

---

## Project Structure

```
├── public/
│   └── ai-generated-8747658_1920.jpg
├── src/
│   ├── components/
│   │   └── Chatbot.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── docs/
│   └── system-architecture.mermaid
├── index.html
├── package.json
└── README.md
```

---

## How to Run

1. Clone the repo and install dependencies:
	 ```bash
	 git clone <repo-url>
	 cd chatbot-Hari
	 npm install
	 ```
2. Add your Groq API key to a `.env` file as `VITE_GROQ_API_KEY`.
3. Start the development server:
	 ```bash
	 npm run dev
	 ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---



## License

MIT
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
