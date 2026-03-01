import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  // GET ALL USER NOTIFICATIONS
  const getAll = useQuery({
    queryKey: ["notification"],
    queryFn: () => api.notification.getMyNotifications.query(),
  });

  // MARK SINGLE NOTIFICATION AS READ
  const markAsRead = useMutation({
    mutationFn: (data: Parameters<typeof api.notification.markAsRead.mutate>[0]) =>
      api.notification.markAsRead.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notification"] }),
  });

  // MARK ALL NOTIFICATIONS AS READ
  const markAllAsRead = useMutation({
    mutationFn: () => api.notification.markAllAsRead.mutate(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notification"] }),
  });

  return {
    getAll,
    markAsRead,
    markAllAsRead,
  };
};