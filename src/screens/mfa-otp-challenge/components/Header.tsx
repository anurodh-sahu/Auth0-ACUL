import { useMfaOtpChallengeManager } from "../hooks/useMfaOtpChallengeManager";

function Header() {
  const { texts, locales } = useMfaOtpChallengeManager();

  const title = texts?.title || locales.header.title;

  return (
    <h1 className="mb-3 text-center font-normal text-xl leading-7 tracking-normal text-[#020618] login:text-left">
      {title}
    </h1>
  );
}

export default Header;
