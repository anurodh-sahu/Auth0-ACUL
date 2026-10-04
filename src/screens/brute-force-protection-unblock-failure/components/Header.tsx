import { ACUL_BRAND } from "@/brands/aculBrand";
import LoginHeading from "@/components/login-page/LoginHeading";
import { cn } from "@/lib/utils";

import { useBruteForceProtectionUnblockFailureManager } from "../hooks/useBruteForceProtectionUnblockFailureManager";

function Header() {
  const { texts, locales } = useBruteForceProtectionUnblockFailureManager();

  return (
    <>
      <LoginHeading
        title={texts.title || locales.header.title}
        titleClassName="text-[#E7000B]"
        className="login:text-center"
      />
      <p className={cn("text-center", ACUL_BRAND.descriptionClassName)}>
        {texts.description || locales.header.description}
      </p>
    </>
  );
}

export default Header;
