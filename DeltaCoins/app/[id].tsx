import { fetchCoinDetails } from "@/api/delta/coins";
import ErrorView from "@/components/errorView";
import LoadingView from "@/components/loadingView";
import RowComponent from "@/components/rowComponent";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, Stack, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CoinDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data,
    dataUpdatedAt,
    isPending,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinDetails(id),
  });

  const lastUpdatedDate = new Date(dataUpdatedAt);

  const title = data?.data?.dirtyCode ? data.data.dirtyCode : "";

  function onRetry() {
    refetch();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={onRetry}
          style={(pressed) => {
            return pressed ? styles.pressed : null;
          }}
        >
          <Ionicons name="refresh" size={24} color="black" />
        </Pressable>
      ),
      title: title,
    });
  }, []);

  if (isPending && isFetching && isLoading && data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorView
        message="Something went wrong while fetching the coin details, please try again later."
        pressed={onRetry}
      />
    );
  }

  if (!data?.data) {
    return (
      <View style={styles.root}>
        <LoadingView message="Fetching coin details..." />
      </View>
    );
  }

  const { name, priceInUSD, availableSupply, volume24hInUSD, marketCapInUSD } =
    data.data;

  return (
    <View style={styles.root}>
      {data && !isFetching && (
        <View>
          <View style={styles.timeStamp}>
            <Text>Last updated</Text>
            <Text>{lastUpdatedDate.toDateString()}</Text>
          </View>

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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "center",
    margin: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  timeStamp: {
    alignItems: "center",
  },
});
