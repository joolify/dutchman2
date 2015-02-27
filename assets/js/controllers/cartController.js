function CartController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("CartController()", this._model, this._view);
  this.requestUserName = new Event(this);
  this.requestPassWord = new Event(this);

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */

  if(this._view) {
    this._view.popBtnClicked.attach(function (sender, args) {
      _this._pop(args.itemId);
    });

    this._view.incrementBtnClicked.attach(function (sender, args) {
      _this._increment(args.itemId);
    });

    this._view.amountRemoved.attach(function (sender, args) {
      _this._decrement(args.itemId);
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
   * Remove an item from the CartModel
   * @function _pop
   * @param {Integer} itemId
   */
  _pop: function (itemId) {
    console.log("CartController._pop: ", itemId);
    this._model.pop(itemId);
  },
  /* Increases the amount of an item.
   * function _increment
   * @param itemId
   */
  _increment: function (itemId) {
    console.log("CartController._increment: ", itemId);
    this._model.increment(itemId);
  },

  /* Increases the amount of an item.
   * @function _decrement
   * @param itemId
   */
  _decrement: function (itemId) {
    console.log("CartController._decrement: ", itemId);
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

  /*
   * Initiate total price and the user's credit
   * @function run
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
