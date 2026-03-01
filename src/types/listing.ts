export interface Listing {
  id: string;
  hostId: string;
  title: string;
  description: string;
  category: string;
  price: string;
  isActive: boolean;

  image?: string | null;     // optional
  createdAt: Date;
  updatedAt?: Date;          // ✅ OPTIONAL
}