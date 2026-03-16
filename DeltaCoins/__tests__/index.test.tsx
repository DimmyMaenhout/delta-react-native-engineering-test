import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Index from "@/app/index";
import { useGetInfiniteCoins } from "@/hooks/useGetInfiniteCoins";

jest.mock("@/hooks/useGetInfiniteCoins");

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
    push: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
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

jest.mock("@/components/coinCard", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");

  return {
    __esModule: true,
    default: ({ name, priceInUSD, id }: any) => (
      <Pressable testID={`coin-card-${id}`} onPress={() => {}}>
        <Text>{name}</Text>
        <Text>{priceInUSD}</Text>
      </Pressable>
    ),
  };
});

describe("<Index />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders LoadingView when coins are loading", () => {
    (useGetInfiniteCoins as jest.Mock).mockReturnValue({
      data: [],
      isPending: true,
      error: null,
      fetchNextPage: jest.fn(),
      refetch: jest.fn(),
      isFetchingNextPage: true,
      hasNextPage: true,
    });

    const { getByTestId } = render(<Index />);
    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("renders ErrorView when there is an error and calls refetch on retry", () => {
    const refetchMock = jest.fn();

    (useGetInfiniteCoins as jest.Mock).mockReturnValue({
      data: [],
      isPending: false,
      error: new Error("Test error"),
      fetchNextPage: jest.fn(),
      refetch: refetchMock,
      isFetchingNextPage: false,
      hasNextPage: false,
    });

    const { getByText } = render(<Index />);
    const errorMessage = getByText(
      /Something went wrong while fetching coins/i,
    );
    expect(errorMessage).toBeTruthy();

    fireEvent.press(errorMessage);
    expect(refetchMock).toHaveBeenCalled();
  });

  it("renders list of coins", () => {
    const mockData = [
      { id: "1", name: "Bitcoin" },
      { id: "2", name: "Ethereum" },
    ];
    const fetchNextPageMock = jest.fn();

    (useGetInfiniteCoins as jest.Mock).mockReturnValue({
      data: mockData,
      isPending: false,
      error: null,
      fetchNextPage: fetchNextPageMock,
      refetch: jest.fn(),
      isFetchingNextPage: false,
      hasNextPage: true,
    });

    const { getByTestId } = render(<Index />);

    expect(getByTestId("coin-card-1")).toBeTruthy();
    expect(getByTestId("coin-card-2")).toBeTruthy();
  });
});
