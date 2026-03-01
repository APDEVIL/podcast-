"use client";

import React from "react";

interface ListingCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  image?: string;
  onBook?: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  category,
  price,
  image,
  onBook,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {category}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={() => onBook?.(id)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
