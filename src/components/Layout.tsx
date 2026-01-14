// src/components/Layout.tsx
import Navbar from "./Navbar";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
