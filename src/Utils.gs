function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

var AstroUtils = (function () {
  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeLocale(locale) {
    var supported = AstroConfig.getSupportedLocales();
    var raw = (locale || '').toString().toLowerCase();

    if (!raw) {
      return AstroConfig.get().i18n.defaultLocale;
    }

    if (raw.indexOf('es') === 0) {
      return 'es';
    }

    if (raw.indexOf('en') === 0) {
      return 'en';
    }

    return supported.indexOf(raw) > -1 ? raw : AstroConfig.get().i18n.defaultLocale;
  }

  function getUserLocale() {
    try {
      return normalizeLocale(Session.getActiveUserLocale());
    } catch (error) {
      return AstroConfig.get().i18n.defaultLocale;
    }
  }

  function safeJsonParse(raw, fallback) {
    if (!raw) {
      return fallback;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function toSearchable(parts) {
    return parts
      .filter(function (part) {
        return part !== null && part !== undefined && part !== '';
      })
      .join(' ')
      .toLowerCase();
  }

  function uniqueStrings(values) {
    var seen = {};

    return (values || []).filter(function (value) {
      var normalized = String(value);

      if (seen[normalized]) {
        return false;
      }

      seen[normalized] = true;
      return true;
    });
  }

  function getNestedValue(source, path) {
    return path.split('.').reduce(function (accumulator, key) {
      if (!accumulator || typeof accumulator !== 'object') {
        return null;
      }

      return accumulator[key];
    }, source);
  }

  function formatTemplate(text, values) {
    return String(text || '').replace(/\{(\w+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(values || {}, key) ? values[key] : match;
    });
  }

  function logStartup() {
    console.log('[Astro Symbols] Your global config has been loaded');
  }

  return {
    deepClone: deepClone,
    formatTemplate: formatTemplate,
    getNestedValue: getNestedValue,
    getUserLocale: getUserLocale,
    logStartup: logStartup,
    normalizeLocale: normalizeLocale,
    safeJsonParse: safeJsonParse,
    toSearchable: toSearchable,
    uniqueStrings: uniqueStrings
  };
})();
