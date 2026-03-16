import { fetchCoins } from "@/api/delta/coins";
import { CoinResponse } from "@/models/coinResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetInfiniteCoins = (pageSize = 25) => {
  return useInfiniteQuery<CoinResponse, unknown, CoinResponse["data"]>({
    queryKey: ["coins"],

    queryFn: ({ pageParam = 1 }) => fetchCoins(pageParam as number, pageSize),

    initialPageParam: 1,

    getNextPageParam: (coinsResponse, allPages) => {
      const totalCoins = coinsResponse.meta.totalCoinCount ?? 0;
      const fetchedSoFar = allPages.length * pageSize;

      if (fetchedSoFar >= totalCoins) return undefined;

      return (allPages.length ?? 0) + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};
