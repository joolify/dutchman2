/*
 * A menu view
 * @class MenuView
 * @constructor
 * Creates a MenuView
 */
function MenuView(elements) {
    /** @private */ this._elements = elements;

    var _this = this;

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
}

MenuView.prototype = {
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
	menuList : [],
  refresh: function(categories) {
    var _this = this;
    var menu = this._elements.menu;
	this.menuList.push(categories);
    menu.append(categories.toString());
  }
};
