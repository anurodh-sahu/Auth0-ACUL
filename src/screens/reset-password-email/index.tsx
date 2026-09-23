import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import ResendEmail from "./components/ResendEmail";
import { useResetPasswordEmailManager } from "./hooks/useResetPasswordEmailManager";

function ResetPasswordEmailScreen() {
  const { resetPasswordEmail, texts, locales } =
    useResetPasswordEmailManager();

  applyAuth0Theme(resetPasswordEmail);
  document.title = texts?.pageTitle || locales.page.title;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <ResendEmail />
    </LoginPageShell>
  );
}

export default ResetPasswordEmailScreen;
