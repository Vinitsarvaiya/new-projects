// src/components/Layout.tsx
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Navbar />
      <main className="p-6">{children}</main>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f9fafb",
          },
        }}
      />
    </div>
  );
};

export default Layout;
