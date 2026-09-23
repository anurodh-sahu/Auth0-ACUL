import LoginHeading from "@/components/login-page/LoginHeading";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";

function Header() {
  const { texts, locales } = useResetPasswordManager();

  return (
    <LoginHeading
      title={texts?.title || locales.header.title}
      description={texts?.description || locales.header.description}
    />
  );
}

export default Header;
