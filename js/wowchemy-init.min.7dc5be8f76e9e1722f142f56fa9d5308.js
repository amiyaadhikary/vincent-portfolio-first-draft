/*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
/*! License: https://github.com/wowchemy/wowchemy-hugo-modules/blob/main/LICENSE.md */
/*! Wowchemy v5.0.0-beta.3 | https://wowchemy.com/ */
(() => {
  const bodyElement = document.body;

  // Get theme preference from localStorage
  function getUserTheme() {
    return parseInt(localStorage.getItem("wcTheme") || "2");
  }

  // Check if user theming is enabled
  function isThemingEnabled() {
    return Boolean(window.wc.darkLightEnabled);
  }

  // Apply the appropriate theme
  function applyTheme() {
    if (!isThemingEnabled()) {
      console.debug("User theming disabled.");
      return {
        isDarkTheme: window.wc.isSiteThemeDark,
        themeMode: window.wc.isSiteThemeDark ? 1 : 0,
      };
    }

    console.debug("User theming enabled.");
    const userTheme = getUserTheme();
    let isDarkTheme;

    switch (userTheme) {
      case 0:
        isDarkTheme = false;
        break;
      case 1:
        isDarkTheme = true;
        break;
      default:
        isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? true
          : window.matchMedia("(prefers-color-scheme: light)").matches
          ? false
          : window.wc.isSiteThemeDark;
        break;
    }

    if (isDarkTheme && !bodyElement.classList.contains("dark")) {
      console.debug("Applying Wowchemy dark theme");
      bodyElement.classList.add("dark");
    } else if (!isDarkTheme && bodyElement.classList.contains("dark")) {
      console.debug("Applying Wowchemy light theme");
      bodyElement.classList.remove("dark");
    }

    return { isDarkTheme, themeMode: userTheme };
  }

  // Initialize window variables
  window.wc = { darkLightEnabled: true, isSiteThemeDark: false };

  // Setup Netlify Identity if available
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  // Apply the theme on load
  applyTheme();

  // Configure Plotly
  window.PlotlyConfig = { MathJaxConfig: "local" };
})();
