"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

const RightSidebar = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  // 1️⃣ Collect headings AFTER render
  useEffect(() => {
    const collectHeadings = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("h3[id^='section-']")
      );

      setHeadings(
        nodes.map((el) => ({
          id: el.id,
          text: el.textContent?.trim() || "",
        }))
      );
    };

    collectHeadings();

    // 2️⃣ Watch for DOM changes (docs change / slug change)
    const observer = new MutationObserver(collectHeadings);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // 3️⃣ Scroll spy
  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <div className="px-4 py-6 text-sm">
      <h4 className="text-zinc-400 mb-4">On this page</h4>

      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition-colors ${
                activeId === h.id
                  ? "text-blue-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
