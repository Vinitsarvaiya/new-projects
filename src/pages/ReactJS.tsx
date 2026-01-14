import Layout from "../components/Layout";

const ReactJS = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">React.js Setup</h1>
      <ol className="list-decimal ml-6 space-y-1">
        <li>npx create-react-router@latest</li>
        <li>Or using Vite: <code className="bg-gray-800 px-1 rounded">npm create vite@latest my-app</code></li>
        <li>If issues, run:
          <ul className="list-disc ml-6 mt-1">
            <li>npx tsc --version</li>
            <li>rm -rf node_modules package-lock.json node_modules/.tmp</li>
            <li>npm install</li>
          </ul>
        </li>
      </ol>
    </Layout>
  );
};

export default ReactJS;
