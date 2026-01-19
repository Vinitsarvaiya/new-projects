import DocsLayout from "../components/layout/DocsLayout";
import DocSection from "../components/docs/DocSection";

const Docs = () => {
  return (
    <DocsLayout>
      <DocSection id="what-is-nextjs" title="What is Next.js?">
        <p>
          Next.js is a React framework for building fast, scalable web apps.
        </p>
      </DocSection>

      <DocSection id="how-to-use-docs" title="How to use the docs">
        <p>
          Navigate using the sidebar and jump sections using the page outline.
        </p>
      </DocSection>

      <DocSection id="next-steps" title="Next Steps">
        <p>
          Build stuff, break stuff, learn fast. That’s the loop.
        </p>
      </DocSection>
    </DocsLayout>
  );
};

export default Docs;
