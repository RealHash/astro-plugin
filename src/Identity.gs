var AstroIdentity = (function () {
  function getCurrentIdentity() {
    var stored = getStoredIdentity_();
    var email = '';
    var temporaryUserKey = '';

    try {
      email = String(Session.getActiveUser().getEmail() || '').trim();
    } catch (error) {
      email = '';
    }

    try {
      temporaryUserKey = String(Session.getTemporaryActiveUserKey() || '').trim();
    } catch (error) {
      temporaryUserKey = '';
    }

    var nextIdentity = {
      email: email || stored.email || '',
      temporaryUserKey: temporaryUserKey || stored.temporaryUserKey || '',
      lastSeenAt: new Date().toISOString()
    };

    persist_(nextIdentity);
    return sanitize_(nextIdentity);
  }

  function getStoredIdentity_() {
    var raw = PropertiesService.getUserProperties().getProperty(AstroConfig.get().storage.userIdentityKey);
    return AstroUtils.safeJsonParse(raw, {});
  }

  function persist_(identity) {
    PropertiesService.getUserProperties().setProperty(
      AstroConfig.get().storage.userIdentityKey,
      JSON.stringify(identity)
    );
  }

  function sanitize_(identity) {
    var email = String(identity.email || '').trim();
    var temporaryUserKey = String(identity.temporaryUserKey || '').trim();
    var supportIdentifier = email || temporaryUserKey || '';
    var supportIdentifierType = email ? 'email' : (temporaryUserKey ? 'temporaryKey' : 'unknown');

    return {
      email: email,
      emailAvailable: Boolean(email),
      supportIdentifier: supportIdentifier,
      supportIdentifierType: supportIdentifierType,
      lastSeenAt: identity.lastSeenAt || ''
    };
  }

  return {
    getCurrentIdentity: getCurrentIdentity
  };
})();
