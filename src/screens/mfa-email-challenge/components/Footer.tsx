import { useResend } from "@auth0/auth0-acul-react/mfa-email-challenge";

import { useMfaEmailChallengeManager } from "../hooks/useMfaEmailChallengeManager";

function Footer() {
  const { texts, handleResendCode, handleTryAnotherMethod, locales } =
    useMfaEmailChallengeManager();

  const { remaining, disabled } = useResend({
    timeoutSeconds: 30,
  });

  const resendText = texts?.resendText || locales.footer.resend.text;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resend.linkText;
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || locales.footer.tryAnother;

  const linkClassName =
    "text-xs text-[#6D6E71] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="mt-4 text-center">
      <div className="mb-2 text-xs text-[#6D6E71]">
        <span>{resendText} </span>
        <button
          type="button"
          className={linkClassName}
          disabled={disabled}
          onClick={() => {
            void handleResendCode();
          }}
        >
          {disabled ? `${resendLinkText} in ${remaining}s` : resendLinkText}
        </button>
      </div>

      <button
        type="button"
        className={linkClassName}
        onClick={() => {
          void handleTryAnotherMethod();
        }}
      >
        {tryAnotherMethodText}
      </button>
    </div>
  );
}

export default Footer;
