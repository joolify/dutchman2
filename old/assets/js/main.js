/*
 * Main
 * @class Main
 * @constructor
 * Creates an MVC
 */
function Main() {
    this._controller = null;
}
Main.prototype = {
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

	return {cart: cartView, drink: drinkView};
    },
    /*
     * Get the models to be used in the system.
     * @function _getModels
     * @return {Models[]}
     */
    _getModels: function () {
	var databaseModel = new DatabaseModel();
	var cartModel = new CartModel();

	return {cart: cartModel, database: databaseModel};
    },

    /* 
     * Creates an MVC and shows the view. 
     * @function run
     */
    run: function() {
	this._controller = new Controller(this._getModels(), this._getViews());
	this._controller.run();
    }
};

/* 
 * Executes Main after the DOM is ready. 
 * @function ready
 */
$(function () {
    var main = new Main();
    main.run();
});
