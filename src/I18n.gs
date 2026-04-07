var AstroI18n = (function () {
  var BUNDLES = {
    es: {
      menu: {
        openPanel: 'Abrir panel',
        quickInsert: 'Insertar símbolo rápido',
        help: 'Ayuda',
        quickInsertTitle: 'Inserción rápida'
      },
      sidebar: {
        loading: 'Cargando catálogo astrológico...',
        searchPlaceholder: 'Buscar por símbolo, nombre, alias o categoría',
        quickAccess: 'Acceso rápido',
        categories: 'Categorías',
        settings: 'Ajustes',
        settingsTitle: 'Configuración',
        backToCatalog: 'Volver',
        tabPlanets: 'Planetas',
        tabSigns: 'Zodiaco',
        tabPoints: 'Puntos',
        tabAngles: 'Angulos',
        tabAspects: 'Aspectos',
        tabHouses: 'Casas',
        tabEtc: 'Etc',
        noResults: 'No se encontraron símbolos para esta búsqueda.',
        supportLink: 'Support',
        privacyLink: 'Privacy',
        termsLink: 'Terms',
        favorites: 'Favoritos',
        recents: 'Recientes',
        insert: 'Insertar',
        copy: 'Copiar',
        favoriteAdd: 'Guardar',
        favoriteRemove: 'Quitar',
        filterAll: 'Todo',
        filterFavorites: 'Favoritos',
        filterStandard: 'Estándar',
        badgeStandard: 'Core',
        badgeExtended: 'Extendido',
        angleUnit: '{value}°',
        searchLabel: 'Buscar',
        spaceMode: 'Inserción',
        presentationMode: 'Presentación',
        insertOnly: 'Solo símbolo',
        insertWrapped: 'Con espacios',
        presentationAuto: 'Auto',
        presentationText: 'Texto',
        presentationEmoji: 'Emoji',
        presentationHelper: 'Auto deja que Google Docs elija. Texto y Emoji intentan forzar la presentación con selectores Unicode cuando el símbolo lo soporta.',
        fontToggle: 'Intentar Noto Sans Symbols 2',
        fontHelper: 'Google Docs puede ignorar la fuente si no está disponible en el documento.',
        identityTitle: 'Cuenta',
        identityEmailAvailable: 'Email detectado: {email}',
        identityEmailUnavailable: 'Google no expuso el email de esta cuenta en este contexto de autorización.',
        identityEmailUnavailableWithFallback: 'Email no disponible. Identificador temporal interno: {value}',
        identityUsage: 'Cuando está disponible, usamos este email para identificar la cuenta en soporte y administración interna. Si más adelante se habilita billing, ese uso requerirá disclosures y términos actualizados antes de activarse.',
        copied: 'Símbolo copiado al portapapeles.',
        copyFailed: 'No se pudo copiar automáticamente.',
        preferencesSaved: 'Preferencias actualizadas.',
        localeBadge: 'ES',
        emptyRecents: 'Los símbolos recientes aparecerán aquí después de insertar.'
      },
      status: {
        inserting: 'Insertando símbolo...',
        insertedAtCursor: 'Símbolo insertado en la posición actual.',
        insertedAfterSelection: 'Símbolo insertado al final de la selección activa.',
        appendedToEnd: 'No había un cursor válido. El símbolo se agregó al final del documento.',
        favoriteAdded: 'Símbolo agregado a favoritos.',
        favoriteRemoved: 'Símbolo quitado de favoritos.',
        fontAttempted: 'Se intentó aplicar la tipografía sugerida.',
        fontFailed: 'No se pudo aplicar la tipografía sugerida.'
      },
      errors: {
        symbolNotFound: 'No se encontró el símbolo solicitado.',
        invalidRequest: 'La solicitud de inserción es inválida.',
        insertionFailed: 'No se pudo insertar el símbolo en este contexto de Google Docs.',
        unexpected: 'Ocurrió un error inesperado.'
      },
      help: {
        title: 'Astro Symbols',
        body: [
          '1. Abrí el panel desde Extensiones > Astro Symbols.',
          '2. Buscá el símbolo y hacé clic en Insertar.',
          '3. Si no hay cursor editable válido, el add-on agrega el símbolo al final del documento.',
          '4. La opción de fuente es best effort: Google Docs puede no reflejar la tipografía sugerida.'
        ].join('\n\n')
      }
    },
    en: {
      menu: {
        openPanel: 'Open panel',
        quickInsert: 'Quick insert symbol',
        help: 'Help',
        quickInsertTitle: 'Quick insert'
      },
      sidebar: {
        loading: 'Loading astrology catalog...',
        searchPlaceholder: 'Search by symbol, name, alias, or category',
        quickAccess: 'Quick access',
        categories: 'Categories',
        settings: 'Settings',
        settingsTitle: 'Settings',
        backToCatalog: 'Back',
        tabPlanets: 'Planets',
        tabSigns: 'Zodiac',
        tabPoints: 'Points',
        tabAngles: 'Angles',
        tabAspects: 'Aspects',
        tabHouses: 'Houses',
        tabEtc: 'Etc',
        noResults: 'No symbols matched this search.',
        supportLink: 'Support',
        privacyLink: 'Privacy',
        termsLink: 'Terms',
        favorites: 'Favorites',
        recents: 'Recent',
        insert: 'Insert',
        copy: 'Copy',
        favoriteAdd: 'Save',
        favoriteRemove: 'Remove',
        filterAll: 'All',
        filterFavorites: 'Favorites',
        filterStandard: 'Standard',
        badgeStandard: 'Core',
        badgeExtended: 'Extended',
        angleUnit: '{value}°',
        searchLabel: 'Search',
        spaceMode: 'Insertion',
        presentationMode: 'Presentation',
        insertOnly: 'Symbol only',
        insertWrapped: 'With spaces',
        presentationAuto: 'Auto',
        presentationText: 'Text',
        presentationEmoji: 'Emoji',
        presentationHelper: 'Auto lets Google Docs choose. Text and Emoji try to force presentation with Unicode selectors when the symbol supports them.',
        fontToggle: 'Try Noto Sans Symbols 2',
        fontHelper: 'Google Docs may ignore the font if it is unavailable in the document.',
        identityTitle: 'Account',
        identityEmailAvailable: 'Detected email: {email}',
        identityEmailUnavailable: 'Google did not expose this account email in the current authorization context.',
        identityEmailUnavailableWithFallback: 'Email unavailable. Internal temporary identifier: {value}',
        identityUsage: 'When available, we use this email to identify the account for support and internal account administration. If billing is enabled later, that use will require updated disclosures and terms before activation.',
        copied: 'Symbol copied to clipboard.',
        copyFailed: 'Could not copy automatically.',
        preferencesSaved: 'Preferences updated.',
        localeBadge: 'EN',
        emptyRecents: 'Recent symbols will appear here after you insert them.'
      },
      status: {
        inserting: 'Inserting symbol...',
        insertedAtCursor: 'Symbol inserted at the current cursor position.',
        insertedAfterSelection: 'Symbol inserted at the end of the active selection.',
        appendedToEnd: 'No valid cursor was available. The symbol was added to the end of the document.',
        favoriteAdded: 'Symbol added to favorites.',
        favoriteRemoved: 'Symbol removed from favorites.',
        fontAttempted: 'The suggested font was attempted.',
        fontFailed: 'The suggested font could not be applied.'
      },
      errors: {
        symbolNotFound: 'The requested symbol was not found.',
        invalidRequest: 'The insertion request is invalid.',
        insertionFailed: 'The symbol could not be inserted in this Google Docs context.',
        unexpected: 'An unexpected error occurred.'
      },
      help: {
        title: 'Astro Symbols',
        body: [
          '1. Open the panel from Extensions > Astro Symbols.',
          '2. Search for a symbol and click Insert.',
          '3. If there is no valid editable cursor, the add-on appends the symbol to the end of the document.',
          '4. The font option is best effort: Google Docs may not visually apply the suggested font.'
        ].join('\n\n')
      }
    }
  };

  function getBundle(locale) {
    return AstroUtils.deepClone(BUNDLES[AstroUtils.normalizeLocale(locale)]);
  }

  function t(locale, path, values) {
    var bundle = BUNDLES[AstroUtils.normalizeLocale(locale)];
    var template = AstroUtils.getNestedValue(bundle, path) || path;
    return AstroUtils.formatTemplate(template, values || {});
  }

  return {
    getBundle: getBundle,
    t: t
  };
})();
