"use client";

import React from "react";
import { api } from "@/trpc/react";
import { ListingCard } from "./_components/ListingCard";
import { BookingCard } from "./_components/BookingCard";
import { ReviewCard } from "./_components/ReviewCard";
import { NotificationItem } from "./_components/NotificationItem";

import type { Listing } from "@/types/listing";
import type { Booking } from "@/types/booking";
import type { Review } from "@/types/review";
import type { Notification } from "@/types/notification";

export default function HomePage() {
  // tRPC queries
  const { data: listings, refetch: refetchListings } = api.listing.getAll.useQuery();
  const { data: bookings, refetch: refetchBookings } = api.booking.myBookings.useQuery();
  const { data: reviews } = api.review.getAll.useQuery();
  const { data: notifications } = api.notification.getMyNotifications.useQuery();

  // tRPC mutations
  const bookListingMutation = api.booking.create.useMutation({
    onSuccess: () => refetchBookings(),
  });

  const cancelBookingMutation = api.booking.cancel.useMutation({
    onSuccess: () => refetchBookings(),
  });

  // Default podcast image for listings
  const defaultPodcastImage =
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="space-y-10">
      {/* Listings Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Available Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings?.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              category={listing.category}
              price={Number(listing.price)}
              image={listing.image || defaultPodcastImage} // default podcast image
              onBook={() => bookListingMutation.mutate({ listingId: listing.id })}
            />
          ))}
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <div className="space-y-4">
          {bookings
            ?.filter((booking: Booking) => booking.status !== "CANCELLED") // hide cancelled
            .map((booking: Booking) => (
              <BookingCard
                key={booking.id}
                id={booking.id}
                listingTitle={booking.listing.title}
                status={booking.status}
                price={Number(booking.listing.price)}
                onCancel={() => cancelBookingMutation.mutate({ bookingId: booking.id })}
              />
            ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {reviews?.map((review: Review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              reviewerName={review.user?.name}
              rating={review.rating}
              comment={review.comment || undefined}
            />
          ))}
        </div>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="space-y-2">
          {notifications?.map((notif: Notification) => (
            <NotificationItem
              key={notif.id}
              id={notif.id}
              message={notif.message}
              isRead={notif.isRead}
              onClick={(id) => console.log("Notification clicked", id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}