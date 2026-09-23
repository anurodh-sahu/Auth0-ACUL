import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import { useResetPasswordErrorManager } from "./hooks/resetPasswordErrorManager";

function ResetPasswordErrorScreen() {
  const { resetPasswordError, texts, locales } =
    useResetPasswordErrorManager();

  applyAuth0Theme(resetPasswordError);
  document.title = texts?.pageTitle || locales.pageTitle;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
    </LoginPageShell>
  );
}

export default ResetPasswordErrorScreen;
