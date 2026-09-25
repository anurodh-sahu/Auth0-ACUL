/**
 * Masks an email for display, e.g. gau******@m****.com
 */
export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const at = trimmed.indexOf("@");
  if (at <= 0) {
    return trimmed;
  }

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  const domainName = dot > 0 ? domain.slice(0, dot) : domain;
  const tld = dot > 0 ? domain.slice(dot) : "";

  const localVisible = local.slice(0, Math.min(3, local.length));
  const domainVisible = domainName.slice(0, Math.min(1, domainName.length));

  return `${localVisible}******@${domainVisible}****${tld}`;
}
