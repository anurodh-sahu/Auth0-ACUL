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
  links?: { back_to_app?: string } | null;
};

export const useResetPasswordSuccessManager = () => {
  const screen = useScreen() as ScreenWithLinks;
  const { texts, data } = screen;

  return {
    resetPasswordSuccess: useResetPasswordSuccess(),
    texts: (texts || {}) as ScreenMembersOnResetPasswordSuccess["texts"],
    data: data || {},
    locales,
    // Auth0 only provides back_to_app when an Application or Tenant Login URI is configured.
    backToAppHref: screen.links?.back_to_app || undefined,
  };
};
