import LoginPageModal from "@/components/login-page/LoginPageModal";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MFALoginOptionsList from "./components/MFALoginOptionsList";
import { useMfaLoginOptionsManager } from "./hooks/useMFALoginOptionsManager";

function MFALoginOptions() {
  const { mfaLoginOptions, texts, locales } = useMfaLoginOptionsManager();

  applyAuth0Theme(mfaLoginOptions);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-6 font-jost">
      <LoginPageModal className="w-full max-w-md">
        <Header />
        <MFALoginOptionsList />
      </LoginPageModal>
    </div>
  );
}

export default MFALoginOptions;
