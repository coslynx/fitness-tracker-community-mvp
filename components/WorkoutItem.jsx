"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { FaCalendarAlt, FaUserClock } from "react-icons/fa";

export default function WorkoutItem({ workout, onDeleteWorkout, onUpdateWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });
  const { updateWorkout: updateWorkoutInStore } = useStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedWorkout({ ...workout });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateWorkoutInStore(editedWorkout.id, editedWorkout);
      onUpdateWorkout(editedWorkout);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteWorkout(workout.id);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
            <input
              type="date"
              value={editedWorkout.date}
              onChange={(e) =>
                setEditedWorkout({ ...editedWorkout, date: e.target.value })
              }
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mr-4">
            <FaUserClock className="text-gray-400 text-xl mr-2" />
            <input
              type="number"
              value={editedWorkout.duration}
              onChange={(e) =>
                setEditedWorkout({
                  ...editedWorkout,
                  duration: parseInt(e.target.value, 10),
                })
              }
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={editedWorkout.type}
            onChange={(e) =>
              setEditedWorkout({ ...editedWorkout, type: e.target.value })
            }
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
          </select>
          <button
            type="submit"
            className="btn btn-primary ml-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
            <span>{workout.date.slice(0, 10)}</span>
          </div>
          <div className="flex items-center mr-4">
            <FaUserClock className="text-gray-400 text-xl mr-2" />
            <span>{workout.duration} minutes</span>
          </div>
          <div>
            <p className="text-lg font-medium">{workout.type}</p>
          </div>
        </div>
      )}
      <div>
        <button
          onClick={handleEdit}
          className="btn btn-secondary"
        >
          Edit
        </button>
        {onDeleteWorkout && (
          <button
            onClick={handleDelete}
            className="btn btn-danger ml-2"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}