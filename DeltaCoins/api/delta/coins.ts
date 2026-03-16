import { CoinResponse } from "@/models/coinResponse";
import { fetchFromDelta } from "../axiosClient";

const coinsEndpoint = "coins";

export const fetchCoins = (page: number = 1, size = 25) =>
  fetchFromDelta<CoinResponse>(`${coinsEndpoint}`, {
    params: {
      "page[number]": page,
      "page[size]": size,
    },
  });
