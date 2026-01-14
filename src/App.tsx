// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NextJS from "./pages/NextJS";
import ReactJS from "./pages/ReactJS";
import Backend from "./pages/Backend";
import TailwindVite from "./pages/TailwindVite";
import MongoDB from "./pages/Mongodb";
import MongoCommands from "./pages/MongoCommands";
import AuthMiddlewarePage from "./pages/AuthMiddleware";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/nextjs" />} />
        <Route path="/nextjs" element={<NextJS />} />
        <Route path="/reactjs" element={<ReactJS />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/tailwind" element={<TailwindVite />} />
        <Route path="/mongodb" element={<MongoDB />} />
        <Route path="/mongodbcommand" element={<MongoCommands />} />
        <Route path="middleware" element={<AuthMiddlewarePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
