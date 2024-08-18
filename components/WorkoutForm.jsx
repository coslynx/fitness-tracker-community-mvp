"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { FaCalendarAlt, FaUserClock } from "react-icons/fa";

export default function WorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("Cardio");
  const { addWorkout: addWorkoutToStore } = useStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addWorkoutToStore({ date, duration: parseInt(duration, 10), type });
      onAddWorkout({ date, duration: parseInt(duration, 10), type });
      setDate("");
      setDuration("");
      setType("Cardio");
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="flex items-center mr-4">
        <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center mr-4">
        <FaUserClock className="text-gray-400 text-xl mr-2" />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Flexibility">Flexibility</option>
      </select>
      <button type="submit" className="btn btn-primary ml-2">
        Log Workout
      </button>
    </form>
  );
}