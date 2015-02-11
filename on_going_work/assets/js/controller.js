/*
 * The Controller. Controller responds to user actions and invokes changes on the model.
 * @class Controller
 * @param {DatabaseModel} model
 * @param {DrinkView} view
 * @constructor
 * Creates a Controller
 */
function Controller(models, views) {
    this._cartView = views.cart;
    this._databaseModel = models.database;
    this._cartModel = models.cart;
    this._drinkView = views.drink;
    this._langModel = models.language;
    this._currentLanguage = null;

    var _this = this;

    this._drinkView.inputModified.attach(function () {
	_this.queryDatabaseModel();
    });

    this._drinkView.addItem.attach(function (sender, args) {
	_this.addToCartModel(args.itemId);
    });

    this._databaseModel.listUpdated.attach(function () {
        _this.refreshDrinkView();
    });

    this._cartModel.cartUpdated.attach(function () {
	_this.refreshCartView();
    });

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
    queryDatabaseModel: function () {
	var query = this._drinkView.getQuery();
	console.log("Controller.queryDatabaseModel: "+ query);
	this._databaseModel.query(query);
    },
    addToCartModel: function (itemId) {
	var item = this._databaseModel.getItem(itemId);
	this._cartModel.addItemToCart(item);
	console.log("Controller.addToCartModel: ", itemId);
    },
    addAmountToCartModel: function (itemId) {
	console.log("Controller.addAmountToCartModel: ", itemId);
	this._cartModel.addAmountToItem(itemId);
    },
    removeAmountFromCartModel: function (itemId) {
	console.log("Controller.removeAmountFromCartModel: ", itemId);
	this._cartModel.removeAmountFromItem(itemId);
    },
    /*
     * Refreshes the drink view
     * @function refreshDrinkView
     */
    refreshDrinkView: function () {
	var itemList = this._databaseModel.getItemList();
	console.log("Controller.refreshDrinkView: " + itemList.length);
	this._drinkView.refresh(itemList);
    },

    refreshCartView: function () {
	var cartItemList = this._cartModel.getCart();
	console.log("Controller.refreshCartView: " + cartItemList.length);
	this._cartView.refresh(cartItemList);
    }
};
