import LoginPageModal from "@/components/login-page/LoginPageModal";
import { applyAuth0Theme } from "@/utils/theme";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { useResetPasswordSuccessManager } from "./hooks/resetPasswordSuccessManager";

function ResetPasswordSuccessScreen() {
  const { resetPasswordSuccess, texts, locales } =
    useResetPasswordSuccessManager();

  applyAuth0Theme(resetPasswordSuccess);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-6 font-jost">
      <LoginPageModal className="w-full max-w-md">
        <Header />
        <Footer />
      </LoginPageModal>
    </div>
  );
}

export default ResetPasswordSuccessScreen;
