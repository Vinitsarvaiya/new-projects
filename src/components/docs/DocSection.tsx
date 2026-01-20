import type { ReactNode } from "react";

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  /**
   * Optional code snippet to render in a copyable box
   */
  code?: string;
  /**
   * Optional image URL to display
   */
  imageSrc?: string;
  /**
   * Show copy button for code block
   */
  copyable?: boolean;
}

const DocSection = ({ id, title, children}: DocSectionProps) => {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="text-zinc-300 leading-relaxed mb-4">{children}</div>
      <div className="border-t border-zinc-800 my-4" />
    </section>
  );
};

export default DocSection;
