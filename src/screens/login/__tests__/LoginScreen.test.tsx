import {
  login,
  useErrors,
  useLoginIdentifiers,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";
import { act, render, screen } from "@testing-library/react";

import { useCaptcha } from "@/hooks/useCaptcha";
import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginScreen from "../index";

jest.mock("@auth0/auth0-acul-react/login");
jest.mock("@/hooks/useCaptcha", () => ({
  useCaptcha: jest.fn(),
}));

describe("LoginScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<LoginScreen />);
    });
    await screen.findByRole("heading", { name: /welcome/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLoginIdentifiers as jest.Mock).mockReturnValue([
      { type: "username", required: true },
    ]);
    const mockedUseCaptcha = useCaptcha as jest.Mock;
    mockedUseCaptcha.mockReturnValue({
      captchaConfig: {
        siteKey: "mock-key",
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      },
      captchaProps: { label: "CAPTCHA" },
      captchaValue: "mock-value",
    });
  });

  it("should render the classic login layout", async () => {
    await renderScreen();

    expect(
      screen.getByRole("heading", { name: /welcome/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Login ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Forgot Login ID?" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Forgot Password?" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
  });

  it("should set document title from screen data", async () => {
    await renderScreen();
    expect(document.title).toBe("Log in | my app");
  });

  it("should submit username and password together", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput("Login ID", "test@example.com");
    await ScreenTestUtils.fillInput("Password", "secret-password");
    await ScreenTestUtils.fillInput("CAPTCHA", "mock-value");
    await ScreenTestUtils.clickButton(/^login$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        password: "secret-password",
        captcha: "mock-value",
      })
    );
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

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should disable captcha rendering when not available", async () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...(useScreen as jest.Mock)(),
      isCaptchaAvailable: false,
    });

    await renderScreen();

    expect(screen.queryByAltText("CAPTCHA challenge")).not.toBeInTheDocument();
  });
});
