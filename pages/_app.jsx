"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define a Zustand store to manage global state
const useStore = create(
  persist(
    (set) => ({
      user: null,
      goals: [],
      workouts: [],
      friends: [],
      loading: true,

      getUser: async () => {
        try {
          const response = await fetch("/api/users");
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          set({ user: data });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ loading: false });
        }
      },
      getGoals: async () => {
        try {
          const response = await fetch("/api/goals");
          if (!response.ok) {
            throw new Error("Failed to fetch goals data");
          }
          const data = await response.json();
          set({ goals: data });
        } catch (error) {
          console.error("Error fetching goals data:", error);
        }
      },
      addGoal: async (goal) => {
        try {
          const response = await fetch("/api/goals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(goal),
          });
          if (!response.ok) {
            throw new Error("Failed to add goal");
          }
          const data = await response.json();
          set((state) => ({ goals: [...state.goals, data] }));
        } catch (error) {
          console.error("Error adding goal:", error);
        }
      },
      deleteGoal: async (id) => {
        try {
          const response = await fetch(`/api/goals/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete goal");
          }
          set((state) => ({
            goals: state.goals.filter((goal) => goal.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting goal:", error);
        }
      },
      updateGoal: async (id, updatedGoal) => {
        try {
          const response = await fetch(`/api/goals/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal),
          });
          if (!response.ok) {
            throw new Error("Failed to update goal");
          }
          set((state) => ({
            goals: state.goals.map((goal) =>
              goal.id === id ? updatedGoal : goal
            ),
          }));
        } catch (error) {
          console.error("Error updating goal:", error);
        }
      },
      getWorkouts: async () => {
        try {
          const response = await fetch("/api/workouts");
          if (!response.ok) {
            throw new Error("Failed to fetch workouts data");
          }
          const data = await response.json();
          set({ workouts: data });
        } catch (error) {
          console.error("Error fetching workouts data:", error);
        }
      },
      addWorkout: async (workout) => {
        try {
          const response = await fetch("/api/workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout),
          });
          if (!response.ok) {
            throw new Error("Failed to add workout");
          }
          const data = await response.json();
          set((state) => ({ workouts: [...state.workouts, data] }));
        } catch (error) {
          console.error("Error adding workout:", error);
        }
      },
      deleteWorkout: async (id) => {
        try {
          const response = await fetch(`/api/workouts/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete workout");
          }
          set((state) => ({
            workouts: state.workouts.filter((workout) => workout.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting workout:", error);
        }
      },
      updateWorkout: async (id, updatedWorkout) => {
        try {
          const response = await fetch(`/api/workouts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedWorkout),
          });
          if (!response.ok) {
            throw new Error("Failed to update workout");
          }
          set((state) => ({
            workouts: state.workouts.map((workout) =>
              workout.id === id ? updatedWorkout : workout
            ),
          }));
        } catch (error) {
          console.error("Error updating workout:", error);
        }
      },
      getFriends: async () => {
        try {
          const response = await fetch("/api/friends");
          if (!response.ok) {
            throw new Error("Failed to fetch friends data");
          }
          const data = await response.json();
          set({ friends: data });
        } catch (error) {
          console.error("Error fetching friends data:", error);
        }
      },
      addFriend: async (id) => {
        try {
          const response = await fetch("/api/friends", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to add friend");
          }
          const data = await response.json();
          set((state) => ({ friends: [...state.friends, data] }));
        } catch (error) {
          console.error("Error adding friend:", error);
        }
      },
      deleteFriend: async (id) => {
        try {
          const response = await fetch(`/api/friends/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete friend");
          }
          set((state) => ({
            friends: state.friends.filter((friend) => friend.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting friend:", error);
        }
      },
      connectFriend: async (id) => {
        try {
          const response = await fetch(`/api/friends/${id}/connect`, {
            method: "PUT",
          });
          if (!response.ok) {
            throw new Error("Failed to connect friend");
          }
          set((state) => ({
            friends: state.friends.map((friend) =>
              friend.id === id ? { ...friend, isFriend: true } : friend
            ),
          }));
        } catch (error) {
          console.error("Error connecting friend:", error);
        }
      },
      disconnectFriend: async (id) => {
        try {
          const response = await fetch(`/api/friends/${id}/disconnect`, {
            method: "PUT",
          });
          if (!response.ok) {
            throw new Error("Failed to disconnect friend");
          }
          set((state) => ({
            friends: state.friends.map((friend) =>
              friend.id === id ? { ...friend, isFriend: false } : friend
            ),
          }));
        } catch (error) {
          console.error("Error disconnecting friend:", error);
        }
      },
    }),
    {
      name: "fitness-tracker-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(true);

  useStore((state) => state.getUser());

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Loading spinner or placeholder */}
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
        <useStore.Provider>
          <Component {...pageProps} />
        </useStore.Provider>
      </div>
    </SessionProvider>
  );
}