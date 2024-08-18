"use client";

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import FriendItem from '@/components/FriendItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Friends',
  description: 'Connect with friends and share your fitness journey.',
};

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getFriends, addFriend, deleteFriend } = useStore();

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      const friendsData = await getFriends();
      setFriends(friendsData);
      setLoading(false);
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Friends</h2>
          {/* Add Friend Form (Implement later) */}
        </div>

        <ul className="space-y-4">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <FriendItem
                key={friend.id}
                friend={friend}
                onDeleteFriend={deleteFriend}
              />
            ))
          ) : (
            <p className="text-gray-600 font-medium">No friends yet. Add some friends!</p>
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
}