/*
 * A quick model
 * @class QuickModel
 * @constructor
 * Creates a QuickModel
 */
function QuickModel() {
    this.quickUpdated = new Event(this);
}

QuickModel.prototype = {
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
    var quickList = "Hello Quick!";
    _this.quickUpdated.notify({quickList: quickList});
  }
};
