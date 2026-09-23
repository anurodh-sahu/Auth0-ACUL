import { IdentifierType } from "@auth0/auth0-acul-react/types";

import LoginHeading from "@/components/login-page/LoginHeading";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";

function Header() {
  const { texts, activeIdentifiers, locales } =
    useResetPasswordRequestManager();

  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  return (
    <LoginHeading
      title={texts?.title || locales.header.title}
      description={identifierDetails.description}
    />
  );
}

export default Header;
