import {
  useResetPasswordSuccess,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-success";
import { ScreenMembersOnResetPasswordSuccess } from "@auth0/auth0-acul-react/types";

import locales from "../locales/en.json";

/**
 * Handles successful password reset process
 *
 */
type ScreenWithLinks = ScreenMembersOnResetPasswordSuccess & {
  links?: { login?: string; back_to_app?: string } | null;
  loginLink?: string | null;
};

function resolveBackHref(screen: ScreenWithLinks): string | undefined {
  return (
    screen.links?.back_to_app ||
    screen.loginLink ||
    screen.links?.login ||
    undefined
  );
}

export const useResetPasswordSuccessManager = () => {
  const screen = useScreen() as ScreenWithLinks;
  const { texts, data } = screen;

  return {
    resetPasswordSuccess: useResetPasswordSuccess(),
    texts: (texts || {}) as ScreenMembersOnResetPasswordSuccess["texts"] & {
      backToLoginLinkText?: string;
    },
    data: data || {},
    locales,
    loginHref: resolveBackHref(screen),
  };
};
