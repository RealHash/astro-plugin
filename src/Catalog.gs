var AstroCatalog = (function () {
  var CATEGORY_LABELS = {
    signs: { es: 'Signos zodiacales', en: 'Zodiac signs' },
    planets: { es: 'Planetas y luminarias', en: 'Planets and luminaries' },
    points: { es: 'Puntos y cuerpos usados en astrología', en: 'Astrological points and bodies' },
    angles: { es: 'Ángulos y ejes', en: 'Angles and axes' },
    major_aspects: { es: 'Aspectos mayores', en: 'Major aspects' },
    minor_aspects: { es: 'Aspectos menores', en: 'Minor aspects' },
    houses: { es: 'Casas', en: 'Houses' },
    classification: { es: 'Clasificaciones útiles', en: 'Useful classifications' }
  };

  var NORMALIZED_CATEGORIES = normalizeCategories_(ASTRO_SYMBOLS_CATALOG || []);
  var CATEGORY_ORDER = NORMALIZED_CATEGORIES.map(function (category) {
    return category.id;
  });
  var CATEGORY_META = indexCategories_(NORMALIZED_CATEGORIES);
  var SYMBOLS = flattenSymbols_(NORMALIZED_CATEGORIES);

  function getCatalog(locale, preferences) {
    var resolvedLocale = AstroUtils.normalizeLocale(locale);
    var favoriteIds = preferences && preferences.favorites ? preferences.favorites : [];
    var items = SYMBOLS.map(function (entry) {
      return toClientItem_(entry, resolvedLocale, favoriteIds);
    });

    return {
      items: items,
      staticSections: CATEGORY_ORDER.map(function (categoryKey) {
        return {
          key: categoryKey,
          label: getCategoryLabel(categoryKey, resolvedLocale),
          dynamic: false
        };
      })
    };
  }

  function getCategoryLabel(categoryKey, locale) {
    var resolvedLocale = AstroUtils.normalizeLocale(locale);
    return CATEGORY_META[categoryKey].names[resolvedLocale];
  }

  function findById(symbolId) {
    var targetId = String(symbolId || '');

    for (var i = 0; i < SYMBOLS.length; i += 1) {
      if (SYMBOLS[i].id === targetId) {
        return AstroUtils.deepClone(SYMBOLS[i]);
      }
    }

    return null;
  }

  function toClientItem_(entry, locale, favoriteIds) {
    var label = entry.names[locale];
    var categoryLabel = getCategoryLabel(entry.category, locale);
    var searchText = AstroUtils.toSearchable([
      entry.symbol,
      label,
      categoryLabel,
      entry.names.es,
      entry.names.en,
      entry.unicode,
      entry.note && entry.note.es,
      entry.note && entry.note.en
    ].concat(entry.aliases || []));

    return {
      id: entry.id,
      symbol: entry.symbol,
      label: label,
      aliases: (entry.aliases || []).slice(),
      categoryKey: entry.category,
      categoryLabel: categoryLabel,
      searchText: searchText,
      isFavorite: favoriteIds.indexOf(entry.id) > -1,
      unicode: entry.unicode || null,
      standard: entry.standard !== false,
      angle: entry.angle || null,
      note: entry.note ? entry.note[locale] : null
    };
  }

  function normalizeCategories_(definition) {
    return definition
      .slice()
      .sort(function (left, right) {
        return left.order - right.order;
      })
      .map(function (category) {
        return {
          id: category.id,
          order: category.order,
          names: {
            es: CATEGORY_LABELS[category.id].es,
            en: CATEGORY_LABELS[category.id].en
          },
          items: category.items.map(function (item) {
            return normalizeSymbol_(category.id, item);
          })
        };
      });
  }

  function normalizeSymbol_(categoryId, item) {
    return {
      id: item.key,
      symbol: item.symbol,
      category: categoryId,
      names: {
        es: item.nameEs,
        en: item.nameEn
      },
      aliases: (item.aliases || []).slice(),
      unicode: item.unicode || null,
      standard: item.standard !== false,
      angle: typeof item.angle === 'number' ? item.angle : null,
      note: item.note ? {
        es: item.noteEs || item.note,
        en: item.noteEn || item.note
      } : item.noteEs || item.noteEn ? {
        es: item.noteEs || item.noteEn,
        en: item.noteEn || item.noteEs
      } : null
    };
  }

  function indexCategories_(categories) {
    return categories.reduce(function (accumulator, category) {
      accumulator[category.id] = category;
      return accumulator;
    }, {});
  }

  function flattenSymbols_(categories) {
    return categories.reduce(function (accumulator, category) {
      return accumulator.concat(category.items);
    }, []);
  }

  return {
    findById: findById,
    getCatalog: getCatalog,
    getCategoryLabel: getCategoryLabel
  };
})();
