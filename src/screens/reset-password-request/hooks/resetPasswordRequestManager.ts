import { useLoginIdentifiers } from "@auth0/auth0-acul-react/reset-password-request";
import {
  resetPassword,
  useErrors,
  useResetPasswordRequest,
  useScreen,
  useTransaction,
  useUntrustedData,
} from "@auth0/auth0-acul-react/reset-password-request";
import {
  ResetPasswordRequestOptions,
  ScreenMembersOnResetPasswordRequest,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useResetPasswordRequestManager = () => {
  const { texts, captchaImage, isCaptchaAvailable } = useScreen();

  const handleResetPasswordRequest = async (
    username: string,
    captcha?: string
  ): Promise<void> => {
    const options: ResetPasswordRequestOptions = {
      username: username?.trim() || "",
    };
    if (isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }
    await executeSafely(
      `Reset password Request with options: ${JSON.stringify(options)}`,
      () => resetPassword(options)
    );
  };

  return {
    resetPasswordRequest: useResetPasswordRequest(),
    handleResetPasswordRequest,
    texts: (texts || {}) as ScreenMembersOnResetPasswordRequest["texts"],
    errors: useTransaction().errors || [],
    allowedIdentifiers: useTransaction().allowedIdentifiers || [],
    captchaImage,
    countryCode: useTransaction().countryCode || null,
    countryPrefix: useTransaction().countryPrefix || null,
    isCaptchaAvailable: useScreen().isCaptchaAvailable === true,
    captcha: useScreen().captcha || null,
    activeIdentifiers: useLoginIdentifiers(),
    useErrors: useErrors(),
    inputfield: useUntrustedData().submittedFormData?.username || "",
    locales,
  };
};
