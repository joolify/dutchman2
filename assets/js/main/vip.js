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
     * Get the views to be used in the system.
     * @function _getViews
     * @return {Views[]}
     */
    _getViews: function () {
	var cartView = new CartView({
	    'cart': $('#cart_table'),
	    'credit': $('#credit'),
	    'totalPrice': $('#totalPrice'),
	    'logout': $('#logout')
	});

	var drinkView = new DrinkView({
	    'list': $('#drink_table'),
	    'input': $('#query')
	});

	var menuView = new MenuView({
	    'menu': $('#menu')
	});

	var payView = new payView({
	});

      return {cart: cartView, drink: drinkView, menu: menuView, payV: payView};
    },
    /*
     * Get the models to be used in the system.
     * @function _getModels
     * @return {Models[]}
     */
    _getModels: function () {
	var databaseModel = new DatabaseModel();
	var cartModel = new CartModel();
	var loginModel = new LoginModel();
	var payModel = new PayModel();
	return {cart: cartModel, database: databaseModel, login: loginModel, pay: payModel};

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
	this._controller = new Controller(this._getModels(), this._getViews());
	this._controller.showDrinks();
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
