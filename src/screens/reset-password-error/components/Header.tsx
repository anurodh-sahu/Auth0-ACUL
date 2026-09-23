import LoginHeading from "@/components/login-page/LoginHeading";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Header() {
  const { texts, locales } = useResetPasswordErrorManager();

  return (
    <LoginHeading
      title={texts?.eventTitle || locales.header.title}
      description={texts?.description || locales.header.description}
    />
  );
}

export default Header;
