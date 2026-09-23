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
    await screen.findByRole("heading", { name: /check your email/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the branded reset password email layout", async () => {
    await renderScreen();

    expect(
      screen.getByRole("heading", { name: /check your email/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we've sent a password reset link to your email/i)
    ).toBeInTheDocument();
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

    expect(document.title).toBe("Check your email");
  });

  it("should integrate with useErrors hook for error handling", async () => {
    await renderScreen();

    expect(useErrors).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /check your email/i })
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

  it("resends the email when the button is clicked", async () => {
    await renderScreen();

    await act(async () => {
      screen.getByRole("button", { name: /resend email/i }).click();
    });

    expect(resendEmail).toHaveBeenCalled();
  });
});
