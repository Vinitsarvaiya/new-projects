import type { ReactNode } from "react";

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const DocSection = ({ id, title, children }: DocSectionProps) => {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="text-zinc-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default DocSection;
