import {
  useEmailVerificationResult,
  useScreen,
} from "@auth0/auth0-acul-react/email-verification-result";

import locales from "../locales/en.json";

type EmailVerificationTexts = {
  pageTitle?: string;
  verifiedTitle?: string;
  errorTitle?: string;
  verifiedDescription?: string;
  alreadyVerifiedDescription?: string;
  invalidAccountOrCodeDescription?: string;
  unknownErrorDescription?: string;
};

type VerificationOutcome =
  | "verified"
  | "already_verified"
  | "invalid"
  | "error";

function resolveOutcome(status?: string | null): VerificationOutcome {
  const value = (status || "").toLowerCase();
  if (value.includes("already")) return "already_verified";
  if (value === "success" || value === "verified") return "verified";
  if (value.includes("invalid")) return "invalid";
  return "error";
}

export const useEmailVerificationResultManager = () => {
  const screen = useScreen();
  const texts = (screen.texts || {}) as EmailVerificationTexts;
  const outcome = resolveOutcome(screen.data?.status);
  const header = locales.header;

  const title =
    outcome === "verified"
      ? texts.verifiedTitle || header.verifiedTitle
      : texts.errorTitle || header.errorTitle;

  const description = {
    verified: texts.verifiedDescription || header.verifiedDescription,
    already_verified:
      texts.alreadyVerifiedDescription || header.alreadyVerifiedDescription,
    invalid:
      texts.invalidAccountOrCodeDescription ||
      header.invalidAccountOrCodeDescription,
    error: texts.unknownErrorDescription || header.unknownErrorDescription,
  }[outcome];

  return {
    emailVerificationResult: useEmailVerificationResult(),
    texts,
    locales,
    isError: outcome !== "verified",
    title,
    description,
    loginHref: screen.loginLink || undefined,
  };
};
