import CoinCard from "@/components/coinCard";
import { useGetInfiniteCoins } from "@/hooks/useGetInfiniteCoins";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteCoins();

  console.log("data: ", data);

  function onRetry() {
    refetch();
  }

  if (isPending) {
    return (
      <View style={styles.root}>
        <Text>Fetching coins...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <Text style={styles.message}>
          Something went wrong while fetching coins, please try again later.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
