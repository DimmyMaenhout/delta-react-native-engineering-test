import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ErrorViewProps {
  message: string;
  pressed: () => void;
}

export default function ErrorView({ message, pressed }: ErrorViewProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.message}>{message}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={pressed}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
