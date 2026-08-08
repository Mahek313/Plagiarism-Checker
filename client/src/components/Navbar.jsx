import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>🤖 AI Plagiarism Checker</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/analysis">Analysis</Link>

        <Link to="/history">Recent Checks</Link>

        <Link to="/about">About</Link>

      </div>

    </nav>
  );
}

export default Navbar;