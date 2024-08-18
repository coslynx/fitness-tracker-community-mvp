"use client";

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import GoalForm from '@/components/GoalForm';
import GoalItem from '@/components/GoalItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Goals',
  description: 'Set and track your fitness goals with our interactive goal tracker.',
};

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getGoals, addGoal, deleteGoal, updateGoal } = useStore();

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      const goalsData = await getGoals();
      setGoals(goalsData);
      setLoading(false);
    };

    fetchGoals();
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
          <h2 className="text-3xl font-bold mb-4">Your Goals</h2>
          <GoalForm onAddGoal={addGoal} />
        </div>

        <ul className="space-y-4">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onDeleteGoal={deleteGoal}
                onUpdateGoal={updateGoal}
              />
            ))
          ) : (
            <p className="text-gray-600 font-medium">No goals yet. Create your first goal!</p>
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
}