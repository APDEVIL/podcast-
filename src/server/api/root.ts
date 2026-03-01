import { createTRPCRouter } from "@/server/api/trpc";

import { userRouter } from "@/server/api/routers/user";
import { listingRouter } from "@/server/api/routers/listing";
import { bookingRouter } from "@/server/api/routers/booking";
import { reviewRouter } from "@/server/api/routers/review";
import { notificationRouter } from "@/server/api/routers/notification";
import { adminRouter } from "@/server/api/routers/admin";

export const appRouter = createTRPCRouter({
  user: userRouter,
  listing: listingRouter,
  booking: bookingRouter,
  review: reviewRouter,
  notification: notificationRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
