import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { docsConfig, versions } from "../../data/docsConfig";

const LeftSidebar = () => {
  const [openSections, setOpenSections] = useState<string[]>([
    "API Reference", // open by default (nice UX)
  ]);

  const toggle = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  return (
    <aside className="w-72 border-r border-zinc-800 flex flex-col h-screen bg-black">
      {/* 🔒 Fixed Top */}
      <div className="px-4 pt-6">
        <SidebarTop />
      </div>

      <div className="border-t border-zinc-800 my-2" />

      {/* 🧠 Scrollable Nav */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 sidebar-scroll">

        {docsConfig.map((section) => {
          const isCollapsible = section.collapsible !== false;
          const isOpen =
            !isCollapsible || openSections.includes(section.title);

          return (
            <div key={section.title} className="mb-6">
              {/* Section Header */}
              <button
                onClick={() =>
                  isCollapsible && toggle(section.title)
                }
                className="flex w-full items-center justify-between text-left"
              >
                <p className="text-sm font-medium text-white">
                  {section.title}
                </p>

                {isCollapsible && (
                  <ChevronDown
                    size={16}
                    className={`text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>

              {/* Items */}
              {isOpen && (//
                <ul className={`mt-3 space-y-2  border-zinc-800 ${isCollapsible ? "border-l pl-3" : ""}`}>
                  {section.items.map((item) => (
                    <li key={item.id}>
                      {!item.children ? (
                        <a
                          href={`#${item.id}`}
                          className="block text-sm text-zinc-400 hover:text-blue-400"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <>
                          <p className="text-sm text-zinc-300">
                            {item.label}
                          </p>
                          <ul className="mt-2 space-y-1 pl-3">
                            {item.children.map((child) => (
                              <li key={child.id}>
                                <a
                                  href={`#${child.id}`}
                                  className="block text-sm text-zinc-500 hover:text-blue-400"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default LeftSidebar;

const SidebarTop = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-1 pb-1 relative" ref={dropdownRef}>

      <button
        onClick={() => setOpen2((v) => !v)}
        className="
    w-full flex items-center justify-between
    rounded-lg
    px-2 py-2
    hover:bg-zinc-900
    transition-colors
  "
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
            ⬢
          </div>

          <div className="text-left leading-tight">
            <p className="text-sm font-medium text-white">
              Using App Router
            </p>
            <p className="text-xs text-zinc-500">
              Features available in /app
            </p>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-zinc-500 transition-transform ${open2 ? "rotate-180" : ""
            }`}
        />
      </button>


      {/* Dropdown */}
      <div
        className={`
          absolute z-50 mt-2 w-full rounded-xl
          bg-zinc-900/95 backdrop-blur
          border border-zinc-800 shadow-2xl
          transition-all duration-200 ease-out
          origin-top
          ${open2
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {versions.map((v, i) => (
          <button
            key={v.label}
            className={`
              w-full flex items-center justify-between px-3 py-2
              text-left transition
              hover:bg-zinc-800
              ${i === 0 ? "rounded-t-xl" : ""}
              ${i === versions.length - 1 ? "rounded-b-xl" : ""}
              ${v.active ? "bg-zinc-800/50" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400">
                ⌁
              </div>
              <div>
                <p className="text-sm text-white">{v.label}</p>
                <p className="text-xs text-zinc-500">{v.version}</p>
              </div>
            </div>

            {v.active && (
              <Check size={16} className="text-emerald-400" />
            )}
          </button>
        ))}
      </div>


      {/* Version selector */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
    w-full flex items-center justify-between
    rounded-lg
    px-2 py-2
    hover:bg-zinc-900
    transition-colors
  "
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
            ⌁
          </div>

          <div className="text-left leading-tight">
            <p className="text-sm font-medium text-white">
              Latest Version
            </p>
            <p className="text-xs text-zinc-500">
              16.1.4
            </p>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-zinc-500 transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>


      {/* Dropdown */}
      <div
        className={`
          absolute z-50 mt-2 w-full rounded-xl
          bg-zinc-900/95 backdrop-blur
          border border-zinc-800 shadow-2xl
          transition-all duration-200 ease-out
          origin-top
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {versions.map((v, i) => (
          <button
            key={v.label}
            className={`
              w-full flex items-center justify-between px-3 py-2
              text-left transition
              hover:bg-zinc-800
              ${i === 0 ? "rounded-t-xl" : ""}
              ${i === versions.length - 1 ? "rounded-b-xl" : ""}
              ${v.active ? "bg-zinc-800/50" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400">
                ⌁
              </div>
              <div>
                <p className="text-sm text-white">{v.label}</p>
                <p className="text-xs text-zinc-500">{v.version}</p>
              </div>
            </div>

            {v.active && (
              <Check size={16} className="text-emerald-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
