import { LOGIN_PAGE_COPY } from "@/constants/loginPage";

interface LoginSubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
}

function LoginSubmitButton({
  loading,
  disabled,
  label = LOGIN_PAGE_COPY.loginButton,
  loadingLabel = LOGIN_PAGE_COPY.loggingInButton,
}: LoginSubmitButtonProps) {
  return (
    <div className="relative flex w-full shrink-0 items-center">
      <span
        className="absolute left-0 top-1/2 h-10 w-10 -ml-[60px] -translate-y-1/2 rounded-full bg-[#FB2C36]"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={disabled || loading}
        className="flex h-[38px] w-full cursor-pointer items-center justify-center rounded-full bg-[#6D6E71] font-normal text-base leading-6 tracking-normal text-white outline outline-2 outline-[#6D6E71] outline-offset-[2px] disabled:cursor-not-allowed disabled:opacity-80"
      >
        <span>{loading ? loadingLabel : label}</span>
      </button>
    </div>
  );
}

export default LoginSubmitButton;
