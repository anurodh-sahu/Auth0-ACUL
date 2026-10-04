import { useMfaEmailChallengeManager } from "../hooks/useMfaEmailChallengeManager";

function Header() {
  const { texts, data, locales } = useMfaEmailChallengeManager();

  const title = texts?.title || locales.header.title;
  const email = data?.email || "";
  const description = texts?.description || locales.header.description;

  return (
    <h1 className="mb-3 text-center font-normal text-xl leading-7 tracking-normal text-[#020618] login:text-left">
      {title}
      {description || email ? (
        <>
          <br />
          <span className="text-base leading-6 text-[#6D6E71]">
            {description}
            {email ? ` ${email}` : ""}
          </span>
        </>
      ) : null}
    </h1>
  );
}

export default Header;
