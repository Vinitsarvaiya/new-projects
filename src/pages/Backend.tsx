// src/pages/Backend.tsx
import React from "react";
import Layout from "../components/Layout";

const Backend = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">Backend Setup (Node + Express + TS)</h1>
      <ol className="list-decimal ml-6 space-y-2">
        <li>mkdir my-backend &amp; cd my-backend</li>
        <li>npm init -y</li>
        <li>npm install express cors dotenv</li>
        <li>npm install -D typescript ts-node-dev @types/node @types/express @types/cors</li>
        <li>npx tsc --init &amp; npm install --save-dev tsx</li>
        <li>Create <code className="bg-gray-800 px-1 rounded">index.ts</code>, <code className="bg-gray-800 px-1 rounded">tsconfig.json</code>, <code className="bg-gray-800 px-1 rounded">package.json</code></li>
        <li>Add scripts:
          <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto text-sm">{`"scripts": {
  "dev": "tsx watch index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}`}</pre>
        </li>
        <li>index.ts:
          <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto text-sm">{`import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port", process.env.PORT || 5000);
});`}</pre>
        </li>
      </ol>
    </Layout>
  );
};

export default Backend;
