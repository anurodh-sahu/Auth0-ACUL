import { ACUL_BRAND } from "@/brands/aculBrand";
import { LOGIN_PAGE_COPY } from "@/constants/loginPage";

interface LoginSubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  showAccentDot?: boolean;
}

function LoginSubmitButton({
  loading,
  disabled,
  label = ACUL_BRAND.loginButton || LOGIN_PAGE_COPY.loginButton,
  loadingLabel = ACUL_BRAND.loggingInButton || LOGIN_PAGE_COPY.loggingInButton,
  showAccentDot = true,
}: LoginSubmitButtonProps) {
  return (
    <div className="relative flex w-full shrink-0 items-center">
      {showAccentDot ? (
        <span className={ACUL_BRAND.accentDotClassName} aria-hidden="true" />
      ) : null}
      <button
        type="submit"
        disabled={disabled || loading}
        className={ACUL_BRAND.submitButtonClassName}
      >
        <span>{loading ? loadingLabel : label}</span>
      </button>
    </div>
  );
}

export default LoginSubmitButton;
