function DrinkController(model, view){
  /** @private */ this._drinkModel = model;
  /** @private */ this._drinkView = view;
  /** @private */ this._QUERY_INIT = "";

  var _this = this;

  console.log("DrinkController()", this._model, this._view);

  this.itemPushed = new Event(this);
  this.requestUserName = new Event(this);
  this.requestPassWord = new Event(this);

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._drinkView) {
    this._drinkView.searchFieldModified.attach(function (sender, args) {
      _this._query(args.query);
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
  /*
   Callback function to get user name from other controller
   * @function _getUserName
   * @return {String}
   */
  _getUserName: function () {
    var _userName;
    this.requestUserName.notify(function (userName) {
      _userName = userName;
    });
    return _userName;
  },

  /*
   * Callback function to get password from other controller
   * @function _getPassWord
   * @return {String}
   */
  _getPassWord: function () {
    var _passWord;
    this.requestPassWord.notify(function (passWord) {
      _passWord = passWord;
    });
    return _passWord;
  },
  /*
   * Pushes the selected item to super controller
   * @function _push
   */
  _push: function (itemId) {
    var item = this._drinkModel.getItem(itemId);
    this.itemPushed.notify({item: item});
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

  /* Queries the drink model
   * @function _query
   */
  _query: function (queryString) {
    var username = this._getUserName();
    var password = this._getPassWord();
    console.log("DrinkController._query: ", username, password);
    this._drinkModel.query(queryString, username, password);
  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  /*
   * Initiates the drink table with all items
   * @function run
   */
  run: function() {
    console.log("DrinkController.run()");
    this._query(this._QUERY_INIT);
  },

};
