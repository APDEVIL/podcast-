"use client";

import React from "react";

interface ReviewCardProps {
  id: string;
  reviewerName?: string;
  rating: number; // 1-5
  comment?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  reviewerName,
  rating,
  comment,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {reviewerName ?? "Anonymous"}
        </h4>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}>
              ★
            </span>
          ))}
        </div>
      </div>
      {comment && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {comment}
        </p>
      )}
    </div>
  );
};
