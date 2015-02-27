function DrinkController(model, view){
  /** @private */ this._drinkModel = model;
  /** @private */ this._drinkView = view;
  /** @private */ this._QUERY_INIT = "";

  var _this = this;

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

  _getUserName: function () {
    var _userName;
    this.requestUserName.notify(function (userName) {
      _userName = userName;
    });
    return _userName;
  },

  _getPassWord: function () {
    var _passWord;
    this.requestPassWord.notify(function (passWord) {
      _passWord = passWord;
    });
    return _passWord;
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

  /* Queries the drink model
   * @function query
   */
  query: function (query) {
    //TODO: Needs username + password
    var username = this._getUserName();//this._loginModel.getUserName();
    var password = this._getPassWord();// this._loginModel.getPassWord();
    console.log("DrinkController.query: ", username, password);
    this._drinkModel.query(query, username, password);
  }
};
