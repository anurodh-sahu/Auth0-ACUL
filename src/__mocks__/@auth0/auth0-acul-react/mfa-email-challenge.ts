const mockInstance = {
  continue: jest.fn(),
  resendCode: jest.fn(),
  tryAnotherMethod: jest.fn(),
  pickEmail: jest.fn(),
};

export const useMfaEmailChallenge = jest.fn(() => mockInstance);

export const useScreen = jest.fn(() => ({
  name: "mfa-email-challenge",
  texts: {
    pageTitle: "Verify Your Identity - MFA",
    title: "Verify Your Identity",
    description: "We've sent an email with your code to:",
    placeholder: "Enter the code",
    buttonText: "Continue",
    rememberMeText: "Remember this device for 30 days",
    resendText: "Didn't receive an email?",
    resendActionText: "Resend",
    pickAuthenticatorText: "Try another method",
    logoAltText: "Application Logo",
  },
  isCaptchaAvailable: false,
  captchaProvider: null,
  captchaSiteKey: null,
  captchaImage: null,
  captcha: null,
  links: null,
  data: {
    email: "j***@example.com",
    showRememberDevice: true,
  },
}));

export const useTransaction = jest.fn(() => ({
  hasErrors: false,
  errors: [],
  state: "mock-state",
  locale: "en",
}));

export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn((_field: string) => []),
    byType: jest.fn((_kind: string) => []),
    byCode: jest.fn((_code: string) => []),
  },
  hasError: false,
  dismiss: jest.fn(),
}));

export const useResend = jest.fn(() => ({
  remaining: 0,
  disabled: false,
  startResend: jest.fn(),
}));

export const continueMethod = mockInstance.continue;
export const resendCode = mockInstance.resendCode;
export const tryAnotherMethod = mockInstance.tryAnotherMethod;
export const pickEmail = mockInstance.pickEmail;
