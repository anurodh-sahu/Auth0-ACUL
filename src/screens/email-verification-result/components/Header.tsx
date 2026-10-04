import { ACUL_BRAND } from "@/brands/aculBrand";
import LoginHeading from "@/components/login-page/LoginHeading";
import { cn } from "@/lib/utils";

import { useEmailVerificationResultManager } from "../hooks/useEmailVerificationResultManager";

function Header() {
  const { title, description, isError } = useEmailVerificationResultManager();

  return (
    <>
      <LoginHeading
        title={title}
        titleClassName={isError ? "text-[#E7000B]" : undefined}
        className="login:text-center"
      />
      <p className={cn("text-center", ACUL_BRAND.descriptionClassName)}>
        {description}
      </p>
    </>
  );
}

export default Header;
