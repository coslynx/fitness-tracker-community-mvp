"use client";

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import GoalItem from '@/components/GoalItem';
import ProgressChart from '@/components/ProgressChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Dashboard',
  description: 'Track your fitness progress and stay motivated with our goal tracker.',
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUser, getGoals, addGoal } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userData = await getUser();
      setUser(userData);
      const goalsData = await getGoals(userData.id);
      setGoals(goalsData);
      setLoading(false);
    };

    fetchData();
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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 font-medium">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Current Weight</h2>
            <p className="text-lg font-medium">{user.weight} kg</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Total Calories Burned</h2>
            <p className="text-lg font-medium">{user.caloriesBurned} kcal</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Active Days</h2>
            <p className="text-lg font-medium">{user.activeDays} days</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Your Goals</h2>
          <ul className="space-y-4">
            {goals.length > 0 ? (
              goals.map((goal) => <GoalItem key={goal.id} goal={goal} />)
            ) : (
              <p className="text-gray-600 font-medium">No goals yet. Create your first goal!</p>
            )}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Progress</h2>
          <ProgressChart progressData={goals} />
        </div>
      </main>
      <Footer />
    </div>
  );
}