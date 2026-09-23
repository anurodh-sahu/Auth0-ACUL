import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/reset-password-email";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import { Form } from "@/components/ui/form";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function ResendEmail() {
  const { texts, handleResendEmail, locales } =
    useResetPasswordEmailManager();
  const { errors, hasError } = useErrors();

  const form = useForm({
    defaultValues: {},
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.resendLinkText || locales.form.button;
  const buttonSubmittingText =
    texts?.buttonSubmitting || locales.form.buttonSubmitting;

  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const onSubmit = async () => {
    await handleResendEmail();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {hasError && generalErrors.length > 0 && (
          <LoginErrorBanner
            message={
              generalErrors[0]?.message || locales.errors.errorOccurred
            }
          />
        )}

        <LoginSubmitButton
          loading={isSubmitting}
          label={buttonText.toUpperCase()}
          loadingLabel={buttonSubmittingText.toUpperCase()}
        />
      </form>
    </Form>
  );
}

export default ResendEmail;
