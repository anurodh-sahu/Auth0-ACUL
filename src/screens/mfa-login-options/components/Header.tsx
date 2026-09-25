import { ChevronLeft } from "lucide-react";

import LoginHeading from "@/components/login-page/LoginHeading";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function Header() {
  const { texts, locales, handleReturnToPrevious } =
    useMfaLoginOptionsManager();

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={handleReturnToPrevious}
        className="mb-3 inline-flex items-center gap-1 text-sm text-[#6D6E71] hover:text-[#020618]"
      >
        <ChevronLeft size={20} />
        <span>{texts?.backText || locales.header.back}</span>
      </button>
      <LoginHeading
        title={texts?.title || locales.header.title}
        description={texts?.description || locales.header.description}
      />
    </div>
  );
}

export default Header;
