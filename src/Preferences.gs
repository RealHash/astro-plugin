var AstroPreferences = (function () {
  function getUserPreferences() {
    var defaults = AstroConfig.getDefaultPreferences();
    var raw = PropertiesService.getUserProperties().getProperty(AstroConfig.get().storage.userPreferencesKey);
    var stored = AstroUtils.safeJsonParse(raw, {});

    return sanitizePreferences_(merge_(defaults, stored));
  }

  function updateUserPreferences(partial) {
    var current = getUserPreferences();
    var updated = sanitizePreferences_(merge_(current, partial || {}));

    persist_(updated);
    return updated;
  }

  function recordRecentSymbol(symbolId) {
    var current = getUserPreferences();
    var recentIds = [String(symbolId)].concat(current.recentSymbolIds || []);
    var uniqueRecentIds = AstroUtils.uniqueStrings(recentIds).slice(0, AstroConfig.get().ui.recentLimit);

    current.recentSymbolIds = uniqueRecentIds;
    persist_(current);

    return current;
  }

  function setFavoriteSymbol(symbolId, isFavorite) {
    var current = getUserPreferences();
    var normalizedSymbolId = String(symbolId || '');
    var favorites = current.favorites || [];

    if (!normalizedSymbolId) {
      return current;
    }

    if (isFavorite) {
      favorites = [normalizedSymbolId].concat(favorites.filter(function (favoriteId) {
        return favoriteId !== normalizedSymbolId;
      }));
    } else {
      favorites = favorites.filter(function (favoriteId) {
        return favoriteId !== normalizedSymbolId;
      });
    }

    current.favorites = AstroUtils.uniqueStrings(favorites).slice(0, AstroConfig.get().ui.favoritesLimit);
    persist_(current);

    return current;
  }

  function persist_(preferences) {
    PropertiesService.getUserProperties().setProperty(
      AstroConfig.get().storage.userPreferencesKey,
      JSON.stringify(preferences)
    );
  }

  function sanitizePreferences_(preferences) {
    var supportedSpaceModes = AstroConfig.get().insertion.supportedSpaceModes;
    var supportedPresentationModes = AstroConfig.get().insertion.supportedPresentationModes;
    var spaceMode = preferences.spaceMode;
    var presentationMode = preferences.presentationMode;

    return {
      schemaVersion: AstroConfig.get().storage.schemaVersion,
      locale: AstroUtils.normalizeLocale(preferences.locale),
      spaceMode: supportedSpaceModes.indexOf(spaceMode) > -1 ? spaceMode : AstroConfig.get().insertion.defaultSpaceMode,
      presentationMode: supportedPresentationModes.indexOf(presentationMode) > -1 ? presentationMode : AstroConfig.get().insertion.defaultPresentationMode,
      applyPreferredFont: Boolean(preferences.applyPreferredFont),
      favorites: Array.isArray(preferences.favorites) ? AstroUtils.uniqueStrings(preferences.favorites).slice(0, AstroConfig.get().ui.favoritesLimit) : [],
      recentSymbolIds: Array.isArray(preferences.recentSymbolIds) ? AstroUtils.uniqueStrings(preferences.recentSymbolIds).slice(0, AstroConfig.get().ui.recentLimit) : []
    };
  }

  function merge_(base, override) {
    var result = AstroUtils.deepClone(base);

    Object.keys(override || {}).forEach(function (key) {
      result[key] = override[key];
    });

    return result;
  }

  return {
    getUserPreferences: getUserPreferences,
    recordRecentSymbol: recordRecentSymbol,
    setFavoriteSymbol: setFavoriteSymbol,
    updateUserPreferences: updateUserPreferences
  };
})();
