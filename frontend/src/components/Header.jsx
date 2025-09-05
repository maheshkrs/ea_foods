import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-green-200 shadow">
      <div className="mx-auto px-5 py-4 flex justify-between items-center gap-12">
        <Link to="/" className="font-bold text-xl">
          EA Foods
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-md text-gray-600 hover:text-gray-900">Products</Link>
          <Link to="/orders" className="text-md text-gray-600 hover:text-gray-900">Orders</Link>
          <Link to="/ops" className="text-md text-gray-600 hover:text-gray-900">Ops dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
