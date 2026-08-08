import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import RecentChecks from "./pages/RecentChecks";
import About from "./pages/About";
import Report from "./pages/Report";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/analysis" element={<Analysis />} />

        <Route path="/history" element={<RecentChecks />} />

        <Route path="/about" element={<About />} />
        <Route
  path="/report/:id"
  element={<Report />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;