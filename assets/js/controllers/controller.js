/*
 * The controller responds to user actions and invokes changes on the model.
 * @class Controller
 * @param {Model[]} model
 * @param {Views[]} view
 * @constructor
 * Creates a Controller
 */
function Controller(models, views) {
    /** @private */ this._cartView = views.cart;
    /** @private */ this._cartModel = models.cart;
    /** @private */ this._databaseModel = models.database;
    /** @private */ this._drinkView = views.drink;
    /** @private */ this._loginModel = models.login;
    /** @private */ this._loginView = views.login;
    /** @private */ this._languageModel = models.language;
    /** @private */ this._currentLanguage = null;
    this._payModel = models.pay;

    var _this = this;

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */

    /*
     * ===========================================================
     * == DRINK LISTENER =========================================
     * ===========================================================
     */
    if(this._drinkView) {
	this._drinkView.inputModified.attach(function (sender, args) {
	    _this.queryDatabaseModel(args.query);
	});

	this._drinkView.addItem.attach(function (sender, args) {
	    _this.addToCartModel(args.itemId);
	});
    }

    if(this._databaseModel) {
	this._databaseModel.listUpdated.attach(function () {
            _this.refreshDrinkView();
	});
    }
    /*
     * ===========================================================
     * == CART LISTENER ==========================================
     * ===========================================================
     */
    if(this._cartView) {
	this._cartView.itemRemoved.attach(function (sender, args) {
	    _this.removeItemFromCartModel(args.itemId);
	});

	this._cartView.amountAdded.attach(function (sender, args) {
	    _this.addAmountToCartModel(args.itemId);
	});

	this._cartView.amountRemoved.attach(function (sender, args) {
	    _this.removeAmountFromCartModel(args.itemId);
	});

	this._cartView.logout.attach(function () {
	    _this.logout();
	});
    }
    if(this._cartModel) {
	this._cartModel.cartUpdated.attach(function () {
	    _this.refreshCartView();
	    _this.refreshTotalPrice();
	});
    }
    /*
     * ===========================================================
     * == LOGIN LISTENER =========================================
     * ===========================================================
     */
    /* Login */ 
    if(this._loginView) {
	this._loginView.submitClicked.attach(function (sender, args) {
	    _this.login(args.username, args.password);
	});
    }

    if(this._loginModel) {
	this._loginModel.loginDone.attach(function () {
	    _this.checkLogin();
	});

    }
    if (this._payModel) {
        document.getElementById('button').onclick = function () {
            _this.test();
        }
    }
    this._loginModel.logoutDone.attach(function () {
        _this.checkLogin();
    });

}


	

Controller.prototype = {
    test: function () {
        var cart = this._cartModel.getCart();
        var totalSum = this._cartModel.getTotalPrice();
        var user = "0" //this._loginModel.getUser()
        console.log("pengar", totalSum);
        console.log("antal", cart.length);
        console.log("user", user);
        this._payModel.test(cart, totalSum, user);
        this._cartModel._drop();

        this.refreshCartView();
        this.refreshTotalPrice();
        this.refreshDrinkView();
        this.refreshCredit();
        this.showDrinks();
    },
    
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
	this.checkLogin();
	var initSearch = "";
	this.queryDatabaseModel(initSearch);
	this.refreshTotalPrice();
	this.refreshCredit();
    },

    /*
     * Show the login 
     * @function showLogin
     */
    showLogin: function() {
	console.log("Controller.showLogin()");
	this.checkLogin();
    },

    /*
     * ===========================================================
     * == DRINK ==================================================
     * ===========================================================
     */

    /*
     * Refreshes the DrinkView
     * @function refreshDrinkView
     */
    refreshDrinkView: function () {
	var itemList = this._databaseModel.getItemList();
	console.log("Controller.refreshDrinkView: " + itemList.length);
	this._drinkView.refresh(itemList);
    },

    /* Queries the DatabaseModel
     * @function queryDatabaseModel
     */
    queryDatabaseModel: function (query) {
	console.log("Controller.queryDatabaseModel: "+ query);
	var username = this._loginModel.getUserName();
	var password = this._loginModel.getPassWord();
	this._databaseModel.query(query, username, password);
    },

    /*
     * ===========================================================
     * == CART ===================================================
     * ===========================================================
     */

    /* Add an item to the CartModel
     * @function addToCartModel
     * @param itemId
     */
    addToCartModel: function (itemId) {
	var item = this._databaseModel.getItem(itemId);
	this._cartModel.addItemToCart(item);
	console.log("Controller.addToCartModel: ", itemId);
    },
    /*
     * Remove an item from the CartModel
     * @function removeItemFromCartModel
     * @param {Integer} itemId
     */
    removeItemFromCartModel: function (itemId) {
	console.log("Controller.removeItemFromCartModel: ", itemId);
	this._cartModel.removeItem(itemId);
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
	var username = this._loginModel.getUserName();
	var password = this._loginModel.getPassWord();
	var credit = this._cartModel.getCredit(username, password);
	this._cartView.setCredit(credit);
    },


    /*
     * ===========================================================
     * == LOGIN ==================================================
     * ===========================================================
     */

    /*
     * Redirects to a new page
     * @function redirect
     * @param page
     */ 
    redirect: function (page) {
	console.log("Controller.redirect: ", page);
	window.location.href = page;
    },

    /*
     * Get the current file name of a page
     * @function getCurrentPage
     * @return {String}
     */
    getCurrentPage: function () {
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/')+1);
	return filename;
    },
    
    /* Check if user is on the right page, or should be redirected
     * @function isCurrentPage
     * @return {Boolean}
     */
    isCurrentPage: function (page) {
    	return (this.getCurrentPage() == page);
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
     * Log out and redirects to index.html
     * @function logout
     */
    logout: function () {
	console.log("Controller.logout");
	this._loginModel.logout();
    },

    /* Checks if the login was successful, if so redirect if needed.
     * @function checkLogin
     */
    checkLogin: function () {
	var page = "index.html";
	var isLoggedIn = +this._loginModel.isLoggedIn();
	if(isLoggedIn) {
	    console.log("Controller.checkLogin: " + isLoggedIn);
	    var user = +this._loginModel.getUserType();
	    if(0 == user) {
		page = "vip.html";
	    }else if(1 == user) {
		page = "admin.html";

		//FIXME
		this.logout(); // Just to not get caught in admin.html...
	    }
	} 	
	console.log("Controller.checkLogin: " + page);
	if(!this.isCurrentPage(page)) {
	    this.redirect(page);
	}

	if(this._loginModel.getError() && this.isCurrentPage("index.html")) {
	    this._loginView.errorLogin();
	}

    }
};
