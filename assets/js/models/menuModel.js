/*
 * A menu model
 * @class MenuModel
 * @constructor
 * Creates a MenuModel
 */
function MenuModel() {
    this.menuUpdated = new Event(this);
}

MenuModel.prototype = {
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
  update: function() {
    var _this = this;
    /* fetch data*/
    var menuList = "Hello Menu!";
    _this.menuUpdated.notify({menuList: menuList});
  }
};
