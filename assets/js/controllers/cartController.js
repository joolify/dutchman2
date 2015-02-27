function CartController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  this.requestUserName = new Event(this);
  this.requestPassWord = new Event(this);

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */

  if(this._view) {
    this._view.popBtnClicked.attach(function (sender, args) {
      _this._popCartItem(args.itemId);
    });

    this._view.incrementBtnClicked.attach(function (sender, args) {
      _this._incrementCartItem(args.itemId);
    });

    this._view.amountRemoved.attach(function (sender, args) {
      _this._decrementCartItem(args.itemId);
    });

  }
  if(this._model) {
    this._model.cartUpdated.attach(function () {
      _this._refreshCart();
      _this._refreshTotalPrice();
    });
  }
}

CartController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
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
   * Remove an item from the CartModel
   * @function _popCartItem
   * @param {Integer} itemId
   */
  _popCartItem: function (itemId) {
    console.log("CartController._popCartItem: ", itemId);
    this._model.pop(itemId);
  },
  /* Increases the amount of an item.
   * function _incrementCartItem
   * @param itemId
   */
  _incrementCartItem: function (itemId) {
    console.log("CartController._incrementCartItem: ", itemId);
    this._model.increment(itemId);
  },

  /* Increases the amount of an item.
   * @function _decrementCartItem
   * @param itemId
   */
  _decrementCartItem: function (itemId) {
    console.log("CartController._decrementCartItem: ", itemId);
    this._model.decrement(itemId);
  },

  /*
   * Refreshes the CartView
   * @function _refreshCart
   */
  _refreshCart: function () {
    var cartItemList = this._model.getCart();
    console.log("CartController._refreshCart: " + cartItemList.length);
    this._view.refresh(cartItemList);
  },

  /*
   * Refreshes the total price
   * @function _refreshTotalPrice
   */
  _refreshTotalPrice: function () {
    var totalPrice = this._model.getTotalPrice();
    this._view.setTotalPrice(totalPrice);
  },
  /*
   * Refreshes the credit
   * @function _refreshCredit
   */
  _refreshCredit: function () {
    var username = this._getUserName();
    var password = this._getPassWord();
    var credit = this._model.getCredit(username, password);
    this._view.setCredit(credit);
  },

  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  run: function() {
    console.log("CartController.run()");
    this._refreshTotalPrice();
    this._refreshCredit();
  },

  /* Add an item to the CartModel
   * @function push
   * @param itemId
   */
  push: function (item) {
    this._model.push(item);
    console.log("CartController.push: ", item);
  },

};
