/*
 * An i18n view
 * @class LanguageView
 * @constructor
 * Creates LanguageView
 */

function LanguageView(elements) {
  this._elements = elements;
  this.languageSelected = new Event(this);
  var _this = this;
  console.log("LanguageView()", this._elements.language);

  // Listen to language selection
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  this._elements.language.change(function(e) {
    _this._languageUpdated(_this._elements.language.val());
  });
}

LanguageView.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  /*
   * Notifies its listener that the user has selected a new language
   * @private
   * @function _languageUpdated
   * @param {String} newQuery
   */
  _languageUpdated: function (newLanguage) {
    this.languageSelected.notify({language: newLanguage});
  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  translate: function(dictionary) {
  console.log("LanguageView()", dictionary);
    $.each(dictionary, function(index, element) {
      if(element[2]=="text") {
        $(element[0]).text(element[1]); 
      }
      else {
        $(element[0]).attr("placeholder", element[1]);
      }
    });
  }
};
