function QuickController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("QuickController()", this._model, this._view);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    /*Listen for quick button clicks*/
  }

  if(this._model) {
    this._model.quickUpdated.attach(function (sender, args) {
      _this.refreshQuick(args.quickList);
    });
  }
}

QuickController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  updateQuick: function() {
    this._model.update();
  },

  refreshQuick: function(quickList) {
    this._view.refresh(quickList);
  },
  run: function () {
    console.log("QuickController.run()");
    this.updateQuick();
  }
};
