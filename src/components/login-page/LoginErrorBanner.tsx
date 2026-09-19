interface LoginErrorBannerProps {
  message: string;
}

function LoginErrorBanner({ message }: LoginErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="mb-3 whitespace-pre-wrap rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

export default LoginErrorBanner;
