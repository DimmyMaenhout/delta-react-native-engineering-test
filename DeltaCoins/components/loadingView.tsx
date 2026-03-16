import React from "react";
import { Text } from "react-native";

interface LoadingViewProps {
  message: string;
}

function LoadingView({ message }: LoadingViewProps) {
  return <Text>Fetching coin details...</Text>;
}

export default LoadingView;
