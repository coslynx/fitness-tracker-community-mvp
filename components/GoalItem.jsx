"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function GoalItem({ goal, onDeleteGoal, onUpdateGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });
  const { updateGoal: updateGoalInStore } = useStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGoal({ ...goal });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateGoalInStore(editedGoal.id, editedGoal);
      onUpdateGoal(editedGoal);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteGoal(goal.id);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={editedGoal.name}
            onChange={(e) =>
              setEditedGoal({ ...editedGoal, name: e.target.value })
            }
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full mr-4"
          />
          <input
            type="date"
            value={editedGoal.targetDate}
            onChange={(e) =>
              setEditedGoal({ ...editedGoal, targetDate: e.target.value })
            }
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mr-4"
          />
          <button type="submit" className="btn btn-primary ml-2">
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
          <div>
            <p className="text-lg font-medium">{goal.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Target Date: {goal.targetDate.slice(0, 10)}</p>
          </div>
        </div>
      )}
      <div>
        <button onClick={handleEdit} className="btn btn-secondary mr-2">
          <FaEdit />
        </button>
        {onDeleteGoal && (
          <button onClick={handleDelete} className="btn btn-danger">
            <FaTrashAlt />
          </button>
        )}
      </div>
    </li>
  );
}