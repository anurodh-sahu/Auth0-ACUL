/**
 * ACUL brand loader — single fixed head_tag entrypoint.
 * Brand is chosen from window.universal_login_context.client.id
 * (client.metadata is not present in UL context on this tenant).
 *
 * Upload to: https://acul.innodeed.com/assets/acul-loader.js
 */
(function loadAculBrand() {
  // NOTE: client.metadata is NOT available in Universal Login on this tenant.
  // Changing app metadata in the Dashboard has no effect — edit this map instead.
  const BRAND_BY_CLIENT_ID = {
    // Ambit Dev — red / centered / no quotes (temp verify brand switch)
    UKhlpX1TCscOa0wCEwxSvIjR90eR8XqP: "client2",
    // Ambit — gray LOGIN (classic right layout)
    rucj8GcPVfaX1nxJEKDqUupxwbt9JzQM: "client1",
  };

  const CDN_BASE = "https://acul.innodeed.com/assets";
  const CACHE_BUST = "v=20260925d";
  const MAX_WAIT_MS = 5000;
  const startedAt = Date.now();

  function resolveBrand() {
    const clientId = window.universal_login_context &&
      window.universal_login_context.client &&
      window.universal_login_context.client.id;
    const brand = BRAND_BY_CLIENT_ID[clientId] || "client1";
    try {
      console.info("[acul-loader] client=", clientId, "brand=", brand);
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
        console.warn("[acul-loader] universal_login_context missing; defaulting to client1");
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
