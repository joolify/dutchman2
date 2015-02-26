function MenuController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("MenuController()", this._model, this._view);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    /*Listen for menu button clicks*/
  }

  if(this._model) {
    this._model.menuUpdated.attach(function (sender, args) {
      _this.refreshMenu(args.menuList);
    });
  }
}

MenuController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  updateMenu: function() {
    this._model.update();
  },

  refreshMenu: function(menuList) {
    this._view.refresh(menuList);
  },
    run: function () {
      console.log("MenuController.run()");
      this.updateMenu();
    }
};
