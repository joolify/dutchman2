function DrinkController(model, view){
  /** @private */ this._model = model;
  /** @private */ this._view = view;
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
  if(this._view) {
    this._view.searchFieldModified.attach(function (sender, args) {
      _this._query(args.query);
    });

    this._view.itemBtnPushed.attach(function (sender, args) {
      _this._push(args.itemId);
    });
  }

  if(this._model) {
    this._model.drinksUpdated.attach(function () {
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
    var item = this._model.getItem(itemId);
    this.itemPushed.notify({item: item});
  },

  /*
   * Refreshes the DrinkView
   * @function _refresh
   */
  _refresh: function () {
    console.log("DrinkController._refresh()");
    var itemList = this._model.getItems();
    this._view.refresh(itemList);

  },

  /* Queries the drink model
   * @function _query
   */
  _query: function (queryString) {
    var username = this._getUserName();
    var password = this._getPassWord();
    console.log("DrinkController._query: ", username, password);
    this._model.query(queryString, username, password);
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

  getItems: function() {
    console.log("DrinkController.getItems()");
    return this._model.getItems();
  },

  refresh: function(itemList) {
    console.log("DrinkController.refresh()", itemList);
    this._view.refresh(itemList);
  }

};
