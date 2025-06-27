import React from 'react';
import { Link, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex space-x-4">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition-colors"
          >
            홈
          </Link>
          <Link
            to="/about"
            className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition-colors"
          >
            소개
          </Link>
          <Link
            to="/contact"
            className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition-colors"
          >
            연락처
          </Link>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
