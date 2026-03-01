"use client";

import React from "react";

interface NotificationItemProps {
  id: string;
  message: string;
  isRead: boolean;
  updatedAt?: Date; // ✅ added updatedAt
  onClick?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  message,
  isRead,
  updatedAt,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick?.(id)}
      className={`
        cursor-pointer
        p-3
        rounded-md
        border
        border-gray-200 dark:border-gray-700
        mb-2
        ${isRead ? "bg-gray-50 dark:bg-gray-700" : "bg-blue-50 dark:bg-blue-800"}
        hover:bg-blue-100 dark:hover:bg-blue-900
        transition
      `}
    >
      <p
        className={`text-sm ${
          isRead ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
        }`}
      >
        {message}
      </p>
      {updatedAt && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(updatedAt).toLocaleString()} {/* optional formatting */}
        </p>
      )}
    </div>
  );
};