import { useState, type CSSProperties, type ReactNode } from "react";

import { ACUL_BRAND } from "@/brands/aculBrand";
import { useLoginPageAssets } from "@/hooks/useLoginPageAssets";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import LoginPageModal from "./LoginPageModal";
import LoginQuote from "./LoginQuote";

interface LoginPageShellProps {
  children: ReactNode;
  logoAlt?: string;
  variant?: "form" | "modal";
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
  variant = "form",
}: LoginPageShellProps) {
  const { backgroundImage, desktopTree, mobileTree, quote, writer } =
    useLoginPageAssets();

  const logoSrc = extractTokenValue("--ul-theme-widget-logo-url");
  const centerForm = ACUL_BRAND.centerForm;
  const showQuote = ACUL_BRAND.showQuote;
  const isModal = variant === "modal";
  const content = isModal ? (
    <LoginPageModal>{children}</LoginPageModal>
  ) : (
    children
  );

  const shellStyle: CSSProperties | undefined = backgroundImage
    ? { backgroundImage: `url('${backgroundImage}')` }
    : undefined;

  // client2: true center layout, no quotes, no side/bottom chrome from classic page.
  if (centerForm) {
    return (
      <div
        className="flex min-h-screen flex-col bg-[#F3F4F6] bg-cover bg-center bg-no-repeat font-jost"
        style={shellStyle}
      >
        <main className="relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center gap-8 p-6">
          {/* <FadeImage
            src={desktopTree}
            alt=""
            className="pointer-events-none absolute inset-0 -z-[1] h-full w-full object-cover opacity-40"
          /> */}

          {/* <FadeImage
            src={logoSrc}
            alt={logoAlt}
            className="relative z-10 w-[120px]"
          /> */}

          <div
            className={cn(
              "relative z-10 box-border w-full",
              isModal ? "max-w-md" : "max-w-[calc(20rem+60px)] pl-[60px]"
            )}
          >
            {content}
          </div>
        </main>
      </div>
    );
  }

  // client1: classic right-aligned layout with quotes.
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
            className="hidden login:block inset-0 absolute w-full h-full object-contain object-left-bottom -z-[1]"
          />

          <FadeImage
            src={logoSrc}
            alt={logoAlt}
            className="w-[85px] self-center login:w-[150px] login:self-end"
          />

          <div className="flex w-full min-w-0 max-w-full flex-1 flex-col items-center gap-7 login:flex-row login:items-end login:justify-end login:gap-10">
            {showQuote ? (
              <LoginQuote
                quote={quote}
                writer={writer}
                className="hidden login:flex login:max-w-[33%] shrink-0"
              />
            ) : null}

            <div
              className={cn(
                "min-w-0 max-w-full",
                isModal
                  ? "w-full login:w-[22rem]"
                  : "ml-[60px] w-[calc(100%-60px)] login:w-80"
              )}
            >
              {content}
            </div>
          </div>
        </section>

        <FadeImage
          src={mobileTree}
          alt=""
          className="block login:hidden w-full h-full object-cover"
        />
      </main>

      {showQuote ? (
        <LoginQuote
          quote={quote}
          writer={writer}
          className="login:hidden inset-x-0 bottom-0 m-0 w-full p-6"
        />
      ) : null}
    </div>
  );
}

export default LoginPageShell;
