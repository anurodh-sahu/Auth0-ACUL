import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MfaOtpChallengeForm from "./components/MfaOtpChallengeForm";
import { useMfaOtpChallengeManager } from "./hooks/useMfaOtpChallengeManager";

function MfaOtpChallengeScreen() {
  const { mfaOtpChallenge, texts, locales } = useMfaOtpChallengeManager();

  applyAuth0Theme(mfaOtpChallenge);
  document.title = texts?.pageTitle || locales.page.title;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <MfaOtpChallengeForm />
    </LoginPageShell>
  );
}

export default MfaOtpChallengeScreen;
