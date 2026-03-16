import { Coin } from "@/models/coin";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

type CoinCardProps = Pick<Coin, "name" | "priceInUSD" | "id">;

export default function CoinCard({ name, priceInUSD, id }: CoinCardProps) {
  const router = useRouter();

  function handleOnPress() {
    // TODO: implement!!!
  }

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={handleOnPress}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `https://delta.app/images/${id}/icon-64.png` }}
        />
        <View style={styles.textContainer}>
          <Text>{name}</Text>
          <Text>price in USD: {priceInUSD}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
