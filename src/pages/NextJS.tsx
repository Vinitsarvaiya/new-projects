// src/pages/NextJS.tsx
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const NextJS = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">Next.js Setup</h1>

      <ol className="list-decimal ml-6 space-y-4">
        {/* Step 1 */}
        <li>
          <p>Create Vite + React project:</p>
          <CopyableCode code="npm create vite@latest my-app -- --template react-ts" />
        </li>

        <li>
          <p>Initialize a Next.js project:</p>
          <CopyableCode code="npx create-next-app@latest" />
        </li>


        {/* Step 2 */}
        <li>
          <p>Select package (Default) and enter project name</p>
        </li>

        {/* Step 3 */}
        <li>
          <p>Run the development server:</p>
          <CopyableCode code="npm run dev" />
        </li>

        {/* Step 4 */}
        <li>
          <p>Create pages for routing (inside <code className="bg-gray-800 px-1 rounded">pages/</code> folder):</p>
          <CopyableCode
            block
            code={`// pages/index.tsx
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.tsx
export default function About() {
  return <h1>About Page</h1>;
}`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p>Navigate between pages using <code className="bg-gray-800 px-1 rounded">Link</code>:</p>
          <CopyableCode
            block
            code={`import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p>Programmatic navigation using <code className="bg-gray-800 px-1 rounded">useRouter</code>:</p>
          <CopyableCode
            block
            code={`import { useRouter } from "next/router";

export default function GoToAbout() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about"); // navigate to About page
  };

  return <button onClick={handleClick}>Go to About</button>;
}`}
          />
        </li>

        {/* Step 7 */}
        <li>
          <p>Optional: Dynamic routes example:</p>
          <CopyableCode
            block
            code={`// pages/user/[id].tsx
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query; // access dynamic param

  return <h1>User ID: {id}</h1>;
}`}
          />
        </li>
      </ol>
    </Layout>
  );
};

export default NextJS;
