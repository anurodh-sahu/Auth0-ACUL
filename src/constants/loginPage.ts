export const LOGIN_ASSETS_BASE_URL =
  "https://k8s-ambitshareddevelo-cd0fc7bcc9-1697435033.ap-south-1.elb.amazonaws.com";

export const LOGIN_ASSETS_ENDPOINT = `${LOGIN_ASSETS_BASE_URL}/api/v1/profile/get-assets`;

export const FORGOT_LOGIN_ID_URL = `${LOGIN_ASSETS_BASE_URL}:8083/forget-userId?redirect_url=${LOGIN_ASSETS_BASE_URL}:8081/login`;

export const FORGOT_PASSWORD_FALLBACK_URL = `${LOGIN_ASSETS_BASE_URL}:8083/forget-password?redirect_url=${LOGIN_ASSETS_BASE_URL}:8081/login`;

export const LOGIN_PAGE_COPY = {
  headingLine1: "Welcome to your",
  headingLine2: "portfolio performance",
  headingLine3: "investment insights",
  loginIdLabel: "Login ID",
  passwordLabel: "Password",
  forgotLoginId: "Forgot Login ID?",
  forgotPassword: "Forgot Password?",
  loginButton: "LOGIN",
  loggingInButton: "LOGGING IN...",
} as const;

export interface LoginQuoteItem {
  quote?: string;
  writer?: string;
  isActive?: boolean;
}

export interface LoginPageAssets {
  background_image?: string;
  logo?: string;
  desktop_tree_image?: string;
  small_tree_image?: string;
  Quote?: LoginQuoteItem[];
}

export interface LoginPageAssetsResponse {
  data?: {
    loginPage?: LoginPageAssets;
  };
}

export function getAssetUrl(asset?: string | null): string {
  if (!asset) {
    return "";
  }

  const trimmed = String(asset).trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return `${LOGIN_ASSETS_BASE_URL}${trimmed}`;
  }

  return `${LOGIN_ASSETS_BASE_URL}/${trimmed}`;
}

export function pickActiveLoginQuote(
  quotes?: LoginQuoteItem[] | null
): LoginQuoteItem | null {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return null;
  }

  const active = quotes.filter((item) => item?.isActive === true && item.quote);
  if (active.length === 0) {
    return null;
  }

  return active[Math.floor(Math.random() * active.length)];
}
