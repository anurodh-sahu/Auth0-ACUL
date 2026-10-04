import { useMemo } from "react";

import BruteForceProtectionUnblock from "@auth0/auth0-acul-js/brute-force-protection-unblock";
import type { ScreenMembers } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

// The acul-react 1.9.0 wrapper returns null for this screen (the acul-js class has no screenIdentifier).
export const useBruteForceProtectionUnblockManager = () => {
  const bruteForceProtectionUnblock = useMemo(
    () => new BruteForceProtectionUnblock(),
    []
  );

  const handleUnblock = async (): Promise<void> => {
    await executeSafely("Unblock account", () =>
      bruteForceProtectionUnblock.unblockAccount()
    );
  };

  return {
    bruteForceProtectionUnblock,
    handleUnblock,
    texts: (bruteForceProtectionUnblock.screen.texts || {}) as NonNullable<
      ScreenMembers["texts"]
    >,
    locales,
  };
};
