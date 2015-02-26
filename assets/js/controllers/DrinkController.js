function DrinkController(model, view){
  /** @private */ this._drinkModel = model;
  /** @private */ this._drinkView = view;
  /** @private */ this._QUERY_INIT = "";

  var _this = this;

  this.itemPushed = new Event(this);

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._drinkView) {
    this._drinkView.searchFieldModified.attach(function (sender, args) {
      _this.query(args.query);
    });

    this._drinkView.itemBtnPushed.attach(function (sender, args) {
      _this._push(args.itemId);
    });
  }

  if(this._drinkModel) {
    this._drinkModel.drinksUpdated.attach(function () {
      _this._refresh();
    });
  }
}

DrinkController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  _push: function (itemId) {
  },

  /*
   * Refreshes the DrinkView
   * @function _refresh
   */
  _refresh: function () {
    console.log("DrinkController._refresh()");
    var itemList = this._drinkModel.getItems();
    this._drinkView.refresh(itemList);

  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  run: function() {
    console.log("DrinkController.run()");
    this.query(this._QUERY_INIT);
  },

  /* Queries the DatabaseModel
   * @function query
   */
  query: function (query) {
    //TODO: Needs username + password
    var username = "aamsta";//this._loginModel.getUserName();
    var password = "aamsta";// this._loginModel.getPassWord();
    this._drinkModel.query(query, username, password);
  }
};
