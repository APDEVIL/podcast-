"use client";

import React from "react";
import { api } from "@/trpc/react";
import { ListingCard } from "../_components/ListingCard";
import type { Listing } from "@/types/listing";

export default function ListingsPage() {
  const { data: listings = [], isLoading, error } = api.listing.getAll.useQuery(); // default []

  if (isLoading) return <p className="text-gray-500">Loading listings...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        All Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-gray-500">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              category={listing.category}
              price={Number(listing.price)}
              image={
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"
              }
              onBook={(id) => console.log("Book listing", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}