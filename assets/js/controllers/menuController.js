function MenuController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("MenuController()", this._model, this._view);

  this.requestUserName = new Event(this);
  this.requestPassWord = new Event(this);
  this.requestDrinkItems = new Event(this);
  this.itemsPushed = new Event(this);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    this._view.menuBtnPushed.attach(function(sender, args) {
      //_this._wheel.show(); FIXME
      _this._queryMenu();
    });
  }

  if(this._model) {
    this._model.menuUpdated.attach(function (sender, args) {
      _this._refreshMenu(args.itemList);
    });

        this._model.drinksUpdated.attach(function(sender, args) {
            _this._refreshDrinksMenu(args.itemList);
        });
    this._model.menuStartUp.attach(function() {
      _this._updateMenu();
    });

  }
}

MenuController.prototype = {
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

  _getDrinkItems: function () {
    var _items;
    this.requestDrinkItems.notify(function (items) {
      _items = items;
    });
    return _items;
  },
  _pushDrinkItems: function(itemList) {
    console.log("MenuController._pushDrinkItems()", itemList);
    this.itemsPushed.notify({itemList: itemList});
  },
  _updateMenu: function() {
    console.log("MenuController._updateMenu()");
    var username = this._getUserName();
    var password = this._getPassWord();
    var itemList = this._model.getItems();
    this._model.update(username, password, itemList);
  },

  _refreshMenu: function(menuList) {
    console.log("MenuController._refreshMenu()", menuList);
    this._view.refresh(menuList);
  },
  _startUpMenu: function() {
    var username = this._getUserName();
    var password = this._getPassWord();
    this._model.startUp(username, password);
  },

    _queryMenu: function() {
      var itemList = this._getDrinkItems();
      var username = this._getUserName();
      var password = this._getPassWord();
        var query = this._view.getMenuClicked();

      console.log("MenuController._queryMenu: ", itemList, username, password, query);
        this._model.queryMenu(query, username, password, itemList);
    },

    _refreshDrinksMenu: function(itemList) {
        console.log("MenuController._refreshDrinksMenu()"); //TODO
      //this._wheel.show();
        this._pushDrinkItems(itemList);
    },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  run: function () {
    console.log("MenuController.run()");
    this._startUpMenu();
  }
};
