function DrinkController(model, view){
  /** @private */ this._databaseModel = model;
  /** @private */ this._drinkView = view;
  /** @private */ this._QUERY_INIT = "";

  var _this = this;
  console.log("DrinkController()", this._databaseModel, this._drinkView);
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
      _this.pushCartItem(args.itemId);
    });
  }

  if(this._databaseModel) {
    this._databaseModel.drinksUpdated.attach(function () {
      _this.refresh();
    });
  }
}

DrinkController.prototype = {
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  run: function() {
    console.log("DrinkController.run()");
    this.query(this._QUERY_INIT);
  },

  /*
   * Refreshes the DrinkView
   * @function refresh
   */
  refresh: function () {
    var itemList = this._databaseModel.getItems();
    this._drinkView.refresh(itemList);
  },

  /* Queries the DatabaseModel
   * @function query
   */
  query: function (query) {
    //TODO: Needs username + password
    var username = "aamsta";//this._loginModel.getUserName();
    var password = "aamsta";// this._loginModel.getPassWord();
    this._databaseModel.query(query, username, password);
  }
};
