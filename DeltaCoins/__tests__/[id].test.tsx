import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CoinDetailsScreen from "@/app/[id]";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query");

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
    push: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
  useLocalSearchParams: () => ({ id: "1" }),
}));

jest.mock("@/components/loadingView", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="loading-view" />,
  };
});

jest.mock("@/components/errorView", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ message, pressed }: any) => (
      <Pressable onPress={pressed}>
        <Text>{message}</Text>
      </Pressable>
    ),
  };
});

jest.mock("@/components/rowComponent", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ title, value }: any) => (
      <View>
        <Text>
          {title}: {value}
        </Text>
      </View>
    ),
  };
});

describe("<CoinDetailsScreen />", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReset();
  });

  it("renders LoadingView when data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      dataUpdatedAt: 0,
      isLoading: true,
      isFetching: false,
      isPending: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<CoinDetailsScreen />);
    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("renders ErrorView when there is an error", () => {
    const refetchMock = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      dataUpdatedAt: 0,
      isLoading: false,
      isFetching: false,
      isPending: false,
      error: new Error("Test error"),
      refetch: refetchMock,
    });

    const { getByText } = render(<CoinDetailsScreen />);
    expect(getByText(/Something went wrong/i)).toBeTruthy();

    fireEvent.press(getByText(/Something went wrong/i));
    expect(refetchMock).toHaveBeenCalled();
  });

  it("renders coin data when available", () => {
    const mockData = {
      data: {
        name: "Bitcoin",
        dirtyCode: "BTC",
        priceInUSD: 12345,
        availableSupply: 1000,
        volume24hInUSD: 50000,
        marketCapInUSD: 1000000,
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      dataUpdatedAt: Date.now(),
      isLoading: false,
      isFetching: false,
      isPending: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = render(<CoinDetailsScreen />);

    expect(getByText(/Bitcoin/)).toBeTruthy();
    expect(getByText(/\$12345/)).toBeTruthy();
    expect(getByText(/Available: 1000/)).toBeTruthy();
    expect(getByText(/24h volume \(\$\): 50000/)).toBeTruthy();
    expect(getByText(/market cap \(\$\): 1000000/)).toBeTruthy();
  });
});
