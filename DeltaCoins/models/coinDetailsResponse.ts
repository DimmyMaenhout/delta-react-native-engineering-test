import { Coin } from "./coin";
import { Meta } from "./meta";

export interface CoinDetailResponse {
  meta: Meta;
  data: Coin;
}
