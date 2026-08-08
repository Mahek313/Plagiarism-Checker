const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  fileName: String,
  similarity: Number,
  matchedFile: String,
  topMatches: Array,
  matchedWords: Array,
  documentText: String
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);