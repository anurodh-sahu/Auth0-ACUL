import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MfaEmailChallengeForm from "./components/MfaEmailChallengeForm";
import { useMfaEmailChallengeManager } from "./hooks/useMfaEmailChallengeManager";

function MfaEmailChallengeScreen() {
  const { mfaEmailChallenge, texts, locales } = useMfaEmailChallengeManager();

  applyAuth0Theme(mfaEmailChallenge);
  document.title = texts?.pageTitle || locales.page.title;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <MfaEmailChallengeForm />
      <Footer />
    </LoginPageShell>
  );
}

export default MfaEmailChallengeScreen;
