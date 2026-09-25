import { useForm } from "react-hook-form";

import type {
  ErrorItem,
  ResetPasswordRequestOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFormMessage } from "@/components/form";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import PillField from "@/components/login-page/PillField";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";

function ResetPasswordRequestForm() {
  const {
    handleResetPasswordRequest,
    texts,
    isCaptchaAvailable,
    captcha,
    activeIdentifiers,
    useErrors,
    locales,
    inputfield,
  } = useResetPasswordRequestManager();
  const { errors, hasError } = useErrors;

  const form = useForm<ResetPasswordRequestOptions>({
    defaultValues: {
      username: String(inputfield),
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.button;
  const buttonSubmittingText =
    texts?.buttonSubmitting || locales.form.submittingState;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const identifierDetails = getIdentifierDetails(activeIdentifiers, texts);

  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((error) => !error.field);
  const usernameSDKError = errors.byField("username")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const onSubmit = async (formData: ResetPasswordRequestOptions) => {
    await handleResetPasswordRequest(formData.username, captchaValue);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {hasError && generalErrors.length > 0 && (
          <LoginErrorBanner
            message={generalErrors[0]?.message || locales.errors.errorOccurred}
          />
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem className="mb-3">
              <PillField
                {...field}
                id="username"
                label={identifierDetails.label}
                type={identifierDetails.type}
                autoComplete={identifierDetails.autoComplete}
                autoFocus
                error={!!fieldState.error || !!usernameSDKError}
              />
              <ULThemeFormMessage
                sdkError={usernameSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            sdkError={captchaSDKError}
            rules={{
              required: locales.form.fields.captcha.required,
            }}
            className="mb-4"
          />
        )}

        <LoginSubmitButton
          loading={isSubmitting}
          label={buttonText.toUpperCase()}
          loadingLabel={`${buttonSubmittingText}...`.toUpperCase()}
        />
      </form>
    </Form>
  );
}

export default ResetPasswordRequestForm;
