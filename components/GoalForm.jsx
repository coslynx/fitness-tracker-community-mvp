"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { FaCalendarAlt, FaFlagCheckered } from "react-icons/fa";

export default function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const { addGoal: addGoalToStore } = useStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addGoalToStore({ name, targetDate });
      onAddGoal({ name, targetDate });
      setName("");
      setTargetDate("");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="flex items-center mr-4">
        <FaFlagCheckered className="text-gray-400 text-xl mr-2" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>
      <div className="flex items-center mr-4">
        <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button type="submit" className="btn btn-primary ml-2">
        Create Goal
      </button>
    </form>
  );
}