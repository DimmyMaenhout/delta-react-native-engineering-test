import { StyleSheet, Text, View } from "react-native";

interface RowComponentProps {
  title: string;
  value: string | number;
}
export default function RowComponent({ title, value }: RowComponentProps) {
  return (
    <View style={styles.rowContainer}>
      <Text>{title}:</Text>
      <Text>{value.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
