export const useEmailVerificationResult = jest.fn(() => ({}));

export const useScreen = jest.fn(() => ({
  name: "email-verification-result",
  texts: {
    pageTitle: "Email verification status",
    verifiedTitle: "Email Verified",
    errorTitle: "Error",
    verifiedDescription: "Your email address was successfully verified.",
    alreadyVerifiedDescription: "This account is already verified.",
    invalidAccountOrCodeDescription:
      "User account does not exist or the verification code is invalid.",
    unknownErrorDescription: "Your email address could not be verified.",
  },
  data: { status: "already_verified" },
  links: null,
  loginLink: "/u/login",
}));
