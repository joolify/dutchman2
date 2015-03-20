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
      _this.updateLanguage(args.language);
    });
  }

  if (this._model) {
    this._model.languageUpdated.attach(function (sender, args) {
      _this.refreshLanguage(args.words);
    });
  }

}

LanguageController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
    initLanguage: function (language) {
        this._model.setDictionary(language);
    },

    updateLanguage: function (language) {
        this._model.setDictionary(language);
    },

    refreshLanguage: function (words) {
        console.log("refreshLanguage", words);
        this._view.translate(words);
    },

    refreshDictionary: function () {
        var words = this._model.getDictionary();
        this.refreshLanguage(words);
    },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  run: function () {
    console.log("LanguageController.run()");
    this.refreshDictionary();
  }

};
