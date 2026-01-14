import React from "react";
import Layout from "../components/Layout";
import toast, { Toaster } from "react-hot-toast";

export const CopyableCode = ({
  code,
  block = false,
}: {
  code: string;
  block?: boolean;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="relative mt-3 w-full">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs hover:bg-gray-600 transition z-10"
      >
        Copy
      </button>

      {/* Code Block */}
      <pre
        className={`w-full bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm ${
          block ? "" : "whitespace-nowrap"
        }`}
      >
        <code className="block w-full">{code}</code>
      </pre>
    </div>
  );
};

const ReactJS = () => {
  return (
    <Layout>
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">React.js Setup</h1>
      <ol className="list-decimal ml-6 space-y-2">
        <li>
          <CopyableCode code="npx create-react-app my-app" />
        </li>
        <li>
          <CopyableCode code="cd my-app" />
        </li>
        <li>
          <CopyableCode code="npm install react-router-dom" />
        </li>
        <li>If using Vite (alternative):
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>
              <CopyableCode code="npm create vite@latest my-app" />
            </li>
            <li>
              <CopyableCode code="cd my-app" />
            </li>
            <li>
              <CopyableCode code="npm install" />
            </li>
          </ul>
        </li>
        <li>If any issues:
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>
              <CopyableCode code="npx tsc --version" />
            </li>
            <li>
              <CopyableCode code="rm -rf node_modules package-lock.json node_modules/.tmp" />
            </li>
            <li>
              <CopyableCode code="npm install" />
            </li>
          </ul>
        </li>
      </ol>
    </Layout>
  );
};

export default ReactJS;
