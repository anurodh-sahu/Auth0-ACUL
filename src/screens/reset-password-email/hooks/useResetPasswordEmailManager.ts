import {
  resendEmail,
  useResetPasswordEmail,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-email";
import type {
  ResetPasswordEmailMembers,
  ScreenMembersOnResetPasswordEmail,
} from "@auth0/auth0-acul-js/reset-password-email";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useResetPasswordEmailManager = () => {
  const resetPasswordEmail: ResetPasswordEmailMembers =
    useResetPasswordEmail();
  const screen: ScreenMembersOnResetPasswordEmail = useScreen();

  const { texts, data } = screen;

  const handleResendEmail = async (): Promise<void> => {
    await executeSafely("Resend email for password reset", () =>
      resendEmail()
    );
  };

  return {
    resetPasswordEmail,
    handleResendEmail,
    texts: (texts ||
      {}) as NonNullable<ScreenMembersOnResetPasswordEmail["texts"]>,
    data,
    locales,
  };
};
