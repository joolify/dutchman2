/*
 * Vip
 * @class Vip
 * @constructor
 * Creates an MVC
 */
function Vip() {
    this._controller = null;
}
Vip.prototype = {
    /*
     * Get the views to be used in the system.
     * @function _getViews
     * @return {Views[]}
     */
    _getViews: function () {
	
	var cartView = new CartView({
	    'cart': $('#cart'),
	    'credit': $('#credit'),
	    'totalPrice': $('#totalPrice')
	});

	var drinkView = new DrinkView({
	    'list': $('#drink_table'),
	    'input': $('#query')
	});
	
	var menuView = new MenuView({
		'menu': $('#menu')
	});
	
	
	return {cart: cartView, drink: drinkView, menu: menuView};
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
	var menuModel = new MenuModel();

	return {cart: cartModel, database: databaseModel, login: loginModel, menu: menuModel};
    },

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
