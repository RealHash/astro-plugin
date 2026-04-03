var AstroSidebar = (function () {
  function show() {
    var html = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(AstroConfig.get().app.sidebarTitle);

    DocumentApp.getUi().showSidebar(html);
  }

  function getBootstrap(clientLocale) {
    var locale = AstroUtils.normalizeLocale(clientLocale || AstroUtils.getUserLocale());
    var preferences = AstroPreferences.getUserPreferences();

    return {
      locale: locale,
      config: AstroConfig.getClientConfig(),
      strings: AstroI18n.getBundle(locale),
      catalog: AstroCatalog.getCatalog(locale, preferences),
      preferences: preferences
    };
  }

  return {
    getBootstrap: getBootstrap,
    show: show
  };
})();
