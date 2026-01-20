import DocsLayout from "../components/layout/DocsLayout";
import DocSection from "../components/docs/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Toaster } from "react-hot-toast";
import DocsRenderer from "../components/DocsRenderer";
import { reactDocs } from "../data/ReactDocs";

const Docs = () => {
  return (
    <DocsLayout>
      {/* <DocSection
        id="quick-start"
        title="Quick Start"
      >
        Follow these steps to quickly start a Next.js project.
      </DocSection>

      <DocSection
        id="quick-start"
        title="Quick Start"
      >
        Follow these steps to quickly start a Next.js project.
      </DocSection> */}
      {/* <DocSection
        id="nextjs-overview"
        title="What is Next.js?"
      > */}
        <Toaster position="bottom-right" />
        <DocsRenderer data={reactDocs} />
      {/* </DocSection> */}


      <DocSection id="next-steps" title="Next Steps">
        <p>
          Build stuff, break stuff, learn fast. That’s the loop.
        </p>
        <CodeBlock
          code={`npx create-next-app@latest
    
    What is your project named? my-app
    Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences`}
          language="aaa"
        />

      </DocSection>
    </DocsLayout>
  );
};

export default Docs;
