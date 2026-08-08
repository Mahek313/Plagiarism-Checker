# Plagiarism Checker

A web-based plagiarism detection application that analyzes uploaded documents and compares them against a collection of reference documents.

## Features

- 📄 Upload PDF, DOCX and TXT documents
- 🔍 Detect similarity with reference documents
- 📊 Display plagiarism percentage
- 🏆 Show top matching documents
- 📝 Highlight matched words
- 📂 Store analysis history in MongoDB
- 📋 View previous analysis reports
- 🗑️ Clear analysis history
- ⚡ React-based user interface

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- Multer
- pdf-parse

### Database
- MongoDB
- Mongoose

## Project Structure

```text
AI-Plagiarism-Checker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── reference/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md