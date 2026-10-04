import {
  continueMethod,
  resendCode,
  tryAnotherMethod,
} from "@auth0/auth0-acul-react/mfa-email-challenge";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaEmailChallengeScreen from "../index";

jest.mock("@auth0/auth0-acul-react/mfa-email-challenge");
jest.mock("@/hooks/useLoginPageAssets", () => ({
  useLoginPageAssets: () => ({
    backgroundImage: "",
    desktopTree: "",
    mobileTree: "",
    quote: "",
    writer: "",
  }),
}));

describe("MfaEmailChallengeScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaEmailChallengeScreen />);
    });
    await screen.findByRole("button", { name: /continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title, masked email and actions", async () => {
    await renderScreen();

    expect(screen.getByText("Verify Your Identity")).toBeInTheDocument();
    expect(screen.getByText(/j\*\*\*@example\.com/)).toBeInTheDocument();
    expect(
      screen.getByText("Remember this device for 30 days")
    ).toBeInTheDocument();
    expect(screen.getByText("Didn't receive an email?")).toBeInTheDocument();
    expect(screen.getByText("Resend")).toBeInTheDocument();
    expect(screen.getByText("Try another method")).toBeInTheDocument();
    expect(document.title).toBe("Verify Your Identity - MFA");
  });

  it("submits the code with rememberDevice", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(/enter the code/i, "123456");
    await act(async () => {
      fireEvent.click(screen.getByRole("checkbox"));
    });
    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueMethod).toHaveBeenCalledWith({
      code: "123456",
      rememberDevice: true,
    });
  });

  it("shows validation error for empty code", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueMethod).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen.getByText("Please enter the verification code.")
      ).toBeInTheDocument();
    });
  });

  it("resends the code and tries another method", async () => {
    await renderScreen();

    await act(async () => {
      fireEvent.click(screen.getByText("Resend"));
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Try another method"));
    });

    expect(resendCode).toHaveBeenCalled();
    expect(tryAnotherMethod).toHaveBeenCalled();
  });
});
