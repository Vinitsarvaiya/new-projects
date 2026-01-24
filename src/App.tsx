// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import NextJS from "./pages/NextJS";
// import ReactJS from "./pages/ReactJS";
// import Backend from "./pages/Backend";
// import TailwindVite from "./pages/TailwindVite";
// import MongoDB from "./pages/Mongodb";
// import MongoCommands from "./pages/MongoCommands";
// import AuthMiddlewarePage from "./pages/AuthMiddleware";
// import TokenCreation from "./pages/TokenCreation";
// import FileUpload from "./pages/FileUpload";
// import UserHookDoc from "./pages/Hokks";
// import PostgresNode from "./pages/PostgresNode";
import Navbar from "./components/navbar/Navbar";
import Docs from "./pages/Docs";
import { reactAxios, reactDocs, reactRedux, reactRouter } from "./data/ReactDocs";


function App() {
  return (
    <div className="min-h-screen bg-black text-white sidebar-scroll">
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/setup" />} />
        <Route path="/setup" element={<Docs src={reactDocs}/>} />
        <Route path="/axios" element={<Docs src={reactAxios}/>} />
        <Route path="/redux-setup" element={<Docs src={reactRedux}/>} />
        <Route path="/router-setup" element={<Docs src={reactRouter}/>} />
        {/* <Route path="/nextjs" element={<NextJS />} />
         <Route path="/hooks" element={<UserHookDoc />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/tokens" element={<TokenCreation />}/>
        <Route path="/tailwind" element={<TailwindVite />} />
        <Route path="/mongodb" element={<MongoDB />} />
        <Route path="/postgress" element={<PostgresNode />} />
        <Route path="/mongodbcommand" element={<MongoCommands />} />
        <Route path="/middleware" element={<AuthMiddlewarePage />}/>
        <Route path="/fileupload" element={<FileUpload />}/> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/nextjs" />} />
    //     <Route path="/nextjs" element={<NextJS />} />
    //     <Route path="/reactjs" element={<ReactJS />} />
    //      <Route path="/hooks" element={<UserHookDoc />} />
    //     <Route path="/backend" element={<Backend />} />
    //     <Route path="/tokens" element={<TokenCreation />}/>
    //     <Route path="/tailwind" element={<TailwindVite />} />
    //     <Route path="/mongodb" element={<MongoDB />} />
    //     <Route path="/postgress" element={<PostgresNode />} />
    //     <Route path="/mongodbcommand" element={<MongoCommands />} />
    //     <Route path="/middleware" element={<AuthMiddlewarePage />}/>
    //     <Route path="/fileupload" element={<FileUpload />}/>
    //   </Routes>
    // </Router>
