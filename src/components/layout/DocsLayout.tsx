"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black border-b border-zinc-800 md:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex items-center gap-2"
          >
            {isMenuOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            <span className="tracking-wide">Menu</span>
          </button>
        </div>

        {/* MOBILE FULL-SCREEN MENU */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-out
            ${isMenuOpen ? "max-h-[calc(100vh-56px)] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="h-[calc(100vh-56px)] overflow-y-auto">
            <LeftSidebar />
          </div>
        </div>
      </header>

      {/* DESKTOP LAYOUT */}
      <div className="flex flex-1 h-[calc(100vh-56px)] md:h-screen">
        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block w-72 border-r border-zinc-800 flex-shrink-0 h-screen fixed top-14 left-0">
          <div className="h-full overflow-y-auto">
            <LeftSidebar />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 overflow-y-auto
                 md:ml-72 xl:mr-56">
          {children}
        </main>



        {/* RIGHT SIDEBAR */}
        {/* RIGHT SIDEBAR */}
<aside className="hidden xl:block w-56 border-l border-zinc-800 fixed top-14 right-0 h-[calc(100vh-56px)]">
  <div className="h-full overflow-y-auto">
    <RightSidebar />
  </div>
</aside>
      </div>
    </div>
  );
};

export default DocsLayout;
