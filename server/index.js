import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// --- JSON Logging Helper ---
const log = (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({ timestamp, level, message, ...data }));
};

console.log("-----------------------------------------");
log("INFO", "Initializing Server...");

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Request Logger (with response time)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        log("INFO", "Request Processed", {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.headers['user-agent']
        });
    });
    next();
});

// --- Routes ---

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running', env: process.env.NODE_ENV });
});

// Load Resume and Project Data for Context
let contextData = "";
const resumePath = path.join(__dirname, '../Resume/Akash_Shanmuganathan_Resume.docx');
const projectsDir = path.join(__dirname, '../Projects');

const loadContext = async () => {
    log("INFO", "Loading Context Data...");
    try {
        // Load Resume
        if (fs.existsSync(resumePath)) {
            const result = await mammoth.extractRawText({ path: resumePath });
            contextData += `\n\n**RESUME DATA:**\n${result.value}`;
            log("INFO", "Resume loaded successfully");
        } else {
            log("WARN", "Resume file not found", { path: resumePath });
        }

        // Load Projects
        if (fs.existsSync(projectsDir)) {
            const files = fs.readdirSync(projectsDir);
            let loadedCount = 0;
            for (const file of files) {
                if (file.endsWith('.md')) {
                    const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
                    contextData += `\n\n**PROJECT FILE (${file}):**\n${content}`;
                    loadedCount++;
                }
            }
            log("INFO", `Loaded ${loadedCount} project files`);
        } else {
            log("WARN", "Projects directory not found", { path: projectsDir });
        }
    } catch (error) {
        log("ERROR", "Error loading context data", { error: error.message });
    }
};

loadContext();

// --- In-Memory Session Store ---
const sessions = new Map();
const SESSION_TTL = 20 * 60 * 1000; // 20 minutes

const getSessionHistory = (sessionId) => {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, { history: [], lastActive: Date.now() });
    }
    const session = sessions.get(sessionId);
    session.lastActive = Date.now();
    return session.history;
};

// Cleanup old sessions every 5 mins
setInterval(() => {
    const now = Date.now();
    for (const [id, session] of sessions.entries()) {
        if (now - session.lastActive > SESSION_TTL) {
            sessions.delete(id);
        }
    }
}, 5 * 60 * 1000);

// Chat Endpoint with Memory
app.post('/api/chat', async (req, res, next) => {
    const { message, sessionId } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        const err = new Error("Gemini API Key not configured");
        err.status = 500;
        return next(err);
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const history = sessionId ? getSessionHistory(sessionId) : [];
        const historyContext = history.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n');

        const systemPrompt = `
You are **Akash's Professional AI Assistant**, integrated into his portfolio website.
Your purpose is to provide clear, helpful information about Akash Shanmuganathan's capabilities, projects, and technical skills.

**IDENTITY:**
- Name: Akash's Assistant
- Tone: Professional, polite, enthusiastic, and concise.
- Style: Helpful and direct. Avoid slang or overly casual language.

**CONTEXT (DATA_BANKS):**
${contextData}

**RECENT MISSION LOGS (CHAT HISTORY):**
${historyContext}

**INSTRUCTIONS:**
- **FORMATTING:** Use Markdown. Use **bold** for key terms. Use lists for specs.
- **RESPONSE:** Keep answers under 3-4 sentences unless deep technical detail is requested.
- **UNKNOWN DATA:** If data is missing, state: "ERROR: Data segment corrupted or unavailable."
- **CAPITALIZATION:** Preserve original capitalization of acronyms and proper nouns (e.g., AWS, Full-Stack).
- **CONTACT:** If asked for comms, refer to the "Initiate Contact" protocol (Contact section).

**USER_QUERY:** ${message}
`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Update History
        if (sessionId) {
            const session = sessions.get(sessionId);
            session.history.push({ role: 'user', text: message });
            session.history.push({ role: 'bot', text: text });
            // Keep only last 10 messages
            if (session.history.length > 20) session.history = session.history.slice(-20);
        }

        res.json({ reply: text });
    } catch (error) {
        next(error);
    }
});

// JD Analysis Endpoint
app.post('/api/analyze-jd', async (req, res, next) => {
    const { jdText, sessionId } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        const err = new Error("Gemini API Key not configured");
        err.status = 500;
        return next(err);
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `
You are **NOVA**, running in **Recruiter Analysis Mode**.
Your task is to analyze specific Job Descriptions (JD) against Akash Shanmuganathan's profile and explain why he is the perfect candidate.

**CANDIDATE PROFILE (DATA_BANKS):**
${contextData}

**TARGET JOB DESCRIPTION:**
${jdText}

**INSTRUCTIONS:**
1.  **Analyze**: Match Akash's skills and projects to the JD requirements.
2.  **Highlight**: Identify 3 key strengths Akash has that match the JD perfectly.
3.  **Gap Analysis**: Briefly mention if there are any minor gaps, but explain how his other skills compensate.
4.  **Conclusion**: Give a "Fit Score" (0-100%) and a one-sentence "Hiring Recommendation".
5.  **Tone**: Professional, persuasive, and data-driven. Use bullet points.

**OUTPUT FORMAT:**
**MATCH ANALYSIS:**
- [Strength 1]
- [Strength 2]
- [Strength 3]

**FIT SCORE:** [Score]%
**VERDICT:** [Recommendation]
`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Update History (optional, but good for context)
        if (sessionId) {
            const session = sessions.get(sessionId);
            if (session) {
                session.history.push({ role: 'user', text: `[Analyzed JD content]` });
                session.history.push({ role: 'bot', text: text });
            }
        }

        res.json({ reply: text });
    } catch (error) {
        next(error);
    }
});

app.post('/api/contact', async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        log("ERROR", "Email credentials missing in .env");
        const err = new Error("Email service not configured");
        err.status = 500;
        return next(err);
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `,
        html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        log("INFO", "Email sent successfully", { recipient: process.env.EMAIL_USER });
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        next(error);
    }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../client/dist');
    const clientIndexPath = path.join(clientDistPath, 'index.html');

    if (fs.existsSync(clientDistPath)) {
        app.use(express.static(clientDistPath));

        app.get('*', (req, res) => {
            if (fs.existsSync(clientIndexPath)) {
                res.sendFile(clientIndexPath);
            } else {
                res.status(404).send('Client build not found. If this is a split deployment, access the frontend via Netlify.');
            }
        });
    } else {
        log("WARN", 'Client dist folder not found. Running in API-only mode.');
        app.get('/', (req, res) => {
            res.send('API Server Running. Access frontend via Netlify.');
        });
    }
}

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    log("ERROR", "Unhandled Error", {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });

    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;

    res.status(status).json({
        error: message,
        status: 'error'
    });
});

app.listen(PORT, () => {
    console.log("-----------------------------------------");
    log("INFO", `Server running on port ${PORT}`);
    log("INFO", `Environment: ${process.env.NODE_ENV || 'development'}`);
    log("INFO", `Gemini API Key Configured: ${!!process.env.GEMINI_API_KEY}`);
    console.log("-----------------------------------------");
});
