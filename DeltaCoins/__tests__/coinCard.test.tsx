import CoinCard from "@/components/coinCard";
import { render, fireEvent } from "@testing-library/react-native";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    isReady: true,
  }),
}));

describe("<CoinCard />", () => {
  const mockData = {
    id: "V1jxGX",
    code: "btc",
    dirtyCode: "BTC",
    name: "Bitcoin",
    slug: "bitcoin",
    priceInUSD: 73909.2873,
    availableSupply: 0,
    totalSupply: 0,
    marketCapRank: 1,
    volume24hInUSD: 53007283079,
    marketCapInUSD: 1478262247333.291,
    percentChange1h: 0.3889862370639682,
    percentChange24h: 3.2953961264569473,
    percentChange7d: 7.668317146379327,
    showDisclaimer: false,
  };

  it("renders name and price when data is available", () => {
    const { getByText } = render(<CoinCard {...mockData} />);

    expect(getByText(/Bitcoin/)).toBeTruthy();
    expect(getByText(/73909.2873/)).toBeTruthy();
  });

  it("renders image when data is available", () => {
    const { getByTestId } = render(<CoinCard {...mockData} />);

    expect(getByTestId("coin-image")).toHaveProp("source", {
      uri: "https://delta.app/images/V1jxGX/icon-64.png",
    });
  });

  it("navigates to the correct coin detail page when pressed", () => {
    const { getByTestId } = render(<CoinCard {...mockData} />);

    fireEvent.press(getByTestId("pressable"));
    expect(mockPush).toHaveBeenCalledWith("/V1jxGX");
  });
});
