import { useScreen } from "@auth0/auth0-acul-react/email-verification-result";
import { render, screen } from "@testing-library/react";

import EmailVerificationResultScreen from "../index";

jest.mock("@auth0/auth0-acul-react/email-verification-result");

const baseScreen = {
  name: "email-verification-result",
  texts: {},
  links: null,
};

describe("EmailVerificationResultScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders already verified error with Back to Login button", () => {
    render(<EmailVerificationResultScreen />);

    expect(screen.getByRole("heading", { name: "Error" })).toHaveClass(
      "text-[#E7000B]"
    );
    expect(
      screen.getByText("This account is already verified.")
    ).not.toHaveClass("text-[#E7000B]");
    expect(
      screen.getByRole("button", { name: /back to login/i })
    ).toBeInTheDocument();
    expect(document.title).toBe("Email verification status");
  });

  it("renders success state from locale fallbacks", () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...baseScreen,
      data: { status: "success" },
      loginLink: null,
    });

    render(<EmailVerificationResultScreen />);

    expect(
      screen.getByRole("heading", { name: "Email Verified" })
    ).not.toHaveClass("text-[#E7000B]");
    expect(
      screen.getByText("Your email address was successfully verified.")
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /back to/i })
    ).not.toBeInTheDocument();
  });

  it("falls back to unknown error for unrecognised status", () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...baseScreen,
      data: null,
      loginLink: null,
    });

    render(<EmailVerificationResultScreen />);

    expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
    expect(
      screen.getByText("Your email address could not be verified.")
    ).toBeInTheDocument();
  });
});
