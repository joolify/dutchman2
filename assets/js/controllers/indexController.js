function IndexController(models, views) {
  /** @private */ this._loginController = new LoginController(models.login, views.login);
  /** @private */ this._languageController = new LanguageController(models.language, views.language);

  var _this = this;

  console.log("IndexController()");
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
}

IndexController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  run: function () {
    console.log("IndexController.run()");
    this._languageController.run(); //TODO: needs username + password
  }
};
