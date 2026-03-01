import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useListing = () => {
  const queryClient = useQueryClient();

  // ===============================
  // GET ALL ACTIVE LISTINGS
  // ===============================
  const getAll = useQuery({
    queryKey: ["listings"],
    queryFn: () => api.listing.getAll.query(),
  });

  // ===============================
  // CREATE LISTING
  // ===============================
  const create = useMutation({
    mutationFn: (data: Parameters<typeof api.listing.create.mutate>[0]) =>
      api.listing.create.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listings"] }),
  });

  // ===============================
  // UPDATE LISTING
  // ===============================
  const update = useMutation({
    mutationFn: (data: Parameters<typeof api.listing.update.mutate>[0]) =>
      api.listing.update.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listings"] }),
  });

  // ===============================
  // DELETE LISTING
  // ===============================
  const remove = useMutation({
    mutationFn: (data: Parameters<typeof api.listing.delete.mutate>[0]) =>
      api.listing.delete.mutate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listings"] }),
  });

  return {
    getAll,
    create,
    update,
    remove,
  };
};