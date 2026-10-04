import { useMemo } from "react";

import BruteForceProtectionUnblockFailure from "@auth0/auth0-acul-js/brute-force-protection-unblock-failure";
import type { ScreenMembersOnBruteForceProtectionUnblockFailure } from "@auth0/auth0-acul-react/types";

import locales from "../locales/en.json";

// The acul-react 1.9.0 wrapper returns null for this screen (the acul-js class has no screenIdentifier).
export const useBruteForceProtectionUnblockFailureManager = () => {
  const bruteForceProtectionUnblockFailure = useMemo(
    () => new BruteForceProtectionUnblockFailure(),
    []
  );

  return {
    bruteForceProtectionUnblockFailure,
    texts: (bruteForceProtectionUnblockFailure.screen.texts ||
      {}) as NonNullable<
      ScreenMembersOnBruteForceProtectionUnblockFailure["texts"]
    >,
    locales,
  };
};
