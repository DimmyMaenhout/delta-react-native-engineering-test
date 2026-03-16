import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ErrorViewProps {
  message: string;
  pressed: () => void;
}

export default function ErrorView({ message, pressed }: ErrorViewProps) {
  return (
    <>
      <Text style={styles.message}>
        Something went wrong while fetching the coin details, please try again
        later.
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={pressed}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
