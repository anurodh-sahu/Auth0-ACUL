import { useForm } from "react-hook-form";

import type { ContinueOptions } from "@auth0/auth0-acul-js/mfa-otp-challenge";
import { useErrors } from "@auth0/auth0-acul-react/mfa-otp-challenge";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import PillField from "@/components/login-page/PillField";
import { Form, FormField, FormItem } from "@/components/ui/form";

import { useMfaOtpChallengeManager } from "../hooks/useMfaOtpChallengeManager";

function MfaOtpChallengeForm() {
  const { handleContinue, data, texts, locales } = useMfaOtpChallengeManager();
  const { errors, hasError } = useErrors();

  const form = useForm<ContinueOptions>({
    defaultValues: {
      code: "",
      rememberDevice: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.button;
  const buttonSubmittingText =
    texts?.buttonSubmitting || locales.form.buttonSubmitting;
  const codeLabelText = texts?.placeholder || locales.form.fields.code.label;
  const rememberDeviceText =
    texts?.rememberMeText || locales.form.rememberDevice;

  const codeSDKError = errors.byField("code")[0]?.message;
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const onSubmit = async (formData: ContinueOptions) => {
    await handleContinue(
      String(formData.code || ""),
      !!formData.rememberDevice
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          {hasError && generalErrors.length > 0 && (
            <LoginErrorBanner
              message={
                generalErrors[0]?.message ||
                "An error occurred. Please try again."
              }
            />
          )}

          <FormField
            control={form.control}
            name="code"
            rules={{
              required: locales.form.fields.code.required,
            }}
            render={({ field, fieldState }) => (
              <FormItem className="mb-3">
                <PillField
                  {...field}
                  id="otp-code"
                  value={String(field.value ?? "")}
                  label={codeLabelText}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  error={!!fieldState.error || !!codeSDKError}
                />
                <ULThemeFormMessage
                  sdkError={codeSDKError}
                  hasFormError={!!fieldState.error}
                />
              </FormItem>
            )}
          />

          {data?.showRememberDevice && (
            <FormField
              control={form.control}
              name="rememberDevice"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#020618]">
                    <input
                      id="rememberDevice"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D1D5DC]"
                      checked={!!field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                    />
                    {rememberDeviceText}
                  </label>
                </FormItem>
              )}
            />
          )}
        </div>

        <LoginSubmitButton
          loading={isSubmitting}
          label={buttonText.toUpperCase()}
          loadingLabel={buttonSubmittingText.toUpperCase()}
        />
      </form>
    </Form>
  );
}

export default MfaOtpChallengeForm;
