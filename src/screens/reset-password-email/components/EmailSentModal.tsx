import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/reset-password-email";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import { ACUL_BRAND } from "@/brands/aculBrand";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginHeading from "@/components/login-page/LoginHeading";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import { Form } from "@/components/ui/form";
import { translate } from "@/utils/helpers/localeTranslate";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";
import { maskEmail } from "../utils/maskEmail";

function EmailSentModal() {
  const { texts, data, handleResendEmail, locales } =
    useResetPasswordEmailManager();
  const { errors, hasError } = useErrors();

  const form = useForm({
    defaultValues: {},
  });

  const {
    formState: { isSubmitting },
  } = form;

  const title = locales.header.title;
  const sentTitle = texts?.emailSentText || locales.header.sentTitle;
  const rawEmail = data?.username || "";
  const displayEmail = rawEmail ? maskEmail(rawEmail) : "";
  const description =
    texts?.description ||
    translate(
      "header.description",
      { email: displayEmail || rawEmail },
      locales
    );

  const resendLabel = texts?.resendLinkText || locales.form.resend;
  const resendSubmitting =
    texts?.buttonSubmitting || locales.form.buttonSubmitting;

  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const onResend = async () => {
    await handleResendEmail();
  };

  return (
    <div className="flex flex-col">
      <LoginHeading title={title} description={description} />

      <p className={ACUL_BRAND.descriptionClassName}>{sentTitle}</p>

      {hasError && generalErrors.length > 0 ? (
        <div className="mt-3">
          <LoginErrorBanner
            message={
              generalErrors[0]?.message || locales.errors.errorOccurred
            }
          />
        </div>
      ) : null}

      <Form {...form}>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={form.handleSubmit(onResend)}
        >
          <LoginSubmitButton
            loading={isSubmitting}
            label={resendLabel.toUpperCase()}
            loadingLabel={resendSubmitting.toUpperCase()}
            showAccentDot={false}
          />
        </form>
      </Form>
    </div>
  );
}

export default EmailSentModal;
