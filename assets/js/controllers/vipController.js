function VipController(controllers) {
  /** @private */ this._cartController = controllers.cart;
  /** @private */ this._drinkController = controllers.drink;
  /** @private */ this._loginController = controllers.login;
  /** @private */ this._menuController = controllers.menu;
  /** @private */ this._quickController = controllers.quick;

  var _this = this;

  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._drinkController) {
    this._drinkController.itemPushed.attach(function (sender, args) {
      _this._pushItemToCart(args.item);
    });

    this._drinkController.requestUserName.attach(function(sender, callback) {
      _this._getUserName(callback);
    });

    this._drinkController.requestPassWord.attach(function(sender, callback) {
      _this._getPassWord(callback);
    });
  }

  if(this._cartController) {
    this._cartController.requestUserName.attach(function(sender, callback) {
      _this._getUserName(callback);
    });

    this._cartController.requestPassWord.attach(function(sender, callback) {
      _this._getPassWord(callback);
    });
  }

}

VipController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  _getUserName(callback) {
    var userName = this._loginController.getUserName();
      $.ajax({
        success: callback(userName)
      });
  },

  _getPassWord(callback) {
    var passWord = this._loginController.getPassWord();
      $.ajax({
        success: callback(passWord)
      });
  },

  _pushItemToCart: function(item) {
    console.log("VipController._pushItemToCart: " + item);
    this._cartController.push(item);
  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  run: function () {
    console.log("VipController.run()");
    this._loginController.run(); //TODO: needs username + password
    this._drinkController.run(); //TODO: needs username + password
    this._cartController.run(); //TODO: needs username + password
    this._menuController.run();
    this._quickController.run();
  }
};
