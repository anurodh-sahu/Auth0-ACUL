import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";

function Footer() {
  const { texts, handleBackToLogin, locales } =
    useResetPasswordRequestManager();

  const returnToPreviousScreenText =
    texts?.backToLoginLinkText || locales.footer.backButton;

  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        className="text-xs text-[#6D6E71] underline-offset-2 hover:underline"
        onClick={() => {
          void handleBackToLogin();
        }}
      >
        {returnToPreviousScreenText}
      </button>
    </div>
  );
}

export default Footer;
