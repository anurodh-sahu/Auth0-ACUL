import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Footer() {
  const { texts, locales, loginHref } = useResetPasswordErrorManager();

  // Match Auth0 default: only show when a back_to_app / login link exists.
  if (!loginHref) {
    return null;
  }

  const backLabel =
    texts?.backToLoginLinkText || locales.footer.backButton;

  return (
    <div className="mt-4 text-center">
      <a
        href={loginHref}
        className="text-xs text-[#6D6E71] underline-offset-2 hover:underline"
      >
        {backLabel}
      </a>
    </div>
  );
}

export default Footer;
