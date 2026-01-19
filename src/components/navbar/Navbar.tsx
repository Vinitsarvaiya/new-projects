import { useEffect, useState } from "react";
import SearchModal from "../search/SearchModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl + K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <div className="w-4 h-4 bg-white rotate-45" />
            <span className="font-medium">/</span>
            <span className="tracking-wide">NEW.JS</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a className="text-blue-400 font-medium" href="#">Docs</a>
            <a className="hover:text-white" href="#">Client</a>
            <a className="hover:text-white" href="#">Server</a>
            <a className="hover:text-white" href="#">Styling</a>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 hover:border-zinc-700" onClick={() => setSearchOpen(true)}>
            <span>Search documentation…</span>
            <kbd className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">
              Ctrl K
            </kbd>
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0a0a0a]">
          <nav className="px-6 py-4 flex flex-col gap-4 text-sm text-zinc-300">
            <a className="text-blue-400 font-medium" href="#">Docs</a>
            <a className="hover:text-white" href="#">Client</a>
            <a className="hover:text-white" href="#">Server</a>
            <a className="hover:text-white" href="#">Styling</a>

            <button className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400" onClick={() => setSearchOpen(true)}>
              <span>Search documentation…</span>
              <span className="text-xs">Ctrl K</span>
            </button>
          </nav>
        </div>
      )}
    </header>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
