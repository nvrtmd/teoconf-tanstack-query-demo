import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import { trpc } from "./trpc";

export function useSuspenseGetUserList(
  args: Parameters<typeof trpc.user.list.useSuspenseQuery>[0]
) {
  return trpc.user.list.useSuspenseQuery(args, {});
}

export function useSuspenseGetUser(
  args: Parameters<typeof trpc.user.detail.useSuspenseQuery>[0]
) {
  return trpc.user.detail.useSuspenseQuery(args, {});
}

// 첫 번째 시도: gcTime을 0으로 설정
// export function useSuspenseGetUser(
//   args: Parameters<typeof trpc.user.detail.useSuspenseQuery>[0]
// ) {
//   return trpc.user.detail.useSuspenseQuery(args, { gcTime: 0 });
// }

export function useUpdateUserBefore() {
  const queryClient = useQueryClient();
  const detailKey = getQueryKey(trpc.user.detail);
  return trpc.user.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
}

// 두 번째 시도: resetQueries 사용
// export function useUpdateUserBefore() {
//   const queryClient = useQueryClient();
//   const detailKey = getQueryKey(trpc.user.detail);
//   return trpc.user.update.useMutation({
//     onSuccess: () => {
//       queryClient.resetQueries({ queryKey: detailKey });
//     },
//   });
// }

// 최종 해결 방안: await로 invalidateQueries 완료를 보장
export function useUpdateUserAfter() {
  const queryClient = useQueryClient();
  const detailKey = getQueryKey(trpc.user.detail);
  return trpc.user.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
}
