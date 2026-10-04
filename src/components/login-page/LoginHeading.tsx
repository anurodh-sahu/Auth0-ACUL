import { ACUL_BRAND } from "@/brands/aculBrand";
import { cn } from "@/lib/utils";

interface LoginHeadingProps {
  title: string;
  description?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  className?: string;
}

function LoginHeading({ title, titleClassName, className }: LoginHeadingProps) {
  return (
    <div
      className={cn(
        "mb-3",
        ACUL_BRAND.centerForm ? "text-center" : "text-center login:text-left",
        className
      )}
    >
      {ACUL_BRAND.badge ? (
        <p className={ACUL_BRAND.badgeClassName}>{ACUL_BRAND.badge}</p>
      ) : null}
      <h1 className={cn(ACUL_BRAND.titleClassName, titleClassName)}>
        {title}
        {/* {description ? (
          <>
            <br />
            <span
              className={
                descriptionClassName || ACUL_BRAND.descriptionClassName
              }
            >
              {description}
            </span>
          </>
        ) : null} */}
      </h1>
    </div>
  );
}

export default LoginHeading;
