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
        }[];
    }[];
}

const DocsRenderer = ({ data }: DocsRendererProps) => {
    return (
        <>
            {data.map((doc, i) => (
                <DocSection
                    id={i.toString()}
                    title={doc.title}
                >
                    {/* Description */}
                    {doc.description && (
                        <p className="text-gray-400 mb-6 max-w-3xl">
                            {doc.description}
                        </p>
                    )}

                    <ol className="list-decimal ml-6 space-y-6">
                        {doc.sections.map((section, j) => (
                            <li key={j}>
                                {/* Section heading */}
                                <h3 className="font-semibold text-gray-200">
                                    {section.heading}
                                </h3>

                                {/* Section description */}
                                {section.description && (
                                    <p className="text-sm text-gray-400 mb-2">
                                        {section.description}
                                    </p>
                                )}

                                {/* Single large code block */}
                                {section.code && (
                                    <CodeBlock
                                        code={section.code}
                                        type="box"
                                    />
                                )}

                                {/* Multiple inline commands */}
                                {section.codes?.map((cmd, k) => (
                                    <CodeBlock key={k} code={cmd} />
                                ))}
                            </li>
                        ))}
                    </ol>
                </DocSection>
            ))}
        </>
    );
};

export default DocsRenderer;
