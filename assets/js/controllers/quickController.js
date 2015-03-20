function QuickController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("QuickController()", this._model, this._view);
  this.itemPushed = new Event(this);
  this.requestUserName = new Event(this);
  this.requestPassWord = new Event(this);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    this._view.itemBtnPushed.attach(function (sender, args) {
      console.log("QuickController.itemBtnPushed", args.itemId);
      _this._push(args.itemId);
    });
  }

  if(this._model) {
    this._model.quickUpdated.attach(function () {
      _this.refreshQuick();
    });
  }
}

QuickController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  /*
   * Callback function to get user name from other controller
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
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  queryRecommended: function () {
    var username = this._getUserName();
    var password = this._getPassWord();
    console.log("QuickController._queryRecommended: ", username, password);
    this._model.query(username, password);
  },
  refreshQuick: function(quickList) {
    var itemList = this._model.getItems();
    this._view.refresh(itemList);
  },
  run: function () {
    console.log("QuickController.run()");
    this.queryRecommended();
  }
};
