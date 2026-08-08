import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <div className="hero-section">

        <h1>🤖 Plagiarism Checker</h1>

        <p>
          Detect plagiarism in PDF, DOCX and TXT documents quickly and accurately.
        </p>

        <Link to="/analysis">
          <button className="hero-btn">
            Start Analysis
          </button>
        </Link>

      </div>

      <div className="features">

        <div className="feature-card">
          <h3>⚡ Fast Detection</h3>
          <p>Analyze documents in seconds.</p>
        </div>

        <div className="feature-card">
          <h3>📄 Multiple Formats</h3>
          <p>Supports PDF, DOCX and TXT files.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Accurate Results</h3>
          <p>View similarity score, best match and highlighted text.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;