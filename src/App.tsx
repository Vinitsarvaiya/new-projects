// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NextJS from "./pages/NextJS";
import ReactJS from "./pages/ReactJS";
import Backend from "./pages/Backend";
import TailwindVite from "./pages/TailwindVite";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/nextjs" />} />
        <Route path="/nextjs" element={<NextJS />} />
        <Route path="/reactjs" element={<ReactJS />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/tailwind" element={<TailwindVite />} />
      </Routes>
    </Router>
  );
}

export default App;
