"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Fitness Goal Tracker
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-blue-500">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/goals" className="hover:text-blue-500">
              Goals
            </Link>
          </li>
          <li>
            <Link href="/workouts" className="hover:text-blue-500">
              Workouts
            </Link>
          </li>
          <li>
            <Link href="/friends" className="hover:text-blue-500">
              Friends
            </Link>
          </li>
          {session ? (
            <li>
              <Link href="/profile" className="hover:text-blue-500">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button className="btn btn-secondary" onClick={() => session.user.logout()}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}