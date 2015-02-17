/*
 * The controller responds to user actions and invokes changes on the model.
 * @class Controller
 * @param {Model[]} model
 * @param {Views[]} view
 * @constructor
 * Creates a Controller
 */
function Controller(models, views) {
    this._cartView = views.cart;
    this._cartModel = models.cart;
    this._databaseModel = models.database;
    this._drinkView = views.drink;
    this._languageModel = models.language;
    this._currentLanguage = null;

    var _this = this;

   /*
    * Event listeners
    */

    /* DrinkView */
    this._drinkView.inputModified.attach(function (sender, args) {
	_this.queryDatabaseModel(args.query);
    });

    this._drinkView.addItem.attach(function (sender, args) {
	_this.addToCartModel(args.itemId);
    });

    /* DatabaseModel */
    this._databaseModel.listUpdated.attach(function () {
        _this.refreshDrinkView();
    });

    /* CartModel */
    this._cartModel.cartUpdated.attach(function () {
	_this.refreshCartView();
    });

    /* CartView */
    this._cartView.amountAdded.attach(function (sender, args) {
	_this.addAmountToCartModel(args.itemId);
    });

    this._cartView.amountRemoved.attach(function (sender, args) {
	_this.removeAmountFromCartModel(args.itemId);
    });

    
}

Controller.prototype = {
    /*
     * Runs the system
     * @function run
     */
    run: function() {
	console.log("Controller.run()");
	var initSearch = "";
	this._databaseModel.query(initSearch);
    },
     
    /* Queries the DatabaseModel
     * @function queryDatabaseModel
     */
    queryDatabaseModel: function (query) {
	console.log("Controller.queryDatabaseModel: "+ query);
	this._databaseModel.query(query);
    },

    /* Add an item to the CartModel
     * @function addToCartModel
     * @param itemId
     */
    addToCartModel: function (itemId) {
	var item = this._databaseModel.getItem(itemId);
	this._cartModel.addItemToCart(item);
	console.log("Controller.addToCartModel: ", itemId);
    },

    /* Increases the amount of an item.
     * function addAmountToCartModel
     * @param itemId
     */
    addAmountToCartModel: function (itemId) {
	console.log("Controller.addAmountToCartModel: ", itemId);
	this._cartModel.addAmountToItem(itemId);
    },

    
    /* Increases the amount of an item.
     * @function removeAmountFromCartModel
     * @param itemId
     */
    removeAmountFromCartModel: function (itemId) {
	console.log("Controller.removeAmountFromCartModel: ", itemId);
	this._cartModel.removeAmountFromItem(itemId);
    },
    /*
     * Refreshes the DrinkView
     * @function refreshDrinkView
     */
    refreshDrinkView: function () {
	var itemList = this._databaseModel.getItemList();
	console.log("Controller.refreshDrinkView: " + itemList.length);
	this._drinkView.refresh(itemList);
    },

    /*
     * Refreshes the CartView
     * @function refreshCartView
     */
    refreshCartView: function () {
	var cartItemList = this._cartModel.getCart();
	console.log("Controller.refreshCartView: " + cartItemList.length);
	this._cartView.refresh(cartItemList);
    }
};
