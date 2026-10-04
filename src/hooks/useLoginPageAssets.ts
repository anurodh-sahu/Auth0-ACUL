import { useEffect, useState } from "react";

import {
  EMPTY_LOGIN_PAGE_VISUALS,
  getResolvedLoginPageVisuals,
  prefetchLoginPageAssets,
  type LoginPageVisuals,
} from "@/utils/loginPageAssets";

export type { LoginPageVisuals };

export function useLoginPageAssets(): LoginPageVisuals {
  const [visuals, setVisuals] = useState<LoginPageVisuals>(
    () => getResolvedLoginPageVisuals() ?? EMPTY_LOGIN_PAGE_VISUALS
  );

  useEffect(() => {
    let cancelled = false;

    prefetchLoginPageAssets().then((nextVisuals) => {
      if (!cancelled) {
        setVisuals(nextVisuals);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return visuals;
}
