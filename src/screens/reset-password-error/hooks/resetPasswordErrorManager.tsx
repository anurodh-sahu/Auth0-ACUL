import {
  useResetPasswordError,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-error";
import { ScreenMembersOnResetPasswordError } from "@auth0/auth0-acul-react/types";

import locales from "../locales/en.json";

/**
 * Handles password reset error
 *
 */
type ScreenWithLinks = ScreenMembersOnResetPasswordError & {
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

export const useResetPasswordErrorManager = () => {
  const screen = useScreen() as ScreenWithLinks;
  const { texts } = screen;

  return {
    resetPasswordError: useResetPasswordError(),
    texts: (texts || {}) as NonNullable<
      ScreenMembersOnResetPasswordError["texts"]
    > & {
      backToLoginLinkText?: string;
    },
    locales,
    loginHref: resolveBackHref(screen),
  };
};
