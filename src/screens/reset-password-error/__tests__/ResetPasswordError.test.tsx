import { useScreen } from "@auth0/auth0-acul-react/reset-password-error";
import { render, screen } from "@testing-library/react";

import ResetPasswordErrorScreen from "../index";

jest.mock("@auth0/auth0-acul-react/reset-password-error");
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

describe("ResetPasswordErrorScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with error message", () => {
    render(<ResetPasswordErrorScreen />);

    expect(screen.getByText(/An Error Occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to login/i })).toHaveAttribute(
      "href",
      "/u/login"
    );
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordErrorScreen />);

    expect(document.title).toBe("Password Reset Failed");
  });

  it("hides back link when Auth0 does not provide back_to_app", () => {
    (useScreen as jest.Mock).mockReturnValue({
      name: "reset-password-error",
      texts: {
        pageTitle: "Password Reset Failed",
        eventTitle: "An Error Occurred",
        description: "Something went wrong.",
        backToLoginLinkText: "Back to Ambit",
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

    render(<ResetPasswordErrorScreen />);

    expect(
      screen.queryByRole("link", { name: /back to/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /back to/i })
    ).not.toBeInTheDocument();
  });
});
