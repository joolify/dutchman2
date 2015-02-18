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
    this._loginModel = models.login;
    this._loginView = views.login;
    this._languageModel = models.language;
    this._currentLanguage = null;

    var _this = this;

    /*
     * Event listeners
     */

    /* DrinkView */
    if(this._drinkView) {
	this._drinkView.inputModified.attach(function (sender, args) {
	    _this.queryDatabaseModel(args.query);
	});

	this._drinkView.addItem.attach(function (sender, args) {
	    _this.addToCartModel(args.itemId);
	});
    }
    /* DatabaseModel */
    if(this._databaseModel) {
	this._databaseModel.listUpdated.attach(function () {
            _this.refreshDrinkView();
	});
    }
    /* Cart */
    if(this._cartModel) {
	this._cartModel.cartUpdated.attach(function () {
	    _this.refreshCartView();
	    _this.refreshTotalPrice();
	    _this.refreshCredit();
	});
    }
    if(this._cartView) {
	this._cartView.amountAdded.attach(function (sender, args) {
	    _this.addAmountToCartModel(args.itemId);
	});

	this._cartView.amountRemoved.attach(function (sender, args) {
	    _this.removeAmountFromCartModel(args.itemId);
	});
    }
    /* Login */ 
    if(this._loginView) {
	this._loginView.submitClicked.attach(function (sender, args) {
	    _this.login(args.username, args.password);
	});
    }

    if(this._loginModel) {
	this._loginModel.loginDone.attach(function (sender, args) {
	    _this.checkLogin(args.msg);
	});
    }
}

Controller.prototype = {
    /*
     * Show the drink table
     * @function showDrinks
     */
    showDrinks: function() {
	console.log("Controller.showDrinks()");
	this.checkUser();
	var initSearch = "";
	this._databaseModel.query(initSearch);
	this.refreshTotalPrice();
	this.refreshCredit();
    },

    /*
     * Show the login 
     * @function showLogin
     */
    showLogin: function() {
	console.log("Controller.showLogin()");
	this.checkUser();
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
    },

    /*
     * Refreshes the total price
     * @function refreshTotalPrice
     */
    refreshTotalPrice: function () {
	var totalPrice = this._cartModel.getTotalPrice();
	this._cartView.setTotalPrice(totalPrice);
    },
     /*
     * Refreshes the credit
     * @function refreshCredit
     */

    refreshCredit: function () {
	var credit = this._cartModel.getCredit();
	this._cartView.setCredit(credit);
    },
    /*
     * Login to the system
     * @function login
     * @param username
     * @param password
     */ 
    login: function (username, password) {
	console.log("Controller.login: ", username, password);
	this._loginModel.login(username, password);
    },
    /*
     * Redirects to a new page
     * @function redirect
     * @param page
     */ 
    redirect: function (page) {
	console.log("Controller.redirect: ", page);
	window.location.href = page;
    },
    /* Checks if the login was successful
     * @function checkLogin
     * @param msg
     */
    checkLogin: function (msg) {
	switch(msg) {
	case 0:
	    console.log("Controller.checkLogin: vip.html");
	    this._loginModel.setUser(msg);
	    this.redirect("vip.html");
	    break;
	case 1:
	    console.log("Controller.checkLogin: admin.html");
	    this._loginModel.setUser(msg);
	    this.redirect("admin.html");
	    break;
	default:
	    console.log("Controller.checkLogin: login.html");
	    this._loginView.errorLogin();
	}
    },

    /* Checks what kind of user it is
     * @function checkUser
     */
    checkUser: function () {
	var user = +this._loginModel.getUser();
	console.log("Controller.checkUser:", user);
	switch(user) {
	case 0:
	    console.log("Controller.checkUser: vip");
	    break;
	case 1:
	    console.log("Controller.checkUser: admin");
	    break;
	default:
	    console.log("Controller.checkUser: unauthorized");
	    this.redirect("index.html");
	}
    }
};
