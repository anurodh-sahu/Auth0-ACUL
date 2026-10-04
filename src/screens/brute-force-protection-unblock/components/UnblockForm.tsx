import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/brute-force-protection-unblock";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import { Form } from "@/components/ui/form";

import { useBruteForceProtectionUnblockManager } from "../hooks/useBruteForceProtectionUnblockManager";

function UnblockForm() {
  const { handleUnblock, texts, locales } =
    useBruteForceProtectionUnblockManager();
  const { errors, hasError } = useErrors();

  const form = useForm({ defaultValues: {} });
  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts.buttonText || locales.form.button;
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  return (
    <Form {...form}>
      <form
        className="mt-4 flex flex-col gap-3"
        onSubmit={form.handleSubmit(handleUnblock)}
      >
        {hasError && generalErrors.length > 0 ? (
          <LoginErrorBanner
            message={generalErrors[0]?.message || locales.errors.errorOccurred}
          />
        ) : null}
        <LoginSubmitButton
          loading={isSubmitting}
          label={buttonText.toUpperCase()}
          loadingLabel={locales.form.buttonSubmitting.toUpperCase()}
          showAccentDot={false}
        />
      </form>
    </Form>
  );
}

export default UnblockForm;
