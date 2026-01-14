// src/pages/NextJS.tsx
import React from "react";
import Layout from "../components/Layout";

const NextJS = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">Next.js Setup</h1>
      <ol className="list-decimal ml-6 space-y-1">
        <li>npx create-next-app@latest</li>
        <li>Select package (Default)</li>
        <li>Enter Name</li>
      </ol>
    </Layout>
  );
};

export default NextJS;
