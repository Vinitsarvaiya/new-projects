// src/pages/TailwindVite.tsx
import React from "react";
import Layout from "../components/Layout";

const TailwindVite = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">React + Tailwind (Vite)</h1>
      <ol className="list-decimal ml-6 space-y-2">
        <li>npm install -D tailwindcss @tailwindcss/vite</li>
        <li>In <code className="bg-gray-800 px-1 rounded">src/index.css</code>: <code>@import "tailwindcss";</code></li>
        <li>vite.config.ts:
          <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto text-sm">{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()]
});`}</pre>
        </li>
        <li>src/main.tsx:
          <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto text-sm">{`import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}</pre>
        </li>
      </ol>
    </Layout>
  );
};

export default TailwindVite;
