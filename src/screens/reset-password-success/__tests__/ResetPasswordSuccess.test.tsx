import { useScreen } from "@auth0/auth0-acul-react/reset-password-success";
import { render, screen } from "@testing-library/react";

import ResetPasswordSuccessScreen from "../index";

jest.mock("@auth0/auth0-acul-react/reset-password-success");
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

    expect(screen.getByText(/Password Changed!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your password has been changed successfully/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to login/i })).toHaveAttribute(
      "href",
      "/u/login"
    );
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordSuccessScreen />);

    expect(document.title).toBe("Password Reset Complete");
  });

  it("hides back link when Auth0 does not provide back_to_app", () => {
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
      screen.queryByRole("link", { name: /back to/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /back to/i })
    ).not.toBeInTheDocument();
  });
});
