import CoinCard from "@/components/coinCard";
import { useGetInfiniteCoins } from "@/hooks/useGetInfiniteCoins";
import { FlatList, Text } from "react-native";

export default function Index() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteCoins();

  console.log("data: ", data);

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
