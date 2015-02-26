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

  /** @private */ this._languageModel = models.language;
  /** @private */ this._languageView = views.language;
  /** @private */ this._menuModel = models.menu;
  /** @private */ this._menuView = views.menu;
  /** @private */ this._quickModel = models.quick;
  /** @private */ this._quickView = views.quick;
  /** @private */ this._currentLanguage = null;

  var _this = this;


  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */


  /*
   * ===========================================================
   * == LANGUAGE LISTENER ======================================
   * ===========================================================
   */

  if(this._languageView) {
    this._languageView.languageSelected.attach(function (sender, args) {
      _this.getLanguage(args.language);
    });
  }

  /*
   * ===========================================================
   * == MENU LISTENER ==========================================
   * ===========================================================
   */
  if(this._menuView) {
    /*Listen for menu button clicks*/
  }

  if(this._menuModel) {
    this._menuModel.menuUpdated.attach(function (sender, args) {
      _this.refreshMenu(args.menuList);
    });
  }

  /*
   * ===========================================================
   * == QUICK LISTENER =========================================
   * ===========================================================
   */
  if(this._quickView) {
    /*Listen for quick buttons clicks*/
  }

  if(this._quickModel) {
    this._quickModel.quickUpdated.attach(function (sender, args) {
      _this.refreshQuick(args.quickList);
    });
  }
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
   * @function showDrinks
   */
  showDrinks: function() {
    console.log("Controller.showDrinks()");
    // this.isLoggedIn();
    this._loginController.run(); //TODO: needs username + password
    this._drinkController.run(); //TODO: needs username + password
    this._cartController.run(); //TODO: needs username + password
    this.updateMenu();
    this.updateQuick();
  },

  /*
   * Show the login 
   * @function showLogin
   */
  showLogin: function() {
    console.log("Controller.showLogin()");
    //this._loginController.run(); //TODO: needs username + password
  },


  /*
   * ===========================================================
   * == MENU ===================================================
   * ===========================================================
   */
  updateMenu: function() {
    this._menuModel.update();
  },

  refreshMenu: function(menuList) {
    this._menuView.refresh(menuList);
  },

  /*
   * ===========================================================
   * == QUICK ==================================================
   * ===========================================================
   */
  updateQuick: function() {
    this._quickModel.update();
  },

  refreshQuick: function(quickList) {
    this._quickView.refresh(quickList);
  },
  /*
   * ===========================================================
   * == TRANSLATION ============================================
   * ===========================================================
   */

  getLanguage: function(language) {
    var dictionary = this._languageModel.searchLanguage(language);
    this._languageView.translate(dictionary);
  }
};
