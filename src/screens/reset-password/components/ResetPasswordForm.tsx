import { useForm } from "react-hook-form";

import type {
  ErrorItem,
  PasswordValidationResult,
} from "@auth0/auth0-acul-react/types";

import { ULThemeFormMessage } from "@/components/form";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import PillField from "@/components/login-page/PillField";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";

interface ResetPasswordFormData {
  new_password: string;
  confirm_password: string;
}

function ResetPasswordForm() {
  const {
    handleSubmitPassword,
    texts,
    locales,
    useErrors,
    usePasswordValidation,
  } = useResetPasswordManager();
  const { errors, hasError } = useErrors;

  const form = useForm<ResetPasswordFormData>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const passwordValue = watch("new_password");

  const {
    isValid: isPasswordValid,
    results: passwordResults,
  }: PasswordValidationResult = usePasswordValidation(passwordValue);

  const buttonText = texts?.buttonText || locales.form.buttonText;
  const buttonSubmittingText =
    texts?.buttonSubmitting || locales.form.buttonSubmitting;
  const passwordLabel =
    texts?.passwordPlaceholder || locales.form.fields.password.labelText;
  const confirmPasswordLabel =
    texts?.reEnterpasswordPlaceholder ||
    locales.form.fields.confirmPassword.labelText;
  const passwordSecurityText =
    texts?.passwordSecurityText || locales.form.passwordSecurity;

  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((error) => !error.field);
  const passwordSDKError = errors.byField("password")[0]?.message;

  const onSubmit = async (data: ResetPasswordFormData) => {
    await handleSubmitPassword(data.new_password, data.confirm_password);
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

        <FormField
          control={form.control}
          name="new_password"
          rules={{
            required: locales.form.fields.password.required,
            validate: (value) => {
              if (!value) return locales.form.fields.password.required;
              if (!isPasswordValid)
                return locales.form.fields.password.doesNotMeetRequirements;
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem className="mb-3">
              <PillField
                {...field}
                id="new-password"
                label={`${passwordLabel}*`}
                type="password"
                autoComplete="new-password"
                autoFocus
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage hasFormError={!!fieldState.error} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          rules={{
            required: locales.form.fields.confirmPassword.required,
          }}
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <PillField
                {...field}
                id="confirm-password"
                label={`${confirmPasswordLabel}*`}
                type="password"
                autoComplete="new-password"
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage
                sdkError={passwordSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        <ULThemePasswordValidator
          validationRules={passwordResults}
          passwordSecurityText={passwordSecurityText}
          show={!!passwordValue}
          className="mb-4 text-xs text-[#6D6E71]"
        />

        <LoginSubmitButton
          loading={isSubmitting}
          label={buttonText.toUpperCase()}
          loadingLabel={buttonSubmittingText.toUpperCase()}
        />
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
