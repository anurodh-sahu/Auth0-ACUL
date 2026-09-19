import { useState, type CSSProperties, type ReactNode } from "react";

import { useLoginPageAssets } from "@/hooks/useLoginPageAssets";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import LoginQuote from "./LoginQuote";

interface LoginPageShellProps {
  children: ReactNode;
  logoAlt?: string;
}

function FadeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "opacity-0 transition-opacity",
        loaded && "opacity-100",
        className
      )}
      onLoad={() => setLoaded(true)}
    />
  );
}

function LoginPageShell({
  children,
  logoAlt = "Brand Logo",
}: LoginPageShellProps) {
  const { backgroundImage, logo, desktopTree, mobileTree, quote, writer } =
    useLoginPageAssets();

  const fallbackLogo = extractTokenValue("--ul-theme-widget-logo-url");
  const logoSrc = logo || fallbackLogo;

  const shellStyle: CSSProperties | undefined = backgroundImage
    ? { backgroundImage: `url('${backgroundImage}')` }
    : undefined;

  return (
    <div
      className="flex min-h-screen flex-col bg-[#F3F4F6] bg-cover bg-center bg-no-repeat font-jost"
      style={shellStyle}
    >
      <main className="relative z-10 flex gap-4 login:gap-0 justify-between min-h-0 flex-1 flex-col p-6 login:px-12 login:py-8">
        <section className="flex flex-1 flex-col items-end gap-7 login:justify-between pt-0">
          <FadeImage
            src={desktopTree}
            alt=""
            className="hidden login:block inset-0 absolute w-full h-full object-cover -z-[1]"
          />

          <FadeImage
            src={logoSrc}
            alt={logoAlt}
            className="w-[85px] self-center login:w-[150px] login:self-end"
          />

          <div className="flex w-full min-w-0 max-w-full flex-1 flex-col items-center gap-7 login:flex-row login:items-end login:justify-end login:gap-10">
            <LoginQuote
              quote={quote}
              writer={writer}
              className="hidden login:flex login:max-w-[33%] shrink-0"
            />

            <div className="w-[calc(100%-60px)] ml-[60px] min-w-0 max-w-full login:w-80">
              {children}
            </div>
          </div>
        </section>

        <FadeImage
          src={mobileTree}
          alt=""
          className="block login:hidden w-full h-full object-cover"
        />
      </main>

      <LoginQuote
        quote={quote}
        writer={writer}
        className="login:hidden inset-x-0 bottom-0 m-0 w-full p-6"
      />
    </div>
  );
}

export default LoginPageShell;
