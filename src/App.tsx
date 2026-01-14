// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NextJS from "./pages/NextJS";
import ReactJS from "./pages/ReactJS";
import Backend from "./pages/Backend";
import TailwindVite from "./pages/TailwindVite";
import MongoDB from "./pages/Mongodb";
import MongoCommands from "./pages/MongoCommands";
import AuthMiddlewarePage from "./pages/AuthMiddleware";
import TokenCreation from "./pages/TokenCreation";
import FileUpload from "./pages/FileUpload";
import UserHookDoc from "./pages/Hokks";
import PostgresNode from "./pages/PostgresNode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/nextjs" />} />
        <Route path="/nextjs" element={<NextJS />} />
        <Route path="/reactjs" element={<ReactJS />} />
         <Route path="/hooks" element={<UserHookDoc />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/tokens" element={<TokenCreation />}/>
        <Route path="/tailwind" element={<TailwindVite />} />
        <Route path="/mongodb" element={<MongoDB />} />
        <Route path="/postgress" element={<PostgresNode />} />
        <Route path="/mongodbcommand" element={<MongoCommands />} />
        <Route path="/middleware" element={<AuthMiddlewarePage />}/>
        <Route path="/fileupload" element={<FileUpload />}/>
      </Routes>
    </Router>
  );
}

export default App;
