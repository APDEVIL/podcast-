import type { Listing } from "./listing";

export interface Booking {
  id: string;
  userId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: Date;
  updatedAt?: Date;          // ✅ OPTIONAL

  listing: Listing;
}