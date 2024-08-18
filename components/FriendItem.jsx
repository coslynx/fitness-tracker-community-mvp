"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { FaUserCircle } from "react-icons/fa";

export default function FriendItem({ friend, onDeleteFriend }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { connectFriend, disconnectFriend } = useStore();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectFriend(friend.id);
    } catch (error) {
      // Handle errors
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    try {
      await disconnectFriend(friend.id);
    } catch (error) {
      // Handle errors
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <FaUserCircle className="text-gray-400 text-xl mr-4" />
        <div>
          <h3 className="text-lg font-medium">{friend.name}</h3>
          <p className="text-gray-600 text-sm">{friend.email}</p>
        </div>
      </div>
      <div>
        {friend.isFriend ? (
          <button
            onClick={handleDisconnect}
            disabled={isConnecting}
            className="btn btn-secondary"
          >
            {isConnecting ? "Disconnecting..." : "Disconnect"}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="btn btn-primary"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
        )}
        {onDeleteFriend && (
          <button
            onClick={() => onDeleteFriend(friend.id)}
            className="btn btn-danger ml-2"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}