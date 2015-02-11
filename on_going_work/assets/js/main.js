/*
 * Main
 * @class Main
 * @constructor
 * Creates an MVC
 */
function Main() {
    this._controller;
}

Main.prototype = {
    _getViews: function () {
	var drinkView = new DrinkView({
	    'list': $('#drink_table'),
	    'input': $('#query'),
	    'addButton': $('#addButton')
	});

	var cartView = new CartView({
	    'cart': $('#cart')
	});

	return {drink: drinkView, cart: cartView};
    },
    
    _getModels: function () {
	var databaseModel = new DatabaseModel();
	var cartModel = new CartModel();

	return {database: databaseModel, cart: cartModel};
    },


    /* 
     * Creates an MVC and shows the view. 
     * @function run
     */
    run: function() {
	this._controller = new Controller(this._getModels(), this._getViews());
	this._controller.run();
    }
}

/* 
 * Executes Main after the DOM is ready. 
 * @function ready
 */
$(function () {
    var main = new Main();
    main.run();
});
