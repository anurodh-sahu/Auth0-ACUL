import { useEffect, useState } from "react";

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

const EMPTY_VISUALS: LoginPageVisuals = {
  backgroundImage: "",
  desktopTree: "",
  mobileTree: "",
  quote: "",
  writer: "",
};

export function useLoginPageAssets(): LoginPageVisuals {
  const [visuals, setVisuals] = useState<LoginPageVisuals>(EMPTY_VISUALS);

  useEffect(() => {
    let cancelled = false;

    fetch(LOGIN_ASSETS_ENDPOINT)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load assets. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        const loginPage = json?.data?.loginPage;
        if (!loginPage) {
          throw new Error("loginPage assets not found in API response.");
        }

        const selectedQuote: LoginQuoteItem | null = pickActiveLoginQuote(
          loginPage.Quote
        );

        if (cancelled) {
          return;
        }

        setVisuals({
          backgroundImage: getAssetUrl(loginPage.background_image),
          desktopTree: getAssetUrl(loginPage.desktop_tree_image),
          mobileTree: getAssetUrl(loginPage.small_tree_image),
          quote: selectedQuote?.quote?.trim() || "",
          writer: selectedQuote?.writer?.trim() || "",
        });
      })
      .catch((err) => {
        console.error("Failed to load page assets:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return visuals;
}
