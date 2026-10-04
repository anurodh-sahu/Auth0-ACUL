import LoginPageModal from "@/components/login-page/LoginPageModal";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import UnblockForm from "./components/UnblockForm";
import { useBruteForceProtectionUnblockManager } from "./hooks/useBruteForceProtectionUnblockManager";

function BruteForceProtectionUnblockScreen() {
  const { bruteForceProtectionUnblock, texts, locales } =
    useBruteForceProtectionUnblockManager();

  applyAuth0Theme(bruteForceProtectionUnblock);
  document.title = texts.pageTitle || locales.pageTitle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-6 font-jost">
      <LoginPageModal className="w-full max-w-md">
        <Header />
        <UnblockForm />
      </LoginPageModal>
    </div>
  );
}

export default BruteForceProtectionUnblockScreen;
