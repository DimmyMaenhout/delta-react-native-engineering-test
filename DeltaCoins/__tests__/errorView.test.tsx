import { render, fireEvent } from "@testing-library/react-native";
import ErrorView from "@/components/errorView";

describe("<ErrorView />", () => {
  it("renders the error message", () => {
    const message = "Something went wrong";
    const mockPress = jest.fn();
    const { getByText } = render(
      <ErrorView message={message} pressed={mockPress} />,
    );

    expect(getByText(message)).toBeTruthy();
    expect(getByText("Try Again")).toBeTruthy();
  });

  it("calls pressed callback when button is pressed", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <ErrorView message="Error" pressed={mockPress} />,
    );

    fireEvent.press(getByText("Try Again"));
    expect(mockPress).toHaveBeenCalled();
  });
});
