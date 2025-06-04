 import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StockPage from "StockPage.jsx";

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/">Stock Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<StockPage />} />
        </Routes>
      </div>
    </Router>
  );
}