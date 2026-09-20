import { useMfaOtpChallengeManager } from "../hooks/useMfaOtpChallengeManager";

function Footer() {
  const { texts, handleTryAnotherMethod, locales } = useMfaOtpChallengeManager();

  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || locales.footer.tryAnother;

  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        className="text-xs text-[#6D6E71] underline-offset-2 hover:underline"
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
