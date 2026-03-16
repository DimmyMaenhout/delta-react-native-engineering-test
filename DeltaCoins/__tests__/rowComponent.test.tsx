import RowComponent from "@/components/rowComponent";
import { render } from "@testing-library/react-native";

describe("<RowComponent>", () => {
  it("displays the title and value correctly", () => {
    const { getByText } = render(<RowComponent title="Price" value={73909} />);

    expect(getByText("Price:")).toBeTruthy();
    expect(getByText("73909")).toBeTruthy();
  });

  it("renders string values correctly", () => {
    const { getByText } = render(<RowComponent title="Symbol" value="BTC" />);

    expect(getByText("Symbol:")).toBeTruthy();
    expect(getByText("BTC")).toBeTruthy();
  });
});
