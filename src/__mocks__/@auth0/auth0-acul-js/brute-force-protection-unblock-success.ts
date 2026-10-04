export const defaultScreen = {
  name: "brute-force-protection-unblock-success",
  texts: {
    pageTitle: "Account Unblocked",
    title: "Account Unblocked",
    description: "Your account has been unblocked.",
  },
};

const BruteForceProtectionUnblockSuccess = jest.fn(() => ({
  screen: defaultScreen,
}));

export default BruteForceProtectionUnblockSuccess;
