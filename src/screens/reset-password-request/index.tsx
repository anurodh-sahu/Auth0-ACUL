import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import ResetPasswordRequestForm from "./components/ResetPasswordRequestForm";
import { useResetPasswordRequestManager } from "./hooks/resetPasswordRequestManager";

function ResetPasswordRequestScreen() {
  const { resetPasswordRequest, texts, locales } =
    useResetPasswordRequestManager();

  applyAuth0Theme(resetPasswordRequest);
  document.title = texts?.pageTitle || locales.pageTitle;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <ResetPasswordRequestForm />
    </LoginPageShell>
  );
}

export default ResetPasswordRequestScreen;
