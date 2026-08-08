import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";
import Spinner from "../components/Spinner";

import { useState, useEffect } from "react";

function Analysis() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [percentage, setPercentage] = useState(0);
  const [matchedFile, setMatchedFile] = useState("");
  const [topMatches, setTopMatches] = useState([]);
  const [matchedWords, setMatchedWords] = useState([]);
  const [documentText, setDocumentText] = useState("");

  

 

  // --------------------------------------------------
  // File validation
  // --------------------------------------------------

  function handleFileChange(event) {

    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {

      alert("Only PDF, DOCX and TXT files are allowed.");

      event.target.value = "";

      return;
    }

    setSelectedFile(file);

    // Reset previous result when a new file is selected
    setScore("");
    setPercentage(0);
    setMatchedFile("");
    setTopMatches([]);
    setMatchedWords([]);
    setDocumentText("");
  }

 
  

  // --------------------------------------------------
  // Check plagiarism
  // --------------------------------------------------

  async function handleCheckPlagiarism() {

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      // IMPORTANT: See exactly what backend sends
      console.log("FULL BACKEND RESPONSE:", data);

      // If backend returns an error
      if (!response.ok) {

        alert(data.message || "Something went wrong.");

        return;
      }

      // --------------------------------------------------
      // Get backend data safely
      // --------------------------------------------------

      setDocumentText(data.text || "");

      setMatchedWords(
        Array.isArray(data.matchedWords)
          ? data.matchedWords
          : []
      );

      console.log("Matched Words:");
      console.log(data.matchedWords);

      console.log("Top Matches:");
      console.log(data.topMatches);

      console.log("Best Match:");
      console.log(data.matchedFile);

      console.log("Similarity:");
      console.log(data.similarity);

      // --------------------------------------------------
      // Similarity
      // --------------------------------------------------

      const resultPercentage = Number(data.similarity || 0);

      console.log(
        "Setting percentage:",
        resultPercentage
      );

      const resultStatus =
        resultPercentage <= 20
          ? "Low"
          : resultPercentage <= 50
          ? "Moderate"
          : "High";

      // --------------------------------------------------
      // Store result
      // --------------------------------------------------

      setTopMatches(
        Array.isArray(data.topMatches)
          ? data.topMatches
          : []
      );

      setPercentage(resultPercentage);

      setMatchedFile(
        data.matchedFile || "No matching document"
      );

      setScore(
        `Plagiarism Score: ${resultPercentage}%`
      );

      // --------------------------------------------------
      // Save history
      // --------------------------------------------------

 

    } catch (error) {

      console.error(
        "Upload error:",
        error
      );

      alert(
        "Something went wrong while uploading the file."
      );

    } finally {

      setLoading(false);

    }

  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (

    <div className="Analysis">

      {/* HERO */}

      <div className="hero">

        <h1>🤖 Plagiarism Checker</h1>

        <p>
          Upload your document and detect plagiarism instantly.
        </p>

      </div>


      {/* UPLOAD + RESULT */}

      <div className="top-section">

        {/* Upload Section */}

        <div className="card upload-card">

          <UploadBox
            title="Upload Document"
            description="Choose a PDF, DOCX or TXT file."
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            loading={loading}
          />

          <button
            onClick={handleCheckPlagiarism}
            disabled={loading}
          >

            {loading
              ? "Checking..."
              : "Analyze Document"}

          </button>

        </div>


        {/* Result Section */}

        <div className="card result-section">

          {loading ? (

            <div className="loading-container">

              <Spinner />

              <p>
                Analyzing your document...
              </p>

            </div>

          ) : score ? (

            <ResultCard

              fileName={
                selectedFile
                  ? selectedFile.name
                  : "No file selected"
              }

              percentage={percentage}

              matchedFile={matchedFile}

              topMatches={topMatches}

              matchedWords={matchedWords}

              documentText={documentText}

              status={
                percentage <= 20
                  ? "Low"
                  : percentage <= 50
                  ? "Moderate"
                  : "High"
              }

            />

          ) : (

            <div className="empty-result">

              <h2>
                📊 Analysis Result
              </h2>

              <p>
                No document has been analyzed yet.
              </p>

              <p>

                Upload a document and click

                <strong>
                  {" "}Analyze Document{" "}
                </strong>

                to view the plagiarism report.

              </p>

            </div>

          )}

        </div>

      </div>


      {/* TOP MATCHING DOCUMENTS */}

      {topMatches.length > 0 && (

        <div className="top-matches-card">

          <h2>
            🏆 Top Matching Documents
          </h2>

          <div className="matches-list">

            {topMatches.map(
              (match, index) => (

                <div
                  className="match-item"
                  key={
                    match.fileName ||
                    index
                  }
                >

                  <div className="match-rank">

                    {index === 0 && "🥇"}

                    {index === 1 && "🥈"}

                    {index === 2 && "🥉"}

                  </div>

                  <div className="match-details">

                    <h3>
                      {match.fileName}
                    </h3>

                    <p>
                      {match.similarity}%
                      {" "}Similarity
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}


      {/* HIGHLIGHTED TEXT */}

      {documentText && (

        <details className="matched-section">

          <summary>
            📄 View Highlighted Text
          </summary>

          <div className="matched-text">

            {documentText
              .split(" ")
              .map(
                (word, index) => {

                  const cleanWord =
                    word
                      .toLowerCase()
                      .replace(
                        /[^\w]/g,
                        ""
                      );

                  return matchedWords.includes(
                    cleanWord
                  )

                    ? (
                      <mark key={index}>
                        {word}{" "}
                      </mark>
                    )

                    : (
                      word + " "
                    );

                }
              )}

          </div>

        </details>

      )}
      


    </div>

  );

}





export default Analysis;