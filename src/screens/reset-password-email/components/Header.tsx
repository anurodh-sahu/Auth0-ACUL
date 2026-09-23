import { translate } from "@/utils/helpers/localeTranslate";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function Header() {
  const { texts, data, locales } = useResetPasswordEmailManager();

  const title = texts?.title || locales.header.title;
  const description =
    texts?.description ||
    translate(
      "header.description",
      { email: data?.username || "" },
      locales
    );

  return (
    <h1 className="mb-3 text-center font-normal text-xl leading-7 tracking-normal text-[#020618] login:text-left">
      {title}
      {description ? (
        <>
          <br />
          <span className="text-base leading-6 text-[#6D6E71]">
            {description}
          </span>
        </>
      ) : null}
    </h1>
  );
}

export default Header;
