/**
 * @OnlyCurrentDoc
 */

function onOpen(e) {
  AstroApp.bootstrap(e);
}

function onInstall(e) {
  AstroApp.bootstrap(e);
}

function openSidebarFromMenu() {
  AstroSidebar.show();
}

function insertQuickSymbolFromMenu() {
  var locale = AstroUtils.getUserLocale();
  var preferences = AstroPreferences.getUserPreferences();
  var result = AstroInsert.insertSymbolById(AstroConfig.get().app.quickInsertSymbolId, {
    locale: locale,
    spaceMode: preferences.spaceMode,
    presentationMode: preferences.presentationMode,
    applyPreferredFont: false,
    source: 'menu-quick-insert'
  });

  AstroMenu.notifyQuickInsert(result, locale);
}

function showHelpFromMenu() {
  AstroMenu.showHelpDialog();
}

function getSidebarBootstrap(clientLocale) {
  return AstroSidebar.getBootstrap(clientLocale);
}

function insertSymbolFromSidebar(payload) {
  return AstroInsert.insertSymbolFromPayload(payload || {});
}

function getUserPreferencesFromSidebar() {
  return AstroPreferences.getUserPreferences();
}

function saveUserPreferencesFromSidebar(partial) {
  return AstroPreferences.updateUserPreferences(partial || {});
}

function setFavoriteSymbolFromSidebar(payload) {
  var locale = AstroUtils.normalizeLocale(payload && payload.locale);

  if (!payload || !payload.symbolId) {
    return {
      ok: false,
      message: AstroI18n.t(locale, 'errors.invalidRequest')
    };
  }

  var preferences = AstroPreferences.setFavoriteSymbol(payload.symbolId, Boolean(payload.isFavorite));

  return {
    ok: true,
    message: AstroI18n.t(locale, payload.isFavorite ? 'status.favoriteAdded' : 'status.favoriteRemoved'),
    preferences: {
      favorites: preferences.favorites,
      recentSymbolIds: preferences.recentSymbolIds
    }
  };
}

var AstroApp = (function () {
  function bootstrap() {
    AstroUtils.logStartup();
    AstroMenu.build();
  }

  return {
    bootstrap: bootstrap
  };
})();
