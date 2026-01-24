import CodeBlock from "./CodeBlock";
import DocSection from "./docs/DocSection";


interface DocsRendererProps {
  data: {
    title: string;
    description?: string;
    sections: {
      heading: string;
      description?: string;
      code?: string;
      codes?: string[];
      block?: boolean;
      important?: boolean;
    }[];
  }[];
}

const DocsRenderer = ({ data }: DocsRendererProps) => {
  return (
    <div className="w-full">
      {data.map((doc, i) => (
        <DocSection
          key={i}
          id={i.toString()}
          title={doc.title}
          isLast={i === data.length - 1}
        >
          {/* Description */}
          {doc.description && (
            <p className="
              text-gray-400
              mb-6
              max-w-full
              sm:max-w-2xl
              lg:max-w-4xl
              text-sm
              sm:text-base
            ">
              {doc.description}
            </p>
          )}

          <ol
            className="
              list-decimal
              ml-4
              sm:ml-6
              lg:ml-8
              space-y-8
            "
          >
            {doc.sections.map((section, j) => (
              <li
                key={j}
                className={`
               space-y-3
               ${section.important
                    ? "border-l-2 border-yellow-400/50 pl-4"
                    : ""
                  }
             `}
              >

                {/* Section heading */}
                <h3
                  id={`section-${i}-${j}`}
                  className={`
    flex items-center gap-2
    font-semibold
    scroll-mt-24
    text-base sm:text-lg
    ${section.important
                      ? "text-yellow-400"
                      : "text-gray-200"
                    }
  `}
                >
                  {section.important && (
                    <span
                      className={`
        text-[10px]
        uppercase
        tracking-wide
        px-2 py-0.5
        rounded-full
        bg-yellow-400/10
        text-yellow-400
        border border-yellow-400/20
      `}
                    >
                      Important
                    </span>
                  )}

                  {section.heading}
                </h3>

                {/* Section description */}
                {section.description && (
                  <p
                    className="
                      text-gray-400
                      max-w-full
                      sm:max-w-2xl
                      lg:max-w-4xl
                      text-sm
                      sm:text-base
                    "
                  >
                    {section.description}
                  </p>
                )}

                {/* Single large code block */}
                {section.code && (
                  <div className="overflow-x-auto">
                    <CodeBlock
                      code={section.code}
                      language="tsx"
                      type="box"
                    />

                  </div>
                )}

                {/* Multiple inline commands */}
                {section.codes?.map((cmd, k) => (
                  <div key={k} className="overflow-x-auto">
                    <CodeBlock code={cmd} />
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </DocSection>
      ))}
    </div>
  );
};

export default DocsRenderer;
