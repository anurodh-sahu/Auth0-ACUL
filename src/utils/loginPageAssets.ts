import {
  getAssetUrl,
  LOGIN_ASSETS_ENDPOINT,
  pickActiveLoginQuote,
  type LoginQuoteItem,
} from "@/constants/loginPage";

export interface LoginPageVisuals {
  backgroundImage: string;
  desktopTree: string;
  mobileTree: string;
  quote: string;
  writer: string;
}

export const EMPTY_LOGIN_PAGE_VISUALS: LoginPageVisuals = {
  backgroundImage: "",
  desktopTree: "",
  mobileTree: "",
  quote: "",
  writer: "",
};

let assetsPromise: Promise<LoginPageVisuals> | null = null;
let resolvedVisuals: LoginPageVisuals | null = null;

async function loadLoginPageAssets(): Promise<LoginPageVisuals> {
  if (typeof fetch !== "function") {
    return EMPTY_LOGIN_PAGE_VISUALS;
  }

  const res = await fetch(LOGIN_ASSETS_ENDPOINT);
  if (!res.ok) {
    throw new Error(`Failed to load assets. Status: ${res.status}`);
  }

  const json = await res.json();
  const loginPage = json?.data?.loginPage;
  if (!loginPage) {
    throw new Error("loginPage assets not found in API response.");
  }

  const selectedQuote: LoginQuoteItem | null = pickActiveLoginQuote(
    loginPage.Quote
  );

  const visuals: LoginPageVisuals = {
    backgroundImage: getAssetUrl(loginPage.background_image),
    desktopTree: getAssetUrl(loginPage.desktop_tree_image),
    mobileTree: getAssetUrl(loginPage.small_tree_image),
    quote: selectedQuote?.quote?.trim() || "",
    writer: selectedQuote?.writer?.trim() || "",
  };

  if (visuals.backgroundImage) {
    const preload = new Image();
    preload.src = visuals.backgroundImage;
  }

  return visuals;
}

export function prefetchLoginPageAssets(): Promise<LoginPageVisuals> {
  if (!assetsPromise) {
    assetsPromise = loadLoginPageAssets()
      .then((visuals) => {
        resolvedVisuals = visuals;
        return visuals;
      })
      .catch((err) => {
        console.error("Failed to load page assets:", err);
        assetsPromise = null;
        return EMPTY_LOGIN_PAGE_VISUALS;
      });
  }

  return assetsPromise;
}

export function getResolvedLoginPageVisuals(): LoginPageVisuals | null {
  return resolvedVisuals;
}
