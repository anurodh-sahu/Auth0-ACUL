export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn((_field: string) => []),
    byType: jest.fn((_kind: string) => []),
    byCode: jest.fn((_code: string) => []),
  },
  hasError: false,
  dismiss: jest.fn(),
}));
