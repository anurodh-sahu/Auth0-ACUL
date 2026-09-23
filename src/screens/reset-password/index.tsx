import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { useResetPasswordManager } from "./hooks/useResetPasswordManager";

function ResetPasswordScreen() {
  const { resetPassword, texts, locales } = useResetPasswordManager();

  applyAuth0Theme(resetPassword);
  document.title = texts?.pageTitle || locales.pageTitle;

  const logoAltText = texts?.logoAltText || locales.header.logoAltText;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <ResetPasswordForm />
    </LoginPageShell>
  );
}

export default ResetPasswordScreen;
