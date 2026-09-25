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

type ScreenWithLinks = ScreenMembersOnResetPasswordEmail & {
  links?: { login?: string } | null;
  loginLink?: string | null;
};

export const useResetPasswordEmailManager = () => {
  const resetPasswordEmail: ResetPasswordEmailMembers =
    useResetPasswordEmail();
  const screen = useScreen() as ScreenWithLinks;

  const { texts, data, links, loginLink } = screen;

  const handleResendEmail = async (): Promise<void> => {
    await executeSafely("Resend email for password reset", () =>
      resendEmail()
    );
  };

  return {
    resetPasswordEmail,
    handleResendEmail,
    texts: (texts ||
      {}) as NonNullable<ScreenMembersOnResetPasswordEmail["texts"]> & {
      emailSentText?: string;
      buttonText?: string;
    },
    data,
    locales,
    loginHref: loginLink || links?.login || undefined,
  };
};
