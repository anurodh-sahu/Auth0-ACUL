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
  links?: { back_to_app?: string } | null;
};

export const useResetPasswordErrorManager = () => {
  const screen = useScreen() as ScreenWithLinks;
  const { texts } = screen;

  return {
    resetPasswordError: useResetPasswordError(),
    texts: (texts || {}) as NonNullable<
      ScreenMembersOnResetPasswordError["texts"]
    >,
    locales,
    // Auth0 only provides back_to_app when an Application or Tenant Login URI is configured.
    backToAppHref: screen.links?.back_to_app || undefined,
  };
};
