export const unblockAccount = jest.fn();

export const defaultScreen = {
  name: "brute-force-protection-unblock",
  texts: {
    pageTitle: "Unblock Account",
    title: "Unblock Your Account",
    description: "Click the button below to unblock your account.",
    buttonText: "Unblock my account",
  },
};

const BruteForceProtectionUnblock = jest.fn(() => ({
  screen: defaultScreen,
  unblockAccount,
}));

export default BruteForceProtectionUnblock;
