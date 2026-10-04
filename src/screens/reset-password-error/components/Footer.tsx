import { ACUL_BRAND } from "@/brands/aculBrand";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Footer() {
  const { locales, backToAppHref } = useResetPasswordErrorManager();

  if (!backToAppHref) {
    return null;
  }

  return (
    <div className="relative mt-4 flex w-full shrink-0 items-center">
      <button
        type="button"
        className={ACUL_BRAND.submitButtonClassName}
        onClick={() => {
          window.location.assign(backToAppHref);
        }}
      >
        <span>{locales.footer.loginButton.toUpperCase()}</span>
      </button>
    </div>
  );
}

export default Footer;
