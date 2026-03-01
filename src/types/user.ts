export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment?: string; // optional, since it can be null
  user?: { name?: string }; // optional, for displaying reviewer name if joined
  createdAt: Date;
  updatedAt: Date;
}
