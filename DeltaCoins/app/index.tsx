import CoinCard from "@/components/coinCard";
import ErrorView from "@/components/errorView";
import LoadingView from "@/components/loadingView";
import { useGetInfiniteCoins } from "@/hooks/useGetInfiniteCoins";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList, Text } from "react-native";

export default function Index() {
  const navigation = useNavigation();

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteCoins();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Coins",
    });
  }, []);

  function onRetry() {
    refetch();
  }

  if (isPending && isFetchingNextPage) {
    return <LoadingView />;
  }

  if (error) {
    return (
      <ErrorView
        message="Something went wrong while fetching coins, please try again later."
        pressed={onRetry}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CoinCard {...item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        hasNextPage && !isFetchingNextPage && fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return <Text>Fetching more coins...</Text>;
        }
      }}
    />
  );
}
