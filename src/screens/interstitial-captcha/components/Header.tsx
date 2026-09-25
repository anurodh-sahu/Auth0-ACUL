import { useInterstitialCaptchaManager } from "../hooks/useInterstitialCaptchaManager";

function Header() {
  const { texts, locales } = useInterstitialCaptchaManager();

  const title = texts?.title || locales.header.title;
  const description = texts?.description || locales.header.description;

  return (
    <div className="mb-3">
      <h1 className="text-center font-normal text-xl leading-7 tracking-normal text-[#020618] login:text-left">
        {title}
      </h1>
      {description ? (
        <p className="mt-1 text-center text-sm text-[#6D6E71] login:text-left">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default Header;
