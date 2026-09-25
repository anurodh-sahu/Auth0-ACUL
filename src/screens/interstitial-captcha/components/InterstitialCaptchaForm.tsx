import { useForm } from "react-hook-form";

import type { SubmitCaptchaOptions } from "@auth0/auth0-acul-js/interstitial-captcha";
import { useErrors } from "@auth0/auth0-acul-react/interstitial-captcha";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import { Form } from "@/components/ui/form";
import { useCaptcha } from "@/hooks/useCaptcha";

import { useInterstitialCaptchaManager } from "../hooks/useInterstitialCaptchaManager";

function InterstitialCaptchaForm() {
  const {
    handleSubmitCaptcha,
    texts,
    captcha,
    isCaptchaAvailable,
    locales,
  } = useInterstitialCaptchaManager();
  const { errors, hasError } = useErrors();

  const form = useForm<SubmitCaptchaOptions>({
    defaultValues: {
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.button;
  const buttonSubmittingText =
    texts?.buttonSubmitting || locales.form.buttonSubmitting;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales.form.fields.captcha.label;

  const captchaSDKError = errors.byField("captcha")[0]?.message;
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const { captchaConfig, captchaProps, captchaValue, isCaptchaSolved } =
    useCaptcha(captcha || undefined, captchaLabel);

  const onSubmit = async () => {
    await handleSubmitCaptcha(captchaValue);
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
                generalErrors[0]?.message || locales.errors.errorOccurred
              }
            />
          )}

          {isCaptchaAvailable && captchaConfig ? (
            <Captcha
              control={form.control}
              name="captcha"
              captcha={captchaConfig}
              {...captchaProps}
              sdkError={captchaSDKError}
              rules={{
                required: locales.form.fields.captcha.required,
                validate: () =>
                  isCaptchaSolved || locales.form.fields.captcha.required,
              }}
              className="mb-4"
            />
          ) : null}
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

export default InterstitialCaptchaForm;
