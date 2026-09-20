import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MfaSmsChallengeForm from "./components/MfaSmsChallengeForm";
import { useMfaSmsChallengeManager } from "./hooks/useMfaSmsChallengeManager";

function MfaSmsChallengeScreen() {
  const { mfaSmsChallenge, texts, locales } = useMfaSmsChallengeManager();

  applyAuth0Theme(mfaSmsChallenge);
  document.title = texts?.pageTitle || locales.page.title;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <MfaSmsChallengeForm />
    </LoginPageShell>
  );
}

export default MfaSmsChallengeScreen;
