import type { ReactNode } from "react";

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const DocSection = ({ id, title, children }: DocSectionProps) => {
  return (
    <section id={id} className="mb-12 scroll-mt-20 px-4 sm:px-6 lg:px-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
        {children}
      </div>
      <div className="border-t border-zinc-800 my-4" />
    </section>
  );
};

export default DocSection;

