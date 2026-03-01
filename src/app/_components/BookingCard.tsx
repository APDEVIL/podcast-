// src/app/_components/BookingCard.tsx
import React from "react";

interface BookingCardProps {
  id: string;                  // add this
  listingTitle: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  price: number;
  onCancel: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  id,
  listingTitle,
  status,
  price,
  onCancel,
}) => {
  return (
    <div className="border p-4 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{listingTitle}</h3>
        <p>Status: {status}</p>
        <p>Price: ${price}</p>
      </div>
      <button
        onClick={() => onCancel(id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  );
};
