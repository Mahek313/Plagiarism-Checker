import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalysisResult from "../components/AnalysisResult";

function Report() {

  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`http://localhost:5000/api/history/${id}`)
      .then((response) => response.json())
      .then((data) => {

        console.log("Report data:", data);
        console.log("DOCUMENT TEXT:", data.documentText);
console.log("MATCHED WORDS:", data.matchedWords);

        setAnalysis(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error loading report:",
          error
        );

        setLoading(false);

      });

  }, [id]);

  if (loading) {
    return <p>Loading report...</p>;
  }

  if (!analysis) {
    return <p>Report not found.</p>;
  }

  return (
    <div className="report-page">

      <div className="hero">
        <h1>📊 Plagiarism Report</h1>
        <p>
          Previous analysis result
        </p>
      </div>

      <AnalysisResult
        fileName={analysis.fileName}
        percentage={Number(analysis.similarity)}
        matchedFile={analysis.matchedFile}
        topMatches={analysis.topMatches || []}
        matchedWords={analysis.matchedWords || []}
        documentText={analysis.documentText || ""}
      />

    </div>
  );
}

export default Report;