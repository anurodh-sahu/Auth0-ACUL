import { render, screen } from "@testing-library/react";

import LoginPageShell from "../LoginPageShell";

jest.mock("@/hooks/useLoginPageAssets", () => ({
  useLoginPageAssets: () => ({
    backgroundImage: "",
    desktopTree: "",
    mobileTree: "",
    quote: "",
    writer: "",
  }),
}));

describe("LoginPageShell logo", () => {
  const originalContext = window.universal_login_context;

  afterEach(() => {
    window.universal_login_context = originalContext;
  });

  it("uses the Auth0 Application Logo (client.logo_uri)", () => {
    window.universal_login_context = {
      ...originalContext,
      client: { logo_uri: "https://cdn.example.com/app-logo.png" },
    };

    render(<LoginPageShell logoAlt="Brand Logo">content</LoginPageShell>);

    expect(screen.getByAltText("Brand Logo")).toHaveAttribute(
      "src",
      "https://cdn.example.com/app-logo.png"
    );
  });

  it("renders no logo when the application has none", () => {
    window.universal_login_context = { ...originalContext, client: {} };

    render(<LoginPageShell logoAlt="Brand Logo">content</LoginPageShell>);

    expect(screen.queryByAltText("Brand Logo")).not.toBeInTheDocument();
  });
});
