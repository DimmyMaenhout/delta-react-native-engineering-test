import { CoinResponse } from "@/models/coinResponse";
import { fetchFromDelta } from "../axiosClient";
import { CoinDetailResponse } from "@/models/coinDetailsResponse";

const coinsEndpoint = "coins";

export const fetchCoins = (page: number = 1, size = 25) =>
  fetchFromDelta<CoinResponse>(`${coinsEndpoint}`, {
    params: {
      "page[number]": page,
      "page[size]": size,
    },
  });

export const fetchCoinDetails = (id: string) =>
  fetchFromDelta<CoinDetailResponse>(`${coinsEndpoint}/${id}`);
