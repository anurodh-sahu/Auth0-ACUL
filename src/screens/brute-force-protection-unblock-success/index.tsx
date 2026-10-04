import LoginPageModal from "@/components/login-page/LoginPageModal";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import { useBruteForceProtectionUnblockSuccessManager } from "./hooks/useBruteForceProtectionUnblockSuccessManager";

function BruteForceProtectionUnblockSuccessScreen() {
  const { bruteForceProtectionUnblockSuccess, texts, locales } =
    useBruteForceProtectionUnblockSuccessManager();

  applyAuth0Theme(bruteForceProtectionUnblockSuccess);
  document.title = texts.pageTitle || locales.pageTitle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-6 font-jost">
      <LoginPageModal className="w-full max-w-md">
        <Header />
      </LoginPageModal>
    </div>
  );
}

export default BruteForceProtectionUnblockSuccessScreen;
