/*
 * A quick view
 * @class QuickView
 * @constructor
 * Creates a QuickView
 */
function QuickView(elements) {
    /** @private */ this._elements = elements;

    var _this = this;

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
}

QuickView.prototype = {
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
  refresh: function(quickList) {
    var _this = this;
    var quick = this._elements.quickBuy;
    quick.append(quickList);
  }
};
