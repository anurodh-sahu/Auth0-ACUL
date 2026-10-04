import { ACUL_BRAND } from "@/brands/aculBrand";
import LoginHeading from "@/components/login-page/LoginHeading";
import { cn } from "@/lib/utils";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Header() {
  const { texts, locales } = useResetPasswordErrorManager();

  return (
    <>
      <LoginHeading
        title={texts?.eventTitle || locales.header.title}
        titleClassName="text-[#E7000B]"
        className="login:text-center"
      />
      <p className={cn("text-center", ACUL_BRAND.descriptionClassName)}>
        {texts?.description || locales.header.description}
      </p>
    </>
  );
}

export default Header;
