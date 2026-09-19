/**
 * @file Mock for the Auth0 ACUL React combined login screen hooks.
 */
import type {
  ErrorItem,
  ScreenMembersOnLogin,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

export interface MockLoginInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  getLoginIdentifiers: jest.Mock;
  screen: ScreenMembersOnLogin;
  transaction: TransactionMembers;
}

export const createMockLoginInstance = (): MockLoginInstance => ({
  login: jest.fn(),
  federatedLogin: jest.fn(),
  pickCountryCode: jest.fn(),
  getLoginIdentifiers: jest.fn(),
  screen: {
    name: "login",
    texts: {
      pageTitle: "Log in | my app",
      title: "Welcome",
      description: "Log in to continue",
      separatorText: "Or",
      buttonText: CommonTestData.commonTexts.continue,
      footerLinkText: "Sign up",
      forgotPasswordText: "Forgot Password?",
      signupActionLinkText: "Sign up",
      footerText: "Don't have an account?",
      signupActionText: "Don't have an account?",
      passwordPlaceholder: "Password",
      usernamePlaceholder: "Username or email address",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone number",
      usernameOnlyPlaceholder: "Username",
      logoAltText: "dev-tenant",
      captchaCodePlaceholder: "Enter the code shown above",
    },
    isCaptchaAvailable: true,
    captchaProvider: "auth0",
    captchaSiteKey: null,
    captchaImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPg==",
    captcha: null,
    links: {
      resetPassword:
        "/u/login/password-reset-start/Username-Password-Authentication?state=mocked_state123",
      signup: "/u/signup?state=mocked_state123",
    },
    signupLink: "/u/signup?state=mocked_state123",
    resetPasswordLink:
      "/u/login/password-reset-start/Username-Password-Authentication?state=mocked_state123",
    data: {},
  },
  transaction: {
    hasErrors: false,
    errors: [],
    state: "mocked_state",
    locale: "en",
    countryCode: null,
    countryPrefix: null,
    connectionStrategy: null,
    currentConnection: null,
    alternateConnections: [],
  },
});

const mockLoginInstance = createMockLoginInstance();

export const useLogin = jest.fn(() => ({
  login: mockLoginInstance.login,
  federatedLogin: mockLoginInstance.federatedLogin,
  pickCountryCode: mockLoginInstance.pickCountryCode,
}));

export const useLoginIdentifiers = jest.fn(() => [
  { type: "username" as const, required: true },
]);

const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byType: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

export const useScreen = jest.fn(() => mockLoginInstance.screen);
export const useTransaction = jest.fn(() => mockLoginInstance.transaction);

export const login = mockLoginInstance.login;
export const federatedLogin = mockLoginInstance.federatedLogin;

export default jest.fn().mockImplementation(() => createMockLoginInstance());
