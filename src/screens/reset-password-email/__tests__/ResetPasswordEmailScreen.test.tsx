import {
  resendEmail,
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/reset-password-email";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";

import ResetPasswordEmailScreen from "../index";

jest.mock("@auth0/auth0-acul-react/reset-password-email");
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

describe("ResetPasswordEmailScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<ResetPasswordEmailScreen />);
    });
    await screen.findByRole("heading", { name: /forgot your password/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useScreen as jest.Mock).mockReturnValue({
      name: "reset-password-email",
      texts: {
        pageTitle: "Mock Password Reset Email",
        title: "Forgot your password?",
        emailSentText: "Reset link has been sent",
        description:
          "Please follow the link sent to your email test@example.com to reset your password. Please note the reset link is only valid for 15 mins.",
        resendLinkText: "Resend email",
        buttonText: "Done",
        buttonSubmitting: "Sending...",
        logoAltText: "Brand Logo",
      },
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: { login: "/u/login" },
      data: {
        username: "test@example.com",
      },
      backLink: null,
      loginLink: "/u/login",
    });
  });

  it("renders the branded reset password email screen", async () => {
    await renderScreen();

    expect(
      screen.getByRole("heading", { name: /forgot your password/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/reset link has been sent/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /done/i })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /resend email/i })
    ).toBeInTheDocument();
  });

  it("sets correct document title from SDK", async () => {
    await renderScreen();

    expect(document.title).toBe("Mock Password Reset Email");
  });

  it("sets fallback title when texts is missing", async () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "reset-password-email",
      texts: undefined,
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

    await act(async () => {
      render(<ResetPasswordEmailScreen />);
    });

    expect(document.title).toBe("Forgot your password?");
  });

  it("should integrate with useErrors hook for error handling", async () => {
    await renderScreen();

    expect(useErrors).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /forgot your password/i })
    ).toBeInTheDocument();
  });

  it("should display general errors", async () => {
    const mockTransaction = (useTransaction as jest.Mock)();
    mockTransaction.errors = [CommonTestData.errors.network];
    mockTransaction.hasErrors = true;
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: CommonTestData.errors.network.message,
                kind: "server",
              },
            ];
          }
          return [];
        }),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await act(async () => {
      render(<ResetPasswordEmailScreen />);
    });

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("resends the email when the resend button is clicked", async () => {
    await renderScreen();

    await act(async () => {
      screen.getByRole("button", { name: /resend email/i }).click();
    });

    expect(resendEmail).toHaveBeenCalled();
  });
});
