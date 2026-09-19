import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PillFieldLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="shrink-0 whitespace-nowrap text-xs text-[#6D6E71]"
    >
      {children}
    </a>
  );
}

interface PillFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  trailing?: ReactNode;
  error?: boolean;
}

function PillField({
  id,
  label,
  trailing,
  error,
  className,
  ...inputProps
}: PillFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block font-medium text-xs leading-4 tracking-normal text-[#020618]"
      >
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border bg-white/95 px-4 py-3",
          error ? "border-red-300" : "border-[#D1D5DC]"
        )}
      >
        <input
          id={id}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none",
            className
          )}
          {...inputProps}
        />
        {trailing}
      </div>
    </div>
  );
}

export default PillField;
