/**
 * ACUL brand loader — single fixed head_tag entrypoint.
 *
 * Brand resolution order:
 * 1. client.metadata.acul_brand  (requires context_configuration entry)
 * 2. BRAND_BY_CLIENT_ID fallback map
 * 3. default "client1"
 *
 * Upload to: https://acul.innodeed.com/assets/acul-loader.js
 */
(function loadAculBrand() {
  // Fallback when metadata is missing (some screens / degraded context).
  const BRAND_BY_CLIENT_ID = {
    // Ambit Dev — red / centered
    UKhlpX1TCscOa0wCEwxSvIjR90eR8XqP: "client2",
    // Ambit — gray LOGIN (classic right layout)
    rucj8GcPVfaX1nxJEKDqUupxwbt9JzQM: "client1",
  };

  const ALLOWED_BRANDS = { client1: true, client2: true };
  const CDN_BASE = "https://acul.innodeed.com/assets";
  const CACHE_BUST = "v=20260925e";
  const MAX_WAIT_MS = 5000;
  const startedAt = Date.now();

  function normalizeBrand(value) {
    if (!value || typeof value !== "string") return null;
    const brand = value.trim().toLowerCase();
    return ALLOWED_BRANDS[brand] ? brand : null;
  }

  function resolveBrand() {
    const client =
      window.universal_login_context && window.universal_login_context.client;
    const clientId = client && client.id;
    const fromMetadata = normalizeBrand(
      client && client.metadata && client.metadata.acul_brand
    );
    const fromMap = normalizeBrand(BRAND_BY_CLIENT_ID[clientId]);
    const brand = fromMetadata || fromMap || "client1";

    try {
      console.info(
        "[acul-loader] client=",
        clientId,
        "metadata.acul_brand=",
        client && client.metadata && client.metadata.acul_brand,
        "brand=",
        brand,
        "source=",
        fromMetadata ? "metadata" : fromMap ? "client-id-map" : "default"
      );
    } catch (e) {}

    return brand;
  }

  function injectStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href + (href.indexOf("?") >= 0 ? "&" : "?") + CACHE_BUST;
    document.head.appendChild(link);
  }

  function injectModule(src) {
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;
    script.src = src + (src.indexOf("?") >= 0 ? "&" : "?") + CACHE_BUST;
    document.head.appendChild(script);
  }

  function resolveScreen() {
    const screenName =
      window.universal_login_context &&
      window.universal_login_context.screen &&
      window.universal_login_context.screen.name;
    return screenName || "login";
  }

  function boot() {
    if (!window.universal_login_context) {
      if (Date.now() - startedAt < MAX_WAIT_MS) {
        setTimeout(boot, 50);
        return;
      }
      try {
        console.warn(
          "[acul-loader] universal_login_context missing; defaulting to client1"
        );
      } catch (e) {}
    }

    const brand = resolveBrand();
    const screen = resolveScreen();
    const base = CDN_BASE + "/" + brand;

    try {
      console.info("[acul-loader] screen=", screen);
    } catch (e) {}

    injectStylesheet(base + "/shared/style.css");
    injectModule(base + "/shared/common.js");
    injectModule(base + "/shared/react-vendor.js");
    injectModule(base + "/shared/vendor.js");
    injectModule(base + "/" + screen + "/index.js");
    injectModule(base + "/main.js");
  }

  boot();
})();
