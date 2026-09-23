// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-id": lazy(() => import("@/screens/login-id")),
  login: lazy(() => import("@/screens/login")),
  "mfa-sms-challenge": lazy(() => import("@/screens/mfa-sms-challenge")),
  "mfa-otp-challenge": lazy(() => import("@/screens/mfa-otp-challenge")),
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
