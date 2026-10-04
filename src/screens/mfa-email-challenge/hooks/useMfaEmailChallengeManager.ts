import {
  useMfaEmailChallenge,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-email-challenge";
import type {
  MfaEmailChallengeMembers,
  ScreenMembersOnMfaEmailChallenge,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useMfaEmailChallengeManager = () => {
  const mfaEmailChallenge: MfaEmailChallengeMembers = useMfaEmailChallenge();
  const screen: ScreenMembersOnMfaEmailChallenge = useScreen();

  const { texts, data } = screen;

  const handleContinue = async (
    code: string,
    rememberDevice: boolean = false
  ): Promise<void> => {
    const options = { code: code?.trim() || "", rememberDevice };

    await executeSafely(
      `Continue MFA Email Challenge with options: ${JSON.stringify(options)}`,
      () => mfaEmailChallenge.continue(options)
    );
  };

  const handleResendCode = async (): Promise<void> => {
    await executeSafely("Resend MFA email code", () =>
      mfaEmailChallenge.resendCode({})
    );
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    await executeSafely("Try another MFA method", () =>
      mfaEmailChallenge.tryAnotherMethod({})
    );
  };

  return {
    mfaEmailChallenge,
    handleContinue,
    handleResendCode,
    handleTryAnotherMethod,
    texts: (texts || {}) as NonNullable<
      ScreenMembersOnMfaEmailChallenge["texts"]
    >,
    data,
    locales,
  };
};
