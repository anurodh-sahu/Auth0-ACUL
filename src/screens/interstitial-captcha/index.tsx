import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import InterstitialCaptchaForm from "./components/InterstitialCaptchaForm";
import { useInterstitialCaptchaManager } from "./hooks/useInterstitialCaptchaManager";

function InterstitialCaptchaScreen() {
  const { interstitialCaptcha, texts, locales } =
    useInterstitialCaptchaManager();

  applyAuth0Theme(interstitialCaptcha);
  document.title = texts?.pageTitle || locales.page.title;

  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <Header />
      <InterstitialCaptchaForm />
    </LoginPageShell>
  );
}

export default InterstitialCaptchaScreen;
