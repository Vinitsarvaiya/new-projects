import { useEffect } from "react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SEARCH_ITEMS = [
  "Introduction",
  "Getting Started",
  "App Router",
  "Architecture",
  "Pages Router",
  "API Reference",
  "Accessibility",
];

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className={`
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-3 sm:p-6
        bg-black/40
        transition-all duration-200 ease-out
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-xl sm:max-w-2xl
          rounded-xl border border-zinc-800
          bg-[#0a0a0a] shadow-2xl
          transform transition-all duration-200 ease-out
          ${open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-2 opacity-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded shrink-0">
            App
          </span>

          <span className="hidden sm:inline text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
            Pages
          </span>

          <input
            autoFocus={open}
            placeholder="What are you searching for?"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
          />

          <kbd className="hidden sm:inline text-xs text-zinc-400 border border-zinc-700 px-2 py-1 rounded">
            Esc
          </kbd>
        </div>

        {/* RESULTS */}
        <ul className="max-h-[60vh] sm:max-h-72 overflow-y-auto p-2">
          {SEARCH_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 px-3 py-3 sm:py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              📄 {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
