var AstroMenu = (function () {
  function build() {
    var locale = AstroConfig.get().i18n.defaultLocale;
    var bundle = AstroI18n.getBundle(locale);
    var ui = DocumentApp.getUi();

    ui.createAddonMenu()
      .addItem(bundle.menu.openPanel, 'openSidebarFromMenu')
      .addItem(bundle.menu.quickInsert, 'insertQuickSymbolFromMenu')
      .addSeparator()
      .addItem(bundle.menu.help, 'showHelpFromMenu')
      .addToUi();
  }

  function showHelpDialog() {
    var locale = AstroUtils.getUserLocale();
    var bundle = AstroI18n.getBundle(locale);

    DocumentApp.getUi().alert(bundle.help.title, bundle.help.body, DocumentApp.getUi().ButtonSet.OK);
  }

  function notifyQuickInsert(result, locale) {
    var bundle = AstroI18n.getBundle(locale);

    if (!result || !result.ok) {
      DocumentApp.getUi().alert(bundle.menu.quickInsertTitle, result && result.message ? result.message : bundle.errors.unexpected, DocumentApp.getUi().ButtonSet.OK);
      return;
    }

    DocumentApp.getUi().alert(bundle.menu.quickInsertTitle, result.message, DocumentApp.getUi().ButtonSet.OK);
  }

  return {
    build: build,
    notifyQuickInsert: notifyQuickInsert,
    showHelpDialog: showHelpDialog
  };
})();
