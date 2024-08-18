"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
      <div className="container flex flex-col items-center">
        <p className="text-sm font-medium">&copy; 2023 Fitness Goal Tracker</p>
        <Link href="/privacy" className="text-sm hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}