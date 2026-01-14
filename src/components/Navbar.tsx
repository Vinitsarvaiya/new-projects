// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex gap-4">
      <Link className="text-teal-400 hover:underline" to="/nextjs">Next.js</Link>
      <Link className="text-teal-400 hover:underline" to="/reactjs">React.js</Link>
      <Link className="text-teal-400 hover:underline" to="/backend">Backend</Link>
      <Link className="text-teal-400 hover:underline" to="/tailwind">Tailwind/Vite</Link>
    </nav>
  );
};

export default Navbar;
