import { BUILD_ACUL_BRAND } from "./brand.generated";

export type AculBrandId = "client1" | "client2";

export interface AculBrandTheme {
  id: AculBrandId;
  label: string;
  /** Shown above the login title for easy visual verification. */
  badge?: string;
  badgeClassName?: string;
  titleClassName: string;
  descriptionClassName: string;
  loginButton: string;
  loggingInButton: string;
  submitButtonClassName: string;
  accentDotClassName: string;
  /** Center the form and hide inspirational quotes. */
  centerForm: boolean;
  showQuote: boolean;
}

/**
 * Brand is fixed at build time via brand.generated.ts (written by build:brands).
 * client2: centered, no quotes, red verify theme.
 * client1: classic right layout, grey.
 */
function resolveBrand(): AculBrandTheme {
  // Compare the const string directly (no .toLowerCase()) so Rollup drops the other branch.
  if (BUILD_ACUL_BRAND === "client2") {
    return {
      id: "client2",
      label: "Ambit",
      badge: "Client 2 — RED",
      badgeClassName:
        "mb-2 inline-block rounded-full bg-[#FEE2E2] px-3 py-0.5 text-xs font-medium tracking-wide text-[#B91C1C]",
      titleClassName:
        "font-normal text-xl leading-7 tracking-normal text-[#DC2626]",
      descriptionClassName: "text-base leading-6 text-[#DC2626]/70",
      loginButton: "SIGN IN",
      loggingInButton: "SIGNING IN...",
      submitButtonClassName:
        "flex h-[38px] w-full cursor-pointer items-center justify-center rounded-full bg-[#DC2626] font-normal text-base leading-6 tracking-normal text-white outline outline-2 outline-[#DC2626] outline-offset-[2px] disabled:cursor-not-allowed disabled:opacity-80",
      accentDotClassName:
        "absolute left-0 top-1/2 h-10 w-10 -ml-[60px] -translate-y-1/2 rounded-full bg-[#991B1B]",
      centerForm: true,
      showQuote: false,
    };
  }

  return {
    id: "client1",
    label: "Ambit Dev",
    titleClassName:
      "font-normal text-xl leading-7 tracking-normal text-[#020618]",
    descriptionClassName: "text-base leading-6 text-[#6D6E71]",
    loginButton: "LOGIN",
    loggingInButton: "LOGGING IN...",
    submitButtonClassName:
      "flex h-[38px] w-full cursor-pointer items-center justify-center rounded-full bg-[#6D6E71] font-normal text-base leading-6 tracking-normal text-white outline outline-2 outline-[#6D6E71] outline-offset-[2px] disabled:cursor-not-allowed disabled:opacity-80",
    accentDotClassName:
      "absolute left-0 top-1/2 h-10 w-10 -ml-[60px] -translate-y-1/2 rounded-full bg-[#FB2C36]",
    centerForm: false,
    showQuote: true,
  };
}

export const ACUL_BRAND: AculBrandTheme = resolveBrand();
