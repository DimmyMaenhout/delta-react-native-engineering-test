import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
