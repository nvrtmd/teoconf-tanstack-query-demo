import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import { trpc } from "./trpc";

export function useGetUserList(
  args: Parameters<typeof trpc.user.list.useQuery>[0]
) {
  return trpc.user.list.useQuery(args, {});
}

export function useSuspenseGetUserList(
  args: Parameters<typeof trpc.user.list.useSuspenseQuery>[0]
) {
  return trpc.user.list.useSuspenseQuery(args, {});
}

export function useGetUser(
  args: Parameters<typeof trpc.user.detail.useQuery>[0]
) {
  return trpc.user.detail.useQuery(args, {});
}

export function useSuspenseGetUser(
  args: Parameters<typeof trpc.user.detail.useSuspenseQuery>[0]
) {
  return trpc.user.detail.useSuspenseQuery(args, {});
}

export function useUpdateUserBefore() {
  const queryClient = useQueryClient();
  const listKey = getQueryKey(trpc.user.list);
  const detailKey = getQueryKey(trpc.user.detail);
  return trpc.user.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listKey,
      });
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
}

export function useUpdateUserAfter() {
  const queryClient = useQueryClient();
  const listKey = getQueryKey(trpc.user.list);
  const detailKey = getQueryKey(trpc.user.detail);
  return trpc.user.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: listKey,
        refetchType: "all",
      });
      await queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
}
