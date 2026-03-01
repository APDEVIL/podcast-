"use client";

import React from "react";
import { api } from "@/trpc/react";
import { BookingCard } from "../_components/BookingCard";
import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const { data: bookings = [], isLoading, error } = api.booking.myBookings.useQuery();

  if (isLoading) return <p className="text-gray-500">Loading your bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: Booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              listingTitle={booking.listing.title} // nested listing
              status={booking.status}
              price={Number(booking.listing.price)}
              onCancel={(id) => console.log("Cancel booking", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}