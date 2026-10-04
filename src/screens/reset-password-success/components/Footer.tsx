import { useEffect, useState } from "react";

import { ACUL_BRAND } from "@/brands/aculBrand";
import { cn } from "@/lib/utils";
import { translate } from "@/utils/helpers/localeTranslate";
import { redirectTo } from "@/utils/helpers/redirect";

import { useResetPasswordSuccessManager } from "../hooks/resetPasswordSuccessManager";

const AUTO_REDIRECT_SECONDS = 5;

function Footer() {
  const { locales, backToAppHref } = useResetPasswordSuccessManager();
  const [secondsLeft, setSecondsLeft] = useState(AUTO_REDIRECT_SECONDS);

  useEffect(() => {
    if (!backToAppHref) {
      return undefined;
    }
    if (secondsLeft <= 0) {
      redirectTo(backToAppHref);
      return undefined;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [backToAppHref, secondsLeft]);

  if (!backToAppHref) {
    return null;
  }

  return (
    <>
      <p
        className={cn(
          "mt-2 text-center",
          ACUL_BRAND.descriptionClassName,
          "text-sm"
        )}
        aria-live="polite"
      >
        {translate(
          "footer.redirecting",
          { seconds: String(Math.max(secondsLeft, 0)) },
          locales
        )}
      </p>
      <div className="relative mt-4 flex w-full shrink-0 items-center">
        <button
          type="button"
          className={ACUL_BRAND.submitButtonClassName}
          onClick={() => {
            redirectTo(backToAppHref);
          }}
        >
          <span>{locales.footer.loginButton.toUpperCase()}</span>
        </button>
      </div>
    </>
  );
}

export default Footer;
