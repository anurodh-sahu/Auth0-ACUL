import BruteForceProtectionUnblockSuccess from "@auth0/auth0-acul-js/brute-force-protection-unblock-success";
import { render, screen } from "@testing-library/react";

import { defaultScreen } from "@/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock-success";

import BruteForceProtectionUnblockSuccessScreen from "../index";

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
  (
    BruteForceProtectionUnblockSuccess as unknown as jest.Mock
  ).mockImplementation(() => ({ screen: screenData }));
};

describe("BruteForceProtectionUnblockSuccessScreen", () => {
  beforeEach(() => {
    mockScreen(defaultScreen);
  });

  it("renders the Auth0 texts with a centered, non-error title", () => {
    render(<BruteForceProtectionUnblockSuccessScreen />);

    const heading = screen.getByRole("heading", { name: /account unblocked/i });
    expect(heading.parentElement).toHaveClass("login:text-center");
    expect(heading).not.toHaveClass("text-[#E7000B]");
    expect(
      screen.getByText("Your account has been unblocked.")
    ).toBeInTheDocument();
    expect(document.title).toBe("Account Unblocked");
  });

  it("falls back to local texts when Auth0 sends none", () => {
    mockScreen({ ...defaultScreen, texts: null });

    render(<BruteForceProtectionUnblockSuccessScreen />);

    expect(screen.getByText(/you can now log in again/i)).toBeInTheDocument();
  });
});
