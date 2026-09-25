import React from "react";

import type {
  ErrorItem,
  MfaLoginFactorType,
} from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import {
  MFAGuardianIcon,
  MFAOTPIcon,
  MFAPhoneIcon,
  MFASmsIcon,
  MFAWebAuthnRoamingIcon,
} from "@/assets/icons";
import { MFADuoIcon } from "@/assets/icons/MFADuoIcon";
import { MFAEmailIcon } from "@/assets/icons/MFAEmailIcon";
import { MFARecoveryCodeIcon } from "@/assets/icons/MFARecoveryCodeIcon";
import { MFAWebAuthnPlatformIcon } from "@/assets/icons/MFAWebAuthnPlatformIcon";
import LoginErrorBanner from "@/components/login-page/LoginErrorBanner";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function MFALoginOptionsList() {
  const { texts, handleEnroll, enrolledFactors, locales, useErrors } =
    useMfaLoginOptionsManager();
  const { errors, hasError, dismiss } = useErrors;

  const generalErrors: ErrorItem[] =
    errors.byType("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];
  const enrollOptions = enrolledFactors as MfaLoginFactorType[];

  const displayNameMap: Record<MfaLoginFactorType, string> = {
    sms: texts?.authenticatorNamesSMS ?? locales.MFALoginOptions.sms,
    voice: texts?.authenticatorNamesVoice ?? locales.MFALoginOptions.voice,
    phone: texts?.authenticatorNamesPhone ?? locales.MFALoginOptions.phone,
    "push-notification":
      texts?.authenticatorNamesPushNotification ??
      locales.MFALoginOptions.pushNotification,
    otp: texts?.authenticatorNamesOTP ?? locales.MFALoginOptions.otp,
    "webauthn-roaming":
      texts?.authenticatorNamesWebauthnRoaming ??
      locales.MFALoginOptions.webauthnRoaming,
    email: texts?.authenticatorNamesEmail ?? locales.MFALoginOptions.email,
    "recovery-code":
      texts?.authenticatorNamesRecoveryCode ??
      locales.MFALoginOptions.recoveryCode,
    "webauthn-platform":
      texts?.authenticatorNamesWebauthnPlatform ??
      locales.MFALoginOptions.webauthnPlatform,
    duo: texts?.authenticatorNamesDUO ?? locales.MFALoginOptions.duo,
  };

  const iconMap: Record<MfaLoginFactorType, React.ReactNode> = {
    sms: <MFASmsIcon />,
    voice: <MFAPhoneIcon />,
    phone: <MFAPhoneIcon />,
    "push-notification": <MFAGuardianIcon />,
    otp: <MFAOTPIcon />,
    "webauthn-roaming": <MFAWebAuthnRoamingIcon />,
    email: <MFAEmailIcon />,
    "recovery-code": <MFARecoveryCodeIcon />,
    "webauthn-platform": <MFAWebAuthnPlatformIcon />,
    duo: <MFADuoIcon />,
  };

  function getDisplayName(factor: MfaLoginFactorType) {
    return displayNameMap[factor] || factor;
  }

  function getIcon(factor: MfaLoginFactorType) {
    return iconMap[factor];
  }

  return (
    <div className="flex flex-col gap-3">
      {hasError && generalErrors.length > 0
        ? generalErrors.map((error) => (
            <button
              key={error.id}
              type="button"
              className="text-left"
              onClick={() => dismiss(error.id)}
            >
              <LoginErrorBanner message={error.message} />
            </button>
          ))
        : null}

      {enrollOptions.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleEnroll({ action: option })}
          className="flex w-full items-center gap-3 rounded-full bg-[#F3F4F6] px-4 py-3 text-left text-base leading-6 text-[#020618] outline-2 outline-transparent outline-offset-2 hover:bg-[#E5E7EB] focus-visible:outline-[#6D6E71]"
        >
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            {getIcon(option)}
          </span>
          <span className="min-w-0 flex-1 whitespace-normal">
            {getDisplayName(option)}
          </span>
          <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-[#6D6E71]" />
        </button>
      ))}
    </div>
  );
}

export default MFALoginOptionsList;
