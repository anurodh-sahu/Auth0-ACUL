import LoginHeading from "@/components/login-page/LoginHeading";

import { useResetPasswordSuccessManager } from "../hooks/resetPasswordSuccessManager";

function Header() {
  const { texts, locales } = useResetPasswordSuccessManager();

  return (
    <LoginHeading
      title={texts?.eventTitle || locales.header.title}
      description={texts?.description || locales.header.description}
    />
  );
}

export default Header;
