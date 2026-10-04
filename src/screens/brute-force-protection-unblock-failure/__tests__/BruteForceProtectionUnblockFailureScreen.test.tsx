import BruteForceProtectionUnblockFailure from "@auth0/auth0-acul-js/brute-force-protection-unblock-failure";
import { render, screen } from "@testing-library/react";

import { defaultScreen } from "@/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock-failure";

import BruteForceProtectionUnblockFailureScreen from "../index";

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
    BruteForceProtectionUnblockFailure as unknown as jest.Mock
  ).mockImplementation(() => ({ screen: screenData }));
};

describe("BruteForceProtectionUnblockFailureScreen", () => {
  beforeEach(() => {
    mockScreen(defaultScreen);
  });

  it("renders a red, centered title and a non-red description", () => {
    render(<BruteForceProtectionUnblockFailureScreen />);

    const heading = screen.getByRole("heading", {
      name: /something went wrong/i,
    });
    expect(heading).toHaveClass("text-[#E7000B]");
    expect(heading.parentElement).toHaveClass("login:text-center");
    expect(screen.getByText("The unblock link has expired.")).not.toHaveClass(
      "text-[#E7000B]"
    );
    expect(document.title).toBe("Unblock Failed");
  });

  it("falls back to local texts when Auth0 sends none", () => {
    mockScreen({ ...defaultScreen, texts: null });

    render(<BruteForceProtectionUnblockFailureScreen />);

    expect(
      screen.getByText(/we couldn't unblock your account/i)
    ).toBeInTheDocument();
  });
});
