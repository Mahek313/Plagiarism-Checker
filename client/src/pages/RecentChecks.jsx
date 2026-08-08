import History from "../components/History";
import { useEffect, useState } from "react";

function RecentChecks() {

  const [history, setHistory] = useState([]);

  // Load history from MongoDB
  useEffect(() => {

    fetch("http://localhost:5000/api/history")
      .then((response) => response.json())
      .then((data) => {
        console.log("History from MongoDB:", data);
        setHistory(data);
      })
      .catch((error) => {
        console.error("Error loading history:", error);
      });

  }, []);

  // Clear history
  async function handleClearHistory() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/history",
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data.message);

      setHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  }

  return (
    <div className="recent-card">

      <h1>📂 Recent Plagiarism Checks</h1>

      <p>
        View all previously analyzed documents.
      </p>

      <History
        history={history}
        handleClearHistory={handleClearHistory}
      />

    </div>
  );
}

export default RecentChecks;