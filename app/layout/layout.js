"use client";

import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Dashboard',
  description: 'Track your fitness progress and stay motivated with our goal tracker.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <Navbar />
        <main className="container py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}