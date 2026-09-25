import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Header() {
  const { texts, data, locales } = useMfaSmsChallengeManager();

  const title = texts?.title || locales.header.title;
  const phoneNumber = data?.phoneNumber || "";
  const description = texts?.description || locales.header.description;

  return (
    <h1 className="mb-3 text-center font-normal text-xl leading-7 tracking-normal text-[#020618] login:text-left">
      {title}
      {description || phoneNumber ? (
        <>
          <br />
          <span className="text-base leading-6 text-[#6D6E71]">
            {description}
            {phoneNumber ? ` ${phoneNumber}` : ""}
          </span>
        </>
      ) : null}
    </h1>
  );
}

export default Header;
