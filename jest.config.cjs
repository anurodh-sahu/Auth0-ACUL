module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@auth0/auth0-acul-react/reset-password$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/reset-password.ts",
    "^@auth0/auth0-acul-react/reset-password-email$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/reset-password-email.ts",
    "^@auth0/auth0-acul-react/reset-password-error$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/reset-password-error.ts",
    "^@auth0/auth0-acul-react/reset-password-request$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/reset-password-request.ts",
    "^@auth0/auth0-acul-react/reset-password-success$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/reset-password-success.ts",
    "^@auth0/auth0-acul-react/mfa-login-options$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/mfa-login-options.ts",
    "^@auth0/auth0-acul-react/interstitial-captcha$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/interstitial-captcha.ts",
    "^@auth0/auth0-acul-react/email-verification-result$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/email-verification-result.ts",
    "^@auth0/auth0-acul-react/mfa-email-challenge$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/mfa-email-challenge.ts",
    "^@auth0/auth0-acul-react/brute-force-protection-unblock$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-react/brute-force-protection-unblock.ts",
    "^@auth0/auth0-acul-js/brute-force-protection-unblock$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock.ts",
    "^@auth0/auth0-acul-js/brute-force-protection-unblock-success$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock-success.ts",
    "^@auth0/auth0-acul-js/brute-force-protection-unblock-failure$":
      "<rootDir>/src/__mocks__/@auth0/auth0-acul-js/brute-force-protection-unblock-failure.ts",
  },
  // Allow transforming ESM modules from node_modules.
  transformIgnorePatterns: [
    "/node_modules/(?!(@auth0/auth0-acul-react|friendly-challenge)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
