# 🌐 Cyberpunk Agentic Portfolio

> **"Constructing autonomous digital intelligences and resilient data infrastructures."**

A next-generation personal portfolio website built with a **Cyberpunk/Sci-Fi aesthetic**. This project goes beyond a static showcase, integrating a fully functional **Voice-Activated AI Assistant** that acts as a guide, answering questions about my experience, skills, and projects in real-time.



---

## 🚀 Key Features

### 1. 🗣️ Voice-Activated Neural Interface (The "HUD")
A fully immersive, voice-controlled AI assistant inspired by Iron Man's JARVIS and Cyberpunk 2077.
*   **Voice Interaction**: Talk to the portfolio using natural language. It listens via the Web Speech API and responds with synthesized speech.
*   **Context-Aware AI**: Powered by **Google Gemini**, the AI has full context of my resume, projects, and skills. It can answer specific questions like *"Tell me about your experience with AWS"* or *"How did you build the banking agent?"*.
*   **Visualizers**: Dynamic audio visualizers that react to voice input/output:
    *   **Cyberpunk Bars**: Segmented, glitching digital bars.
    *   **Neural Orb**: A morphing, pulsing sphere.
    *   **Flux Field**: Particle energy field.
*   **Boot Sequence**: A cinematic "System Initialization" animation that runs on the first session load.

### 2. 🎛️ Cyberdeck Skills Grid
A tactical, hardware-inspired display of technical capabilities.
*   **Data Cartridges**: Skills are rendered as physical "chips" or modules.
*   **Context on Hover**: Hovering over a skill "slots" the card forward and decrypts the **specific usage context** (e.g., hovering "React" reveals "Portfolio & Dashboards").
*   **Glitch Effects**: Text decodes with a matrix-style character shuffle.

### 3. 🌌 Immersive 3D Environment
*   **Warp Tunnel**: A Three.js particle tunnel that draws the user into the experience.
*   **Hex Grid**: A floating background grid representing structured data.
*   **Interactive Elements**: Tilt-enabled project cards and neon-glowing UI components.

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **Core**: React 18, Vite
*   **Styling**: Tailwind CSS, PostCSS
*   **Animations**: Framer Motion (UI transitions), CSS Keyframes (Glitches, Scans)
*   **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
*   **Icons**: Lucide React

### Backend (Server)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **AI Integration**: Google Generative AI SDK (Gemini)
*   **Email**: Nodemailer (for contact form)

### APIs & Services
*   **Web Speech API**: Native browser API for Speech-to-Text (STT) and Text-to-Speech (TTS).
*   **Google Gemini Pro**: LLM for generating intelligent chat responses.

---

## 📡 System Architecture & Flow

1.  **Initialization**:
    *   User lands on the site.
    *   `VoiceInterface` component initializes.
    *   **Boot Sequence** runs (once per session) to establish the "Neural Link".

2.  **Voice Input**:
    *   User clicks the "Microphone" or "Activity" button.
    *   **Speech Recognition** captures audio and converts it to text.

3.  **AI Processing**:
    *   The text query is sent to the **Express Backend** (`/api/chat`).
    *   The backend constructs a prompt including the **System Context** (Resume data, Project details).
    *   **Gemini API** generates a persona-based response (e.g., "As an AI Engineer...").

4.  **Response & Synthesis**:
    *   The text response is sent back to the frontend.
    *   **Speech Synthesis** reads the response aloud using a selected system voice.
    *   **Visualizers** animate in sync with the "Speaking" state.

---

## 💻 Local Setup

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   Google Gemini API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/akashs101199/personal_portfolio.git
    cd personal_portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    # Install root dependencies (concurrently)
    npm install

    # Install Client dependencies
    cd client && npm install

    # Install Server dependencies
    cd ../server && npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5001
    GEMINI_API_KEY=your_gemini_api_key_here
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_specific_password
    ```

4.  **Run the Application**:
    From the root directory:
    ```bash
    npm start
    ```
    *   Client will run on `http://localhost:5173`
    *   Server will run on `http://localhost:5001`

---

## 📂 Project Structure

```
personal_portfolio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (VoiceInterface, SkillCard, etc.)
│   │   ├── App.jsx         # Main Application Layout
│   │   └── index.css       # Global Styles & Tailwind
│   └── vite.config.js      # Vite Config & Proxy
├── server/                 # Express Backend
│   ├── index.js            # API Routes & Server Logic
│   └── data/               # Resume & Context Data
└── package.json            # Root scripts
```

---

## 🔮 Future Roadmap
*   [ ] **RAG Integration**: Connect to a vector database (Pinecone/Chroma) for deeper knowledge retrieval.
*   [ ] **Vision Capabilities**: Allow the AI to "see" and analyze uploaded images.
*   [ ] **Autonomous Agents**: Integrate CrewAI to have agents perform background tasks.

---

*Built with 💻 and ☕ by Akash Shanmuganathan*
