import LoginHeading from "@/components/login-page/LoginHeading";

import { useResetPasswordSuccessManager } from "../hooks/resetPasswordSuccessManager";

function Header() {
  const { texts, locales } = useResetPasswordSuccessManager();

  return (
    <LoginHeading
      title={texts?.eventTitle || locales.header.title}
      description={texts?.description || locales.header.description}
      descriptionClassName="text-base leading-6 text-[#00C951]"
    />
  );
}

export default Header;
