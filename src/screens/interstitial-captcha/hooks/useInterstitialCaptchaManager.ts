import type {
  InterstitialCaptchaMembers,
  SubmitCaptchaOptions,
} from "@auth0/auth0-acul-js/interstitial-captcha";
import type { ScreenMembers } from "@auth0/auth0-acul-js/types";
import {
  useInterstitialCaptcha,
  useScreen,
} from "@auth0/auth0-acul-react/interstitial-captcha";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useInterstitialCaptchaManager = () => {
  const interstitialCaptcha: InterstitialCaptchaMembers =
    useInterstitialCaptcha();
  const screen: ScreenMembers = useScreen();

  const { texts, captcha, isCaptchaAvailable } = screen;

  const handleSubmitCaptcha = async (captchaValue?: string): Promise<void> => {
    const options: SubmitCaptchaOptions = {
      captcha: captchaValue?.trim() || "",
    };

    await executeSafely(
      `Submit interstitial captcha with options: ${JSON.stringify({
        captcha: "[REDACTED]",
      })}`,
      () => interstitialCaptcha.submitCaptcha(options)
    );
  };

  return {
    interstitialCaptcha,
    handleSubmitCaptcha,
    texts: (texts || {}) as Record<string, string>,
    captcha: captcha || null,
    isCaptchaAvailable: isCaptchaAvailable === true,
    locales,
  };
};
