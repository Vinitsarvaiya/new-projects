import type { ReactNode } from "react";

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  isLast: boolean
}

const DocSection = ({ id, title, children, isLast }: DocSectionProps) => {
  return (
    <section
      id={id}
      className="mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <h2 className="mb-4">
        <div className="flex flex-wrap items-center gap-3
                        text-2xl sm:text-3xl md:text-4xl font-bold ">
          {title}
        </div>
      </h2>

      <div className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
        {children}
      </div>

      <div className={`${!isLast && "border-t border-zinc-800 my-4"}`} />
    </section>
  );
};

export default DocSection;


