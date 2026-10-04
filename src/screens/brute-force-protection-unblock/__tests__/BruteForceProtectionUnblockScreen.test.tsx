import BruteForceProtectionUnblock from "@auth0/auth0-acul-js/brute-force-protection-unblock";
import { useErrors } from "@auth0/auth0-acul-react/brute-force-protection-unblock";
import { act, fireEvent, render, screen } from "@testing-library/react";

import {
  defaultScreen,
  unblockAccount,
} from "@/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock";

import BruteForceProtectionUnblockScreen from "../index";

jest.mock("@/hooks/useLoginPageAssets", () => ({
  useLoginPageAssets: () => ({
    backgroundImage: "",
    desktopTree: "",
    mobileTree: "",
    quote: "",
    writer: "",
  }),
}));

const mockScreen = (screenData: object) => {
  (BruteForceProtectionUnblock as unknown as jest.Mock).mockImplementation(
    () => ({ screen: screenData, unblockAccount })
  );
};

describe("BruteForceProtectionUnblockScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScreen(defaultScreen);
  });

  it("renders the Auth0 texts with a centered title", () => {
    render(<BruteForceProtectionUnblockScreen />);

    const heading = screen.getByRole("heading", {
      name: /unblock your account/i,
    });
    expect(heading.parentElement).toHaveClass("login:text-center");
    expect(heading).not.toHaveClass("text-[#E7000B]");
    expect(
      screen.getByText(/click the button below to unblock your account/i)
    ).toBeInTheDocument();
    expect(document.title).toBe("Unblock Account");
  });

  it("falls back to local texts when Auth0 sends none", () => {
    mockScreen({ ...defaultScreen, texts: null });

    render(<BruteForceProtectionUnblockScreen />);

    expect(
      screen.getByRole("button", { name: /unblock my account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/blocked after too many failed login attempts/i)
    ).toBeInTheDocument();
  });

  it("does not render the accent dot next to the button", () => {
    const { container } = render(<BruteForceProtectionUnblockScreen />);

    expect(
      container.querySelector('form span[aria-hidden="true"]')
    ).not.toBeInTheDocument();
  });

  it("calls unblockAccount when the button is clicked", async () => {
    render(<BruteForceProtectionUnblockScreen />);

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /unblock my account/i })
      );
    });

    expect(unblockAccount).toHaveBeenCalledTimes(1);
  });

  it("shows a general error returned by Auth0", () => {
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn(() => [{ message: "Unblock failed" }]),
        byCode: jest.fn(() => []),
      },
      hasError: true,
      dismiss: jest.fn(),
    });

    render(<BruteForceProtectionUnblockScreen />);

    expect(screen.getByText("Unblock failed")).toBeInTheDocument();
  });
});
