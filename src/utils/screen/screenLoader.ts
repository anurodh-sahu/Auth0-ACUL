// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "interstitial-captcha": lazy(
    () => import("@/screens/interstitial-captcha")
  ),
  "login-id": lazy(() => import("@/screens/login-id")),
  login: lazy(() => import("@/screens/login")),
  "mfa-sms-challenge": lazy(() => import("@/screens/mfa-sms-challenge")),
  "mfa-otp-challenge": lazy(() => import("@/screens/mfa-otp-challenge")),
  "mfa-login-options": lazy(() => import("@/screens/mfa-login-options")),
  "reset-password": lazy(() => import("@/screens/reset-password")),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
  "reset-password-error": lazy(() => import("@/screens/reset-password-error")),
  "reset-password-request": lazy(
    () => import("@/screens/reset-password-request")
  ),
  "reset-password-success": lazy(
    () => import("@/screens/reset-password-success")
  ),
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
