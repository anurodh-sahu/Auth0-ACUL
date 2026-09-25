/**
 * @file Mock for Auth0 ACUL React interstitial-captcha hooks.
 */
import type {
  ErrorItem,
  ScreenMembers,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

import type { ICaptcha } from "@/components/Captcha/index";

export interface MockInterstitialCaptchaInstance {
  submitCaptcha: jest.Mock;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  captcha: ICaptcha;
  isCaptchaAvailable: boolean;
}

export const createMockInterstitialCaptchaInstance =
  (): MockInterstitialCaptchaInstance => ({
    submitCaptcha: jest.fn(),
    screen: {
      name: "interstitial-captcha",
      texts: {
        pageTitle: "Security Check | my app",
        title: "Verify you're human",
        description: "Complete the security check to continue.",
        buttonText: "Continue",
        logoAltText: "Brand Logo",
        captchaCodePlaceholder: "Enter the code shown above",
      },
      isCaptchaAvailable: true,
      captchaProvider: "auth0",
      captchaSiteKey: null,
      captchaImage:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPg==",
      captcha: {
        provider: "auth0",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPg==",
      },
      links: null,
      data: null,
    },
    captcha: {
      provider: "auth0",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPg==",
    },
    isCaptchaAvailable: true,
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

const mockInstance = createMockInterstitialCaptchaInstance();

export const useInterstitialCaptcha = jest.fn(() => ({
  submitCaptcha: mockInstance.submitCaptcha,
}));

export const useScreen = jest.fn(() => mockInstance.screen);
export const useTransaction = jest.fn(() => mockInstance.transaction);

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

export const submitCaptcha = mockInstance.submitCaptcha;

export default jest
  .fn()
  .mockImplementation(() => createMockInterstitialCaptchaInstance());
