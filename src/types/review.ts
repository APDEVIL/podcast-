export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: { name: string } | null; // add user object if you want reviewer name
}
