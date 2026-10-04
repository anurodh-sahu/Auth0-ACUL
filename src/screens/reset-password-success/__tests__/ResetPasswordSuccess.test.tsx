import { useScreen } from "@auth0/auth0-acul-react/reset-password-success";
import { act, render, screen } from "@testing-library/react";

import { redirectTo } from "@/utils/helpers/redirect";

import ResetPasswordSuccessScreen from "../index";

jest.mock("@auth0/auth0-acul-react/reset-password-success");
jest.mock("@/utils/helpers/redirect", () => ({ redirectTo: jest.fn() }));
jest.mock("@/hooks/useLoginPageAssets", () => ({
  useLoginPageAssets: () => ({
    backgroundImage: "",
    desktopTree: "",
    mobileTree: "",
    quote: "",
    writer: "",
  }),
}));
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => ""),
}));

describe("ResetPasswordSuccessScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with success message", () => {
    render(<ResetPasswordSuccessScreen />);

    expect(
      screen.getByText("Your Password has been updated.")
    ).toBeInTheDocument();
    expect(screen.queryByText(/Password Changed!/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /back to login/i })
    ).toBeInTheDocument();
  });

  it("auto-redirects to back_to_app after the countdown", () => {
    jest.useFakeTimers();
    try {
      render(<ResetPasswordSuccessScreen />);

      expect(
        screen.getByText("Redirecting to login in 5s...")
      ).toBeInTheDocument();
      expect(redirectTo).not.toHaveBeenCalled();

      for (let i = 0; i < 5; i += 1) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(redirectTo).toHaveBeenCalledWith("/u/login");
    } finally {
      jest.useRealTimers();
    }
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordSuccessScreen />);

    expect(document.title).toBe("Password Reset Complete");
  });

  it("hides Back to Login button without back_to_app", () => {
    (useScreen as jest.Mock).mockReturnValue({
      name: "reset-password-success",
      texts: {
        pageTitle: "Password Reset Complete",
        eventTitle: "Password Changed!",
        description: "Your password has been changed successfully.",
        buttonText: "Back to Ambit",
      },
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: null,
      data: {},
      backLink: null,
      loginLink: null,
    });

    render(<ResetPasswordSuccessScreen />);

    expect(
      screen.queryByRole("button", { name: /back to/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /back to/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Redirecting to login/i)).not.toBeInTheDocument();
    expect(redirectTo).not.toHaveBeenCalled();
  });
});
