function LanguageController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("LanguageController()", this._model, this._view);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    this._view.languageSelected.attach(function (sender, args) {
      _this.getLanguage(args.language);
    });
  }
}

LanguageController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */

  getLanguage: function(language) {
    var dictionary = this._model.searchLanguage(language);
    this._view.translate(dictionary);
  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  run: function () {
    console.log("LanguageController.run()");
    this.getLanguage($('#language').val());
  }

};
