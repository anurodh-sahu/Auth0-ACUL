import {
  useLogin,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";
import type {
  FederatedLoginOptions,
  LoginMembers,
  LoginOptions,
  ScreenMembersOnLogin,
  TransactionMembersOnLogin,
} from "@auth0/auth0-acul-js/login";

import locales from "@/screens/login/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginManager = () => {
  const loginInstance: LoginMembers = useLogin();
  const screen: ScreenMembersOnLogin = useScreen();
  const transaction: TransactionMembersOnLogin = useTransaction();

  const { alternateConnections } = transaction;
  const { isCaptchaAvailable, texts, captcha, signupLink, resetPasswordLink } =
    screen;
  const { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled } =
    transaction;

  const handleLogin = async (payload: LoginOptions): Promise<void> => {
    const options: LoginOptions = {
      username: payload.username.trim(),
      password: payload.password,
    };

    if (screen.isCaptchaAvailable && payload?.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(
      `Perform Login operation with options: ${JSON.stringify(logOptions)}`,
      () => loginInstance.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Perform Federated login with connection: ${payload.connection}`,
      () => loginInstance.federatedLogin(payload)
    );
  };

  return {
    loginInstance,
    handleLogin,
    handleFederatedLogin,
    texts,
    locales,
    isSignupEnabled,
    isForgotPasswordEnabled,
    isPasskeyEnabled,
    isCaptchaAvailable,
    captcha,
    alternateConnections,
    signupLink,
    resetPasswordLink,
  };
};
