export const defaultScreen = {
  name: "brute-force-protection-unblock-failure",
  texts: {
    pageTitle: "Unblock Failed",
    title: "Something Went Wrong",
    description: "The unblock link has expired.",
  },
  data: { errorType: "expired" },
};

const BruteForceProtectionUnblockFailure = jest.fn(() => ({
  screen: defaultScreen,
}));

export default BruteForceProtectionUnblockFailure;
