import LoginPageShell from "@/components/login-page/LoginPageShell";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import LoginForm from "./components/LoginForm";
import { useLoginManager } from "./hooks/useLoginManager";

function LoginScreen() {
  const { loginInstance, texts, locales } = useLoginManager();

  document.title = texts?.pageTitle || locales?.page?.title;
  applyAuth0Theme(loginInstance);

  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <LoginPageShell logoAlt={logoAltText}>
      <LoginForm />
    </LoginPageShell>
  );
}

export default LoginScreen;
