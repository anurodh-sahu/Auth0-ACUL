import {
  useMfaOtpChallenge,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-otp-challenge";
import type {
  ContinueOptions,
  MfaOtpChallengeMembers,
  ScreenMembersOnMfaOtpChallenge,
} from "@auth0/auth0-acul-js/mfa-otp-challenge";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useMfaOtpChallengeManager = () => {
  const mfaOtpChallenge: MfaOtpChallengeMembers = useMfaOtpChallenge();
  const screen: ScreenMembersOnMfaOtpChallenge = useScreen();

  const { texts, data } = screen;

  const handleContinue = async (
    code: string,
    rememberDevice: boolean = false
  ): Promise<void> => {
    const options: ContinueOptions = {
      code: code?.trim() || "",
      rememberDevice,
    };

    await executeSafely(
      `Continue MFA OTP Challenge with options: ${JSON.stringify({
        ...options,
        code: "[REDACTED]",
      })}`,
      () => mfaOtpChallenge.continue(options)
    );
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    await executeSafely("Try another MFA method", () =>
      mfaOtpChallenge.tryAnotherMethod()
    );
  };

  return {
    mfaOtpChallenge,
    handleContinue,
    handleTryAnotherMethod,
    texts: (texts || {}) as NonNullable<ScreenMembersOnMfaOtpChallenge["texts"]>,
    data,
    locales,
  };
};
