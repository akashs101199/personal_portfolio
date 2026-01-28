
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const files = [
    "../Akash_Shanmuganathan_Resume.docx",
    "../Akash_Shanmuganathan_Portfolio.docx"
];

async function extractText(filePath) {
    const absolutePath = path.resolve(__dirname, filePath);
    try {
        const result = await mammoth.extractRawText({ path: absolutePath });
        console.log(`\n--- CONTENT FROM ${path.basename(filePath)} ---\n`);
        console.log(result.value);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
    }
}

async function main() {
    for (const file of files) {
        await extractText(file);
    }
}

main();
