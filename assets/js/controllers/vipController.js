function VipController(models, views) {
  /** @private */ this._cartController = new CartController(models.cart, views.cart);
  /** @private */ this._drinkController = new DrinkController(models.drink, views.drink);
  /** @private */ this._loginController = new LoginController(models.login, views.login);
  /** @private */ this._languageController = new LanguageController(models.language, views.language);
  /** @private */ this._menuController = new MenuController(models.menu, views.menu);
  /** @private */ this._quickController = new QuickController(models.quick, views.quick);

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
