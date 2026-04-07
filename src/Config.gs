var AstroConfig = (function () {
  var CONFIG = {
    app: {
      name: 'Astro Symbols',
      version: '0.1.0',
      sidebarTitle: 'Astro Symbols',
      quickInsertSymbolId: 'sun',
      quickAccessSymbolIds: ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter'],
      legalLinks: {
        support: 'https://astroaddon.productoindustrial.com/support/',
        privacy: 'https://astroaddon.productoindustrial.com/privacy/',
        terms: 'https://astroaddon.productoindustrial.com/terms/'
      }
    },
    ui: {
      recentLimit: 6,
      favoritesLimit: 20,
      searchDebounceMs: 80,
      copyEnabled: true
    },
    insertion: {
      defaultSpaceMode: 'none',
      supportedSpaceModes: ['none', 'wrap'],
      defaultPresentationMode: 'auto',
      supportedPresentationModes: ['auto', 'text', 'emoji'],
      preferredFontFamily: 'Noto Sans Symbols 2',
      applyPreferredFontByDefault: false
    },
    i18n: {
      defaultLocale: 'es',
      supportedLocales: ['es', 'en']
    },
    storage: {
      userPreferencesKey: 'ASTRO_SYMBOLS_USER_PREFERENCES',
      userIdentityKey: 'ASTRO_SYMBOLS_USER_IDENTITY',
      schemaVersion: 1
    },
    extensions: {
      favoritesEnabled: true,
      recentEnabled: true,
      settingsEnabled: true
    }
  };

  function get() {
    return AstroUtils.deepClone(CONFIG);
  }

  function getClientConfig() {
    return {
      app: AstroUtils.deepClone(CONFIG.app),
      ui: AstroUtils.deepClone(CONFIG.ui),
      insertion: AstroUtils.deepClone(CONFIG.insertion),
      extensions: AstroUtils.deepClone(CONFIG.extensions)
    };
  }

  function getDefaultPreferences() {
    return {
      schemaVersion: CONFIG.storage.schemaVersion,
      locale: CONFIG.i18n.defaultLocale,
      spaceMode: CONFIG.insertion.defaultSpaceMode,
      presentationMode: CONFIG.insertion.defaultPresentationMode,
      applyPreferredFont: CONFIG.insertion.applyPreferredFontByDefault,
      favorites: [],
      recentSymbolIds: []
    };
  }

  function getSupportedLocales() {
    return CONFIG.i18n.supportedLocales.slice();
  }

  return {
    get: get,
    getClientConfig: getClientConfig,
    getDefaultPreferences: getDefaultPreferences,
    getSupportedLocales: getSupportedLocales
  };
})();
