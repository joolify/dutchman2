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
    /** @private */ this._languageView = views.language;
    /** @private */ this._currentLanguage = null;

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
	this._drinkView.searchFieldModified.attach(function (sender, args) {
	    _this.queryDrinks(args.query);
	});

	this._drinkView.itemBtnPushed.attach(function (sender, args) {
	    _this.pushCartItem(args.itemId);
	});
    }

    if(this._databaseModel) {
	this._databaseModel.drinksUpdated.attach(function () {
            _this.refreshDrinks();
	});
    }
    /*
     * ===========================================================
     * == CART LISTENER ==========================================
     * ===========================================================
     */
    if(this._cartView) {
	this._cartView.popBtnClicked.attach(function (sender, args) {
	    _this.popCartItem(args.itemId);
	});

	this._cartView.incrementBtnClicked.attach(function (sender, args) {
	    _this.incrementCartItem(args.itemId);
	});

	this._cartView.amountRemoved.attach(function (sender, args) {
	    _this.decrementCartItem(args.itemId);
	});

	this._cartView.logoutBtnClicked.attach(function () {
	    _this.logout();
	});
    }
    if(this._cartModel) {
	this._cartModel.cartUpdated.attach(function () {
	    _this.refreshCart();
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
	this._loginView.loginBtnClicked.attach(function (sender, args) {
	    _this.login(args.username, args.password);
	});
    }

    if(this._loginModel) {
	this._loginModel.loginDone.attach(function () {
	    _this.isLoggedIn();
	});

	this._loginModel.logoutDone.attach(function () {
	    _this.isLoggedIn();
	});
    }

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
	this.isLoggedIn();
	var initSearch = "";
	this.queryDrinks(initSearch);
	this.refreshTotalPrice();
	this.refreshCredit();
    },

    /*
     * Show the login 
     * @function showLogin
     */
    showLogin: function() {
	console.log("Controller.showLogin()");
	this.isLoggedIn();
    },

    /*
     * ===========================================================
     * == DRINK ==================================================
     * ===========================================================
     */

    /*
     * Refreshes the DrinkView
     * @function refreshDrinks
     */
    refreshDrinks: function () {
	var itemList = this._databaseModel.getItems();
	console.log("Controller.refreshDrinks: " + itemList.length);
	this._drinkView.refresh(itemList);
    },

    /* Queries the DatabaseModel
     * @function queryDrinks
     */
    queryDrinks: function (query) {
	console.log("Controller.queryDrinks: "+ query);
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
     * @function pushCartItem
     * @param itemId
     */
    pushCartItem: function (itemId) {
	var item = this._databaseModel.getItem(itemId);
	this._cartModel.push(item);
	console.log("Controller.pushCartItem: ", itemId);
    },
    /*
     * Remove an item from the CartModel
     * @function popCartItem
     * @param {Integer} itemId
     */
    popCartItem: function (itemId) {
	console.log("Controller.popCartItem: ", itemId);
	this._cartModel.pop(itemId);
    },
    /* Increases the amount of an item.
     * function incrementCartItem
     * @param itemId
     */
    incrementCartItem: function (itemId) {
	console.log("Controller.incrementCartItem: ", itemId);
	this._cartModel.increment(itemId);
    },
    
    /* Increases the amount of an item.
     * @function decrementCartItem
     * @param itemId
     */
    decrementCartItem: function (itemId) {
	console.log("Controller.decrementCartItem: ", itemId);
	this._cartModel.decrement(itemId);
    },

    /*
     * Refreshes the CartView
     * @function refreshCart
     */
    refreshCart: function () {
	var cartItemList = this._cartModel.getCart();
	console.log("Controller.refreshCart: " + cartItemList.length);
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
     * @function _redirect
     * @param page
     */ 
    _redirect: function (page) {
	console.log("Controller._redirect: ", page);
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
     * @function _isCurrentPage
     * @return {Boolean}
     */
    _isCurrentPage: function (page) {
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
     * @function isLoggedIn
     */
    isLoggedIn: function () {
	var page = "index.html";
	var isLoggedIn = +this._loginModel.isLoggedIn();
	if(isLoggedIn) {
	    console.log("Controller.isLoggedIn: " + isLoggedIn);
	    var user = +this._loginModel.getUserType();
	    if(0 == user) {
		page = "vip.html";
	    }else if(1 == user) {
		page = "admin.html";

		//FIXME
		this.logout(); // Just to not get caught in admin.html...
	    }
	} 	
	console.log("Controller.isLoggedIn: " + page);
	if(!this._isCurrentPage(page)) {
	    this._redirect(page);
	}

	if(this._loginModel.hasError() && this._isCurrentPage("index.html")) {
	    this._loginView.showErrorMsg();
	}

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
