import axios, { AxiosRequestConfig } from "axios";

export const deltaClient = axios.create({
  baseURL: "https://api.getdelta.io/web/",
});

export async function fetchFromDelta<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await deltaClient.get(endpoint, config);
  return response.data;
}
