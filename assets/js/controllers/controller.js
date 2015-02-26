/*
  * The controller responds to user actions and invokes changes on the model.
  * @class Controller
  * @param {Model[]} model
  * @param {Views[]} view
  * @constructor
  * Creates a Controller
*/
function Controller(models, views) {
  //TODO: Fix some sort of check here
  if(models.database && views.drink) {
    /** @private */ this._drinkController = new DrinkController(models.database, views.drink);
  }
  if(models.cart && views.cart) {
    /** @private */ this._cartController = new CartController(models.cart, views.cart);
  }
  if(models.login && views.login) {
    /** @private */ this._loginController = new LoginController(models.login, views.login);
  }

  if(models.language && views.language) {
    /** @private */ this._languageController = new LanguageController(models.language, views.language);
  }
  if(models.menu && views.menu) {
    /** @private */ this._menuController = new MenuController(models.menu, views.menu);
  }
  if(models.quick && views.quick) {
  console.log("Controller()", models.quick, views.quick);
    /** @private */ this._quickController = new QuickController(models.quick, views.quick);
  }

  var _this = this;


  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
}


Controller.prototype = {
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  /*
   * ===========================================================
   * == SHOW ===================================================
   * ===========================================================
   */
  /*
   * Show the drink table
   * @function run
   */
  run: function() {
    console.log("Controller.run()");
    this._loginController.run(); //TODO: needs username + password
    this._drinkController.run(); //TODO: needs username + password
    this._cartController.run(); //TODO: needs username + password
    this._menuController.run();
    this._quickController.run();
  },

  /*
   * Show the login
   * @function showLogin
   */
  showLogin: function() {
    console.log("Controller.showLogin()");
    this._languageController.run(); //TODO: needs username + password
    //this._loginController.run(); //TODO: needs username + password
  },
};
