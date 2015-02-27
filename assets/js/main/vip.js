/*
 * Vip
 * @class Vip
 * @constructor
 * Creates an MVC
 */
function Vip() {
  /** @private */ this._controller = null;
}
Vip.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  /*
   * Get the models to be used in the system.
   * @function _getModel
   * @return {Models[]}
   */
  _getModel: function (model) {
    switch(model){
    case "cart":
      return new CartModel();
    case "drink":
      return new DrinkModel();
    case "login":
      return new LoginModel();
    case "menu":
      return new MenuModel();
    case "quick":
      return new QuickModel();
    }
  },
  /*
   * Get the views to be used in the system.
   * @function _getViews
   * @return {Views[]}
   */
  _getView: function (view) {
    switch(view) {
    case "cart":
      return new CartView({
	'cart': $('#cart_table'),
	'credit': $('#credit'),
	'totalPrice': $('#totalPrice'),
      });
    case "drink":
      return new DrinkView({
	'list': $('#drink_table'),
	'input': $('#query')
      });
    case "login":
      return new LoginView({
	'logout': $('#logoutBtn')
      });
    case "menu":
      return new MenuView({
	'menu': $('#menu')
      });
    case "quick":
      return new QuickView({
	'quickBuy': $('#quick_buy')
      });
    }
  },

  /*
   * Get the controllers to be used in the system.
   * @function _getControllers
   * @return {Controllers[]}
   */
  _getControllers: function () {
    var cartController = new CartController(this._getModel("cart"), this._getView("cart"));
    var drinkController = new DrinkController(this._getModel("drink"), this._getView("drink"));
    var loginController = new LoginController(this._getModel("login"), this._getView("login"));
    var menuController = new MenuController(this._getModel("menu"), this._getView("menu"));
    var quickController = new QuickController(this._getModel("quick"), this._getView("quick"));

    return {cart: cartController,
            drink: drinkController,
            login: loginController,
            menu: menuController,
            quick: quickController};
  },
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  /*
   * Creates an MVC and shows the view.
   * @function run
   */
  run: function() {
    this._controller = new VipController(this._getControllers());
    this._controller.run();
  }
};

/*
 * Executes Vip after the DOM is ready.
 * @function ready
 */
$(function () {
  var vip = new Vip();
  vip.run();
});
