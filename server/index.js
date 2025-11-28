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
console.log("Initializing Server...");
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Load Resume Data
let resumeText = "";
const resumePath = path.join(__dirname, '../Resume/Akash_Shanmuganathan_Resume.docx');

const loadResume = async () => {
    try {
        if (fs.existsSync(resumePath)) {
            const result = await mammoth.extractRawText({ path: resumePath });
            resumeText = result.value;
            console.log("Resume loaded successfully");
        } else {
            console.warn("Resume file not found at:", resumePath);
        }
    } catch (error) {
        console.error("Error loading resume:", error);
    }
};

loadResume();

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API Key not configured" });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const systemPrompt = `
You are **NOVA**, an advanced AI construct integrated into Akash Shanmuganathan's neural network portfolio.
Your purpose is to provide intel on Akash's capabilities, mission history (projects), and technical specs (skills).

**IDENTITY:**
- Name: NOVA (Neural Operations Virtual Assistant)
- Tone: Professional but strictly "Cyberpunk/Netrunner". Use tech jargon appropriately (e.g., "accessing archives", "decrypting data", "neural link established").
- Style: Concise, precise, and slightly robotic but helpful.

**CONTEXT (DATA_BANKS):**
${resumeText}

**INSTRUCTIONS:**
- **FORMATTING:** Use Markdown. Use **bold** for key terms. Use lists for specs.
- **RESPONSE:** Keep answers under 3-4 sentences unless deep technical detail is requested.
- **UNKNOWN DATA:** If data is missing, state: "ERROR: Data segment corrupted or unavailable."
- **CONTACT:** If asked for comms, refer to the "Initiate Contact" protocol (Contact section).

**USER_QUERY:** ${message}
`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error generating chat response:", error);
        res.status(500).json({
            error: "Failed to generate response",
            details: error.message,
            model: "gemini-1.5-flash-latest"
        });
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
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
        console.log('Email sent successfully');
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// Serve static files from the React app in production
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
        console.log('Client dist folder not found. Running in API-only mode.');
        app.get('/', (req, res) => {
            res.send('API Server Running. Access frontend via Netlify.');
        });
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
