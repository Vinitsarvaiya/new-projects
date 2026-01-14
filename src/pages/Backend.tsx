// src/pages/Backend.tsx
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const Backend = () => {
  return (
    <Layout>
        <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        Backend Setup (Node + Express + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Create backend directory and move into it</p>
          <CopyableCode code="mkdir server" />
          <CopyableCode code="cd server" />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">Initialize Node.js project</p>
          <CopyableCode code="npm init -y" />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">Install runtime dependencies</p>
          <CopyableCode code="npm install express cors dotenv" />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Install development dependencies</p>
          <CopyableCode code="npm install -D typescript ts-node-dev @types/node @types/express @types/cors" />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">Initialize TypeScript and install TSX</p>
          <CopyableCode code="npx tsc --init" />
          <CopyableCode code="npm install --save-dev tsx" />
        </li>

        {/* Step 6 */}
        <li>
          <p className="mb-2">
            Create required files:
            <code className="bg-gray-800 px-1 rounded mx-1">index.ts</code>,
            <code className="bg-gray-800 px-1 rounded mx-1">tsconfig.json</code>,
            <code className="bg-gray-800 px-1 rounded mx-1">package.json</code>
          </p>
        </li>

        {/* Step 7 */}
        <li>
          <p className="mb-2">
            Update scripts in{" "}
            <code className="bg-gray-800 px-1 rounded">package.json</code>
          </p>
          <CopyableCode
            block
            code={`{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "tsx watch index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^25.0.1",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  }
}
`}
          />
        </li>
        <li>
          <p className="mb-2">Install it</p>
          <CopyableCode code="npm i" />
        </li>

        <li>
          <p className="mb-2">
            update {" "}
            <code className="bg-gray-800 px-1 rounded">tsconfig.json</code>
          </p>
          <CopyableCode
            block
            code={`{
  "compilerOptions": {
    "module": "NodeNext",
    "target": "ES2020",
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true
  }
}
`}
          />
        </li>

        {/* Step 8 */}
        <li>
          <p className="mb-2">
            Create Express server in{" "}
            <code className="bg-gray-800 px-1 rounded">index.ts</code>
          </p>
          <CopyableCode
            block
            code={`import express from "express";
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
});`}
          />
        </li>

         <li>
          <p className="mb-2">start the server</p>
          <CopyableCode code="npm run dev" />
        </li>

      </ol>
    </Layout>
  );
};

export default Backend;
