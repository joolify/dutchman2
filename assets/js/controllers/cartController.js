function CartController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */

  if(this._view) {
    this._view.popBtnClicked.attach(function (sender, args) {
      _this.popCartItem(args.itemId);
    });

    this._view.incrementBtnClicked.attach(function (sender, args) {
      _this.incrementCartItem(args.itemId);
    });

    this._view.amountRemoved.attach(function (sender, args) {
      _this.decrementCartItem(args.itemId);
    });

  }
  if(this._model) {
    this._model.cartUpdated.attach(function () {
      _this.refreshCart();
      _this.refreshTotalPrice();
    });
  }
}

CartController.prototype = {
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */

  run: function() {
    console.log("CartController.run()");
    this.refreshTotalPrice(); //TODO: remove
    this.refreshCredit(); //TODO: remove
  },

  /* Add an item to the CartModel
   * @function pushCartItem
   * @param itemId
   */
  pushCartItem: function (itemId) {
    //TODO: Needs item from databaseModel
    var item = null; // this._databaseModel.getItem(itemId);
    this._model.push(item);
    console.log("Controller.pushCartItem: ", itemId);
  },
  /*
   * Remove an item from the CartModel
   * @function popCartItem
   * @param {Integer} itemId
   */
  popCartItem: function (itemId) {
    console.log("Controller.popCartItem: ", itemId);
    this._model.pop(itemId);
  },
  /* Increases the amount of an item.
   * function incrementCartItem
   * @param itemId
   */
  incrementCartItem: function (itemId) {
    console.log("Controller.incrementCartItem: ", itemId);
    this._model.increment(itemId);
  },

  /* Increases the amount of an item.
   * @function decrementCartItem
   * @param itemId
   */
  decrementCartItem: function (itemId) {
    console.log("Controller.decrementCartItem: ", itemId);
    this._model.decrement(itemId);
  },

  /*
   * Refreshes the CartView
   * @function refreshCart
   */
  refreshCart: function () {
    var cartItemList = this._model.getCart();
    console.log("Controller.refreshCart: " + cartItemList.length);
    this._view.refresh(cartItemList);
  },

  /*
   * Refreshes the total price
   * @function refreshTotalPrice
   */
  refreshTotalPrice: function () {
    var totalPrice = this._model.getTotalPrice();
    this._view.setTotalPrice(totalPrice);
  },
  /*
   * Refreshes the credit
   * @function refreshCredit
   */

  refreshCredit: function () {
    //TODO: Needs username and password
    var username = "aamsta";// this._loginModel.getUserName();
    var password = "aamsta";// this._loginModel.getPassWord();
    var credit = this._model.getCredit(username, password);
    this._view.setCredit(credit);
  },

};
