import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import { useResetPasswordSuccessManager } from "./hooks/resetPasswordSuccessManager";

function ResetPasswordSuccessScreen() {
  const { resetPasswordSuccess, texts, locales } =
    useResetPasswordSuccessManager();

  applyAuth0Theme(resetPasswordSuccess);
  document.title = texts?.pageTitle || locales.pageTitle;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
    </LoginPageShell>
  );
}

export default ResetPasswordSuccessScreen;
