import type { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <div className="flex h-screen bg-black text-white justify-center">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto px-14 py-10 max-w-4xl sidebar-scroll">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
};

export default DocsLayout;
