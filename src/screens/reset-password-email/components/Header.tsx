import LoginHeading from "@/components/login-page/LoginHeading";
import { translate } from "@/utils/helpers/localeTranslate";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function Header() {
  const { texts, data, locales } = useResetPasswordEmailManager();

  const title = locales.header.title;
  const description =
    texts?.description ||
    translate(
      "header.description",
      { email: data?.username || "" },
      locales
    );

  return <LoginHeading title={title} description={description} />;
}

export default Header;
