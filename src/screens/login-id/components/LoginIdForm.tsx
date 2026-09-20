import { useForm } from "react-hook-form";

import {
  useErrors,
  useLoginIdentifiers,
  usePasskeyAutofill,
} from "@auth0/auth0-acul-react/login-id";
import type {
  ErrorItem,
  IdentifierType,
  LoginOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";
import LoginHeading from "@/components/login-page/LoginHeading";
import LoginSubmitButton from "@/components/login-page/LoginSubmitButton";
import PillField, { PillFieldLink } from "@/components/login-page/PillField";
import { Form, FormField, FormItem } from "@/components/ui/form";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import {
  FORGOT_LOGIN_ID_URL,
  FORGOT_PASSWORD_FALLBACK_URL,
  LOGIN_PAGE_COPY,
} from "@/constants/loginPage";
import { useCaptcha } from "@/hooks/useCaptcha";
import {
  isPhoneNumberSupported,
  transformAuth0CountryCode,
} from "@/utils/helpers/countryUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function LoginIdForm() {
  const {
    texts,
    locales,
    captcha,
    countryCode,
    countryPrefix,
    resetPasswordLink,
    isCaptchaAvailable,
    isPasskeyEnabled,
    showPasskeyAutofill,
    handleLoginId,
    handlePickCountryCode,
  } = useLoginIdManager();

  const activeIdentifiers = useLoginIdentifiers();

  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales?.loginIdForm?.captchaLabel;
  const forgotPasswordLinkText = LOGIN_PAGE_COPY.forgotPassword;
  const forgotPasswordHref = resetPasswordLink || FORGOT_PASSWORD_FALLBACK_URL;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  if (isPasskeyEnabled && showPasskeyAutofill) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePasskeyAutofill();
  }

  const { errors, hasError } = useErrors();

  const usernameSDKError = errors.byField("username")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const shouldShowCountryPicker = isPhoneNumberSupported(
    activeIdentifiers || []
  );

  const onSubmit = async (data: LoginOptions) => {
    await handleLoginId({
      username: data.username,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <LoginHeading
            title={texts?.title || locales.heading.title}
            description={texts?.description || locales.heading.description}
          />

          {hasError && generalErrors.length > 0 && (
            <LoginErrorBanner
              message={
                generalErrors[0]?.message || locales?.errors?.errorOccurred
              }
            />
          )}

          {shouldShowCountryPicker && (
            <div className="mb-4">
              <ULThemeCountryCodePicker
                selectedCountry={transformAuth0CountryCode(
                  countryCode,
                  countryPrefix
                )}
                onClick={handlePickCountryCode}
                fullWidth
                placeholder={locales?.loginIdForm?.selectCountryPlaceholder}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="username"
            rules={{
              required: locales?.errors?.identifierRequired,
            }}
            render={({ field, fieldState }) => (
              <FormItem className="mb-3">
                <PillField
                  {...field}
                  id="login-id"
                  label={LOGIN_PAGE_COPY.loginIdLabel}
                  type={identifierDetails.type}
                  autoComplete={identifierDetails.autoComplete}
                  autoFocus
                  error={!!fieldState.error || !!usernameSDKError}
                  trailing={
                    <PillFieldLink href={FORGOT_LOGIN_ID_URL}>
                      {LOGIN_PAGE_COPY.forgotLoginId}
                    </PillFieldLink>
                  }
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
                required: locales?.errors?.captchaCompletionRequired,
              }}
            />
          )}
        </div>

        <LoginSubmitButton loading={isSubmitting} />

        {forgotPasswordHref && (
          <div className="mt-3 text-center login:text-left">
            <PillFieldLink href={forgotPasswordHref}>
              {forgotPasswordLinkText}
            </PillFieldLink>
          </div>
        )}
      </form>
    </Form>
  );
}

export default LoginIdForm;
