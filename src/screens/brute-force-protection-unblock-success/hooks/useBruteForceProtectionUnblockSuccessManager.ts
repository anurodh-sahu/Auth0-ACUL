import { useMemo } from "react";

import BruteForceProtectionUnblockSuccess from "@auth0/auth0-acul-js/brute-force-protection-unblock-success";
import type { ScreenMembersOnBruteForceProtectionUnblockSuccess } from "@auth0/auth0-acul-react/types";

import locales from "../locales/en.json";

// The acul-react 1.9.0 wrapper returns null for this screen (the acul-js class has no screenIdentifier).
export const useBruteForceProtectionUnblockSuccessManager = () => {
  const bruteForceProtectionUnblockSuccess = useMemo(
    () => new BruteForceProtectionUnblockSuccess(),
    []
  );

  return {
    bruteForceProtectionUnblockSuccess,
    texts: (bruteForceProtectionUnblockSuccess.screen.texts ||
      {}) as NonNullable<
      ScreenMembersOnBruteForceProtectionUnblockSuccess["texts"]
    >,
    locales,
  };
};
