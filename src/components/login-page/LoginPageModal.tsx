import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LoginPageModalProps {
  children: ReactNode;
  className?: string;
}

function LoginPageModal({ children, className }: LoginPageModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "box-border w-full rounded-[28px] bg-white px-6 py-8 shadow-[0_18px_40px_rgba(2,6,24,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default LoginPageModal;
