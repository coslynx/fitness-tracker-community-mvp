"use client";

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutItem from '@/components/WorkoutItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker | Workouts',
  description: 'Log and track your workouts with our intuitive workout tracker.',
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getWorkouts, addWorkout, deleteWorkout, updateWorkout } = useStore();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const workoutsData = await getWorkouts();
      setWorkouts(workoutsData);
      setLoading(false);
    };

    fetchWorkouts();
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
          <h2 className="text-3xl font-bold mb-4">Your Workouts</h2>
          <WorkoutForm onAddWorkout={addWorkout} />
        </div>

        <ul className="space-y-4">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <WorkoutItem
                key={workout.id}
                workout={workout}
                onDeleteWorkout={deleteWorkout}
                onUpdateWorkout={updateWorkout}
              />
            ))
          ) : (
            <p className="text-gray-600 font-medium">No workouts yet. Log your first workout!</p>
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
}