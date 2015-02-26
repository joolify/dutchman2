/*
  * The controller responds to user actions and invokes changes on the model.
  * @class Controller
  * @param {Model[]} model
  * @param {Views[]} view
  * @constructor
  * Creates a Controller
*/
function VipController(models, views) {
  /** @private */ this._cartController = new CartController(models.cart, views.cart);
  /** @private */ this._drinkController = new DrinkController(models.database, views.drink);
  /** @private */ this._loginController = new LoginController(models.login, views.login);
  /** @private */ this._languageController = new LanguageController(models.language, views.language);
  /** @private */ this._menuController = new MenuController(models.menu, views.menu);
  /** @private */ this._quickController = new QuickController(models.quick, views.quick);

  var _this = this;

  console.log("VipController()", this._model, this._view);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
}

VipController.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
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
