function About() {
  return (
    <div className="about-page">

      <div className="about-card">

        <h1>🤖 About AI Plagiarism Checker</h1>

        <p>
          AI Plagiarism Checker is a web application that helps users detect
          plagiarism in PDF, DOCX and TXT documents by comparing uploaded files
          with existing documents stored in the system.
        </p>

        <div className="about-features">

          <div className="feature-box">
            📄
            <h3>Multiple File Formats</h3>
            <p>Supports PDF, DOCX and TXT documents.</p>
          </div>

          <div className="feature-box">
            📊
            <h3>Similarity Detection</h3>
            <p>Calculates plagiarism percentage accurately.</p>
          </div>

          <div className="feature-box">
            📝
            <h3>Matched Text Highlighting</h3>
            <p>Highlights similar words for quick comparison.</p>
          </div>

          <div className="feature-box">
            📁
            <h3>Recent Checks</h3>
            <p>Stores previous plagiarism reports locally.</p>
          </div>

        </div>

        <div className="tech-stack">

          <h2>🛠 Built With</h2>

          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>Multer</li>
            <li>pdf-parse</li>
            <li>JavaScript</li>
            <li>CSS3</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default About;