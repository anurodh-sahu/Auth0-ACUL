import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Header() {
  const { texts, data, locales } = useMfaSmsChallengeManager();

  // Logo is rendered by LoginPageShell (same as login); only title/copy here.
  const title = texts?.title || locales.header.title;
  const phoneNumber = data?.phoneNumber || "";
  const description = texts?.description || locales.header.description;

  return (
    <div className="mb-4 w-full text-left">
      <ULThemeTitle className="!text-left">{title}</ULThemeTitle>
      <ULThemeSubtitle className="!text-left mb-2">
        {description} {phoneNumber}
      </ULThemeSubtitle>
    </div>
  );
}

export default Header;
