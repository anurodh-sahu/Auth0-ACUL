import LoginPageModal from "@/components/login-page/LoginPageModal";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import EmailSentModal from "./components/EmailSentModal";
import { useResetPasswordEmailManager } from "./hooks/useResetPasswordEmailManager";

function ResetPasswordEmailScreen() {
  const { resetPasswordEmail, texts, locales } =
    useResetPasswordEmailManager();

  applyAuth0Theme(resetPasswordEmail);
  document.title = texts?.pageTitle || locales.page.title;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-6 font-jost">
      <LoginPageModal className="w-full max-w-md">
        <EmailSentModal />
      </LoginPageModal>
    </div>
  );
}

export default ResetPasswordEmailScreen;
