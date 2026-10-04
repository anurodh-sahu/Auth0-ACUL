import { ACUL_BRAND } from "@/brands/aculBrand";

import { useEmailVerificationResultManager } from "../hooks/useEmailVerificationResultManager";

function Footer() {
  const { locales, loginHref } = useEmailVerificationResultManager();

  if (!loginHref) {
    return null;
  }

  return (
    <div className="relative mt-6 flex w-full shrink-0 items-center">
      <button
        type="button"
        className={ACUL_BRAND.submitButtonClassName}
        onClick={() => {
          window.location.assign(loginHref);
        }}
      >
        <span>{locales.footer.loginButton.toUpperCase()}</span>
      </button>
    </div>
  );
}

export default Footer;
