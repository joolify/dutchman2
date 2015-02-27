function IndexController(controllers) {
  /** @private */ this._loginController = controllers.login;
  /** @private */ this._languageController = controllers.language;

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
    this._loginController.run();
    this._languageController.run();
  }
};
