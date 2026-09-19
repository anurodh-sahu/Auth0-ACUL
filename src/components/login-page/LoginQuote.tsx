import { cn } from "@/lib/utils";

interface LoginQuoteProps {
  quote: string;
  writer?: string;
  className?: string;
}

function LoginQuote({ quote, writer, className }: LoginQuoteProps) {
  if (!quote) {
    return null;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="font-normal text-xs leading-4 tracking-[0.2em] text-foreground">
        {quote}
      </p>
      {writer ? (
        <p className="font-light text-[10px] leading-4 tracking-[0.15em] text-foreground/70 mt-1">
          {writer}
        </p>
      ) : null}
    </div>
  );
}

export default LoginQuote;
