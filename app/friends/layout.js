"use client";

import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Friends',
  description: 'Connect with friends and share your fitness journey.',
};

export default function FriendsLayout({ children }: { children: React.ReactNode }) {
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