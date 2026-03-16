import { Coin } from "./coin";
import { Meta } from "./meta";

export interface CoinResponse {
  meta: Meta;
  data: Coin[];
}
