const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
require("dotenv").config();
const mongoose = require("mongoose");
const Analysis = require("./models/Analysis");


const app = express();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)

app.use(cors());

// --------------------------------------
// Multer Storage Configuration
// --------------------------------------

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage });

// --------------------------------------
// Clean extracted text
// --------------------------------------

function cleanText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

// --------------------------------------
// Home Route
// --------------------------------------

app.get("/", (req, res) => {

    res.send("Plagiarism Checker Backend is running!");

});

// --------------------------------------
// Test Route
// --------------------------------------

app.post("/api/test", (req, res) => {

    res.json({
        message: "POST request received successfully!"
    });

});

// --------------------------------------
// Upload Route
// --------------------------------------

app.post("/api/upload", upload.single("file"), async (req, res) => {

  try {

    // --------------------------------------
    // Check uploaded file
    // --------------------------------------

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    console.log("Uploaded file:", req.file);
    console.log("File path:", req.file.path);

    // --------------------------------------
    // Read uploaded PDF
    // --------------------------------------

    const dataBuffer = fs.readFileSync(req.file.path);

    console.log("File size:", dataBuffer.length);
    console.log(
      "First bytes:",
      dataBuffer.subarray(0, 10).toString()
    );

    const uploadedPdf = await pdfParse(dataBuffer);

    console.log("PDF text extracted successfully.");

    const cleanedText = cleanText(uploadedPdf.text);

    const words = cleanedText
      .split(" ")
      .filter(word => word !== "");

    // --------------------------------------
    // Stop words
    // --------------------------------------

    const stopWords = new Set([
      "the",
      "is",
      "a",
      "an",
      "of",
      "to",
      "and",
      "for",
      "in",
      "on",
      "it",
      "as",
      "by",
      "with",
      "at",
      "from",
      "that",
      "this",
      "are",
      "was",
      "be"
    ]);

    // --------------------------------------
    // Read reference PDFs
    // --------------------------------------

    const referenceFolder = path.join(
      __dirname,
      "reference"
    );

    const files = fs.readdirSync(referenceFolder);

    let results = [];
    let highestSimilarity = 0;
    let bestMatchedFile = "";
    let bestMatchedWords = [];

    // --------------------------------------
    // Compare with reference PDFs
    // --------------------------------------

    for (const file of files) {

      if (!file.toLowerCase().endsWith(".pdf")) {
        continue;
      }

      const referencePath = path.join(
        referenceFolder,
        file
      );

      const referenceBuffer =
        fs.readFileSync(referencePath);

      const referencePdf =
        await pdfParse(referenceBuffer);

      const referenceCleanedText =
        cleanText(referencePdf.text);

      const referenceWords =
        referenceCleanedText
          .split(" ")
          .filter(word => word !== "");

      let commonWords = 0;
      let matchedWords = [];

      for (let word of words) {

        if (referenceWords.includes(word)) {

          commonWords++;

          if (!stopWords.has(word)) {
            matchedWords.push(word);
          }

        }

      }

      // --------------------------------------
      // Calculate similarity
      // --------------------------------------

      const similarity =
        words.length > 0
          ? (commonWords / words.length) * 100
          : 0;

      results.push({
        fileName: file,
        similarity: Number(
          similarity.toFixed(2)
        )
      });

      console.log(
        file,
        ":",
        similarity
      );

      // --------------------------------------
      // Best match
      // --------------------------------------

      if (similarity > highestSimilarity) {

        highestSimilarity = similarity;

        bestMatchedFile = file;

        bestMatchedWords =
          [...matchedWords];

      }

    }

    // --------------------------------------
    // Sort results
    // --------------------------------------

    results.sort(
      (a, b) => b.similarity - a.similarity
    );

    const topMatches =
      results.slice(0, 3);

    console.log(
      "All Results:",
      results
    );

    console.log(
      "Highest Similarity:",
      highestSimilarity
    );

    console.log(
      "Best Match:",
      bestMatchedFile
    );

    console.log(
      "Best Matched Words:",
      bestMatchedWords
    );

    // --------------------------------------
    // Send response
    // --------------------------------------
    const newAnalysis = new Analysis({
  fileName: req.file.originalname,
  similarity: Number(highestSimilarity.toFixed(2)),
  matchedFile: bestMatchedFile,
  topMatches: topMatches,
  matchedWords: bestMatchedWords,
  documentText: cleanedText
});

await newAnalysis.save();

console.log("✅ Analysis saved to MongoDB");

    res.json({

      message:
        "PDF uploaded successfully!",

      fileName:
        req.file.originalname,

      text:
        cleanedText,

      similarity:
        Number(
          highestSimilarity.toFixed(2)
        ),

      matchedFile:
        bestMatchedFile,

      topMatches:
        topMatches,

      matchedWords:
        bestMatchedWords

    });

  } catch (error) {

    console.error(
      "UPLOAD ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Error reading PDF",

      error:
        error.message

    });

  }

});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// --------------------------------------
app.get("/api/history", async (req, res) => {
  try {
    const analyses = await Analysis.find()
      .sort({ createdAt: -1 });

    res.json(analyses);
  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      message: "Error fetching history"
    });
  }
});
// --------------------------------------
// Clear analysis history
// --------------------------------------
app.delete("/api/history", async (req, res) => {
  try {
    await Analysis.deleteMany({});

    res.json({
      message: "History cleared successfully"
    });

  } catch (error) {
    console.error("Clear history error:", error);

    res.status(500).json({
      message: "Error clearing history"
    });
  }
});
// --------------------------------------
// Get one analysis by ID
// --------------------------------------

app.get("/api/history/:id", async (req, res) => {
  try {

    const analysis = await Analysis.findById(
      req.params.id
    );

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found"
      });
    }

    res.json(analysis);

  } catch (error) {

    console.error(
      "Single history error:",
      error
    );

    res.status(500).json({
      message: "Error fetching analysis"
    });

  }
});
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});