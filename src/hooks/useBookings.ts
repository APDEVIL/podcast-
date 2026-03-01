import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useBooking = () => {
  const queryClient = useQueryClient();

  // GET MY BOOKINGS
  const getMyBookings = useQuery({
    queryKey: ["bookings"],
    queryFn: () => api.booking.myBookings.query(),
  });

  // CREATE BOOKING
  const create = useMutation({
    mutationFn: (data: Parameters<typeof api.booking.create.mutate>[0]) =>
      api.booking.create.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  // UPDATE BOOKING STATUS
  const updateStatus = useMutation({
    mutationFn: (data: Parameters<typeof api.booking.updateStatus.mutate>[0]) =>
      api.booking.updateStatus.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  // CANCEL BOOKING
  const cancel = useMutation({
    mutationFn: (data: Parameters<typeof api.booking.cancel.mutate>[0]) =>
      api.booking.cancel.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  return {
    getMyBookings,
    create,
    updateStatus,
    cancel,
  };
};