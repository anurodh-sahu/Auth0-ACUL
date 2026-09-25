import { useResend } from "@auth0/auth0-acul-react/mfa-sms-challenge";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Footer() {
  const {
    texts,
    data,
    handleResendCode,
    handleGetACall,
    handleTryAnotherMethod,
    locales,
  } = useMfaSmsChallengeManager();

  const { remaining, disabled } = useResend({
    timeoutSeconds: 30,
  });

  const resendText = texts?.resendText || locales.footer.resend.text;
  const resendLinkText =
    texts?.resendActionText || locales.footer.resend.linkText;
  const getCallText =
    texts?.resendVoiceActionText || locales.footer.resend.getCall;
  const separatorText =
    texts?.resendVoiceActionSeparatorTextBefore ||
    locales.footer.resend.separator;
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
        {data?.showLinkVoice ? (
          <>
            <span> {separatorText} </span>
            <button
              type="button"
              className={linkClassName}
              onClick={() => {
                void handleGetACall();
              }}
            >
              {getCallText}
            </button>
          </>
        ) : null}
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
