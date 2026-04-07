var AstroInsert = (function () {
  var TEXT_PRESENTATION_SELECTOR = '\uFE0E';
  var EMOJI_PRESENTATION_SELECTOR = '\uFE0F';

  function insertSymbolFromPayload(payload) {
    var locale = AstroUtils.normalizeLocale(payload.locale);

    if (!payload || !payload.symbolId) {
      return buildErrorResult_(locale, 'errors.invalidRequest');
    }

    return insertSymbolById(payload.symbolId, {
      locale: locale,
      spaceMode: payload.spaceMode,
      presentationMode: payload.presentationMode,
      applyPreferredFont: payload.applyPreferredFont,
      skipRecentTracking: Boolean(payload.skipRecentTracking),
      source: payload.source || 'sidebar'
    });
  }

  function insertSymbolById(symbolId, options) {
    var locale = AstroUtils.normalizeLocale(options && options.locale);
    var symbolEntry = AstroCatalog.findById(symbolId);

    if (!symbolEntry) {
      return buildErrorResult_(locale, 'errors.symbolNotFound');
    }

    var insertion = buildInsertionPayload_(symbolEntry.symbol, options && options.spaceMode, options && options.presentationMode);

    try {
      var document = DocumentApp.getActiveDocument();
      var result = tryInsertAtCursor_(document, insertion, options);

      if (!result.ok) {
        result = tryInsertAtSelection_(document, insertion, options);
      }

      if (!result.ok) {
        result = appendToDocumentEnd_(document, insertion, options);
      }

      if (!result.ok) {
        return buildErrorResult_(locale, 'errors.insertionFailed');
      }

      result.ok = true;
      result.symbolId = symbolId;
      result.symbol = symbolEntry.symbol;
      result.insertedText = insertion.text;

      if (!options || !options.skipRecentTracking) {
        var preferences = AstroPreferences.recordRecentSymbol(symbolId);

        result.preferences = {
          favorites: preferences.favorites,
          recentSymbolIds: preferences.recentSymbolIds
        };
      }

      result.message = buildMessage_(locale, result.messageKey, result.fontStatus);

      return result;
    } catch (error) {
      console.error('[Astro Symbols] Insert failed', error);
      return buildErrorResult_(locale, 'errors.unexpected');
    }
  }

  function tryInsertAtCursor_(document, insertion, options) {
    var cursor = document.getCursor();

    if (!cursor) {
      return { ok: false };
    }

    var surroundingText = cursor.getSurroundingText();

    if (!surroundingText) {
      return { ok: false };
    }

    var offset = cursor.getSurroundingTextOffset();
    surroundingText.insertText(offset, insertion.text);

    return {
      ok: true,
      location: 'cursor',
      messageKey: 'status.insertedAtCursor',
      fontStatus: applyPreferredFont_(surroundingText, offset + insertion.symbolStartOffset, offset + insertion.symbolEndOffset, options)
    };
  }

  function tryInsertAtSelection_(document, insertion, options) {
    var selection = document.getSelection();

    if (!selection) {
      return { ok: false };
    }

    var rangeElements = selection.getRangeElements();

    for (var i = rangeElements.length - 1; i >= 0; i -= 1) {
      var rangeElement = rangeElements[i];
      var element = rangeElement.getElement();

      if (element.getType() !== DocumentApp.ElementType.TEXT) {
        continue;
      }

      var text = element.asText();
      var textLength = text.getText().length;
      var offset = rangeElement.isPartial() ? rangeElement.getEndOffsetInclusive() + 1 : textLength;
      var safeOffset = Math.max(0, Math.min(offset, textLength));

      text.insertText(safeOffset, insertion.text);

      return {
        ok: true,
        location: 'selection',
        messageKey: 'status.insertedAfterSelection',
        fontStatus: applyPreferredFont_(text, safeOffset + insertion.symbolStartOffset, safeOffset + insertion.symbolEndOffset, options)
      };
    }

    return { ok: false };
  }

  function appendToDocumentEnd_(document, insertion, options) {
    var body = document.getBody();
    var childCount = body.getNumChildren();
    var textElement;
    var offset;

    if (childCount === 0) {
      textElement = body.appendParagraph(insertion.text).editAsText();
      offset = 0;
    } else {
      var lastChild = body.getChild(childCount - 1);

      if (lastChild.getType() === DocumentApp.ElementType.PARAGRAPH) {
        textElement = lastChild.asParagraph().editAsText();
        offset = textElement.getText().length;
        textElement.insertText(offset, insertion.text);
      } else if (lastChild.getType() === DocumentApp.ElementType.LIST_ITEM) {
        textElement = lastChild.asListItem().editAsText();
        offset = textElement.getText().length;
        textElement.insertText(offset, insertion.text);
      } else {
        textElement = body.appendParagraph(insertion.text).editAsText();
        offset = 0;
      }
    }

    return {
      ok: true,
      location: 'document-end',
      messageKey: 'status.appendedToEnd',
      fontStatus: applyPreferredFont_(textElement, offset + insertion.symbolStartOffset, offset + insertion.symbolEndOffset, options)
    };
  }

  function buildInsertionPayload_(symbol, requestedSpaceMode, requestedPresentationMode) {
    var supportedSpaceModes = AstroConfig.get().insertion.supportedSpaceModes;
    var supportedPresentationModes = AstroConfig.get().insertion.supportedPresentationModes;
    var spaceMode = supportedSpaceModes.indexOf(requestedSpaceMode) > -1
      ? requestedSpaceMode
      : AstroConfig.get().insertion.defaultSpaceMode;
    var presentationMode = supportedPresentationModes.indexOf(requestedPresentationMode) > -1
      ? requestedPresentationMode
      : AstroConfig.get().insertion.defaultPresentationMode;
    var renderedSymbol = applyPresentationMode_(symbol, presentationMode);

    if (spaceMode === 'wrap') {
      return {
        text: ' ' + renderedSymbol + ' ',
        symbolStartOffset: 1,
        symbolEndOffset: renderedSymbol.length
      };
    }

    return {
      text: renderedSymbol,
      symbolStartOffset: 0,
      symbolEndOffset: renderedSymbol.length - 1
    };
  }

  function applyPresentationMode_(symbol, presentationMode) {
    var normalizedSymbol = stripPresentationSelectors_(symbol);

    if (!supportsPresentationSelector_(normalizedSymbol)) {
      return normalizedSymbol;
    }

    if (presentationMode === 'text') {
      return normalizedSymbol + TEXT_PRESENTATION_SELECTOR;
    }

    if (presentationMode === 'emoji') {
      return normalizedSymbol + EMOJI_PRESENTATION_SELECTOR;
    }

    return normalizedSymbol;
  }

  function stripPresentationSelectors_(symbol) {
    return String(symbol || '').replace(/[\uFE0E\uFE0F]/g, '');
  }

  function supportsPresentationSelector_(symbol) {
    return stripPresentationSelectors_(symbol).length === 1;
  }

  function applyPreferredFont_(textElement, startOffset, endOffset, options) {
    if (!options || !options.applyPreferredFont) {
      return 'not-requested';
    }

    try {
      textElement.setFontFamily(
        startOffset,
        endOffset,
        AstroConfig.get().insertion.preferredFontFamily
      );
      return 'attempted';
    } catch (error) {
      console.warn('[Astro Symbols] Preferred font could not be applied', error);
      return 'failed';
    }
  }

  function buildMessage_(locale, messageKey, fontStatus) {
    var message = AstroI18n.t(locale, messageKey);

    if (fontStatus === 'attempted') {
      return message + ' ' + AstroI18n.t(locale, 'status.fontAttempted');
    }

    if (fontStatus === 'failed') {
      return message + ' ' + AstroI18n.t(locale, 'status.fontFailed');
    }

    return message;
  }

  function buildErrorResult_(locale, messageKey) {
    return {
      ok: false,
      message: AstroI18n.t(locale, messageKey)
    };
  }

  return {
    insertSymbolById: insertSymbolById,
    insertSymbolFromPayload: insertSymbolFromPayload
  };
})();
