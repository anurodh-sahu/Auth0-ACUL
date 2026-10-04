import { ACUL_BRAND } from "@/brands/aculBrand";
import LoginHeading from "@/components/login-page/LoginHeading";
import { cn } from "@/lib/utils";

import { useBruteForceProtectionUnblockSuccessManager } from "../hooks/useBruteForceProtectionUnblockSuccessManager";

function Header() {
  const { texts, locales } = useBruteForceProtectionUnblockSuccessManager();

  return (
    <>
      <LoginHeading
        title={texts.title || locales.header.title}
        className="login:text-center"
      />
      <p className={cn("text-center", ACUL_BRAND.descriptionClassName)}>
        {texts.description || locales.header.description}
      </p>
    </>
  );
}

export default Header;
