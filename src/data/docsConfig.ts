export interface DocItem {
    id: string;
    label: string;
  }
  
  export interface DocSectionConfig {
    title: string;
    items: DocItem[];
  }
  
  export const docsConfig: DocSectionConfig[] = [
    {
      title: "Getting Started",
      items: [
        { id: "what-is-nextjs", label: "What is Next.js?" },
        { id: "how-to-use-docs", label: "How to use the docs" },
        { id: "next-steps", label: "Next Steps" },
      ],
    },
  ];
  