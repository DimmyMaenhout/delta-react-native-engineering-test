import { fetchCoinDetails } from "@/api/delta/coins";
import ErrorView from "@/components/errorView";
import LoadingView from "@/components/loadingView";
import RowComponent from "@/components/rowComponent";

import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export const options = {
  title: "Coin Details",
};

export default function CoinDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinDetails(id),
  });

  console.log("data: ", data);

  const {
    name,
    dirtyCode,
    priceInUSD,
    availableSupply,
    volume24hInUSD,
    marketCapInUSD,
  } = data?.data;

  function onRetry() {
    refetch();
  }

  return (
    <View style={styles.root}>
      <Stack.Screen
        options={{
          title: dirtyCode ? dirtyCode : isPending ? "Loading..." : "Error",
        }}
      />

      {isPending && <LoadingView message="Fetching coin details..." />}

      {error && <ErrorView message="" pressed={onRetry} />}

      {data && !error && (
        <View>
          <RowComponent title={`${name}`} value={`$${priceInUSD}`} />

          <RowComponent title="Available" value={availableSupply} />

          <RowComponent title="24h volume ($)" value={volume24hInUSD} />

          <RowComponent title="market cap ($)" value={marketCapInUSD} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
