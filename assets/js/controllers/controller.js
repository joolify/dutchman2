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
    /** @private */ this._menuModel = models.menu;
    /** @private */ this._menuView = views.menu;
    /** @private */ this._quickModel = models.quick;
    /** @private */ this._quickView = views.quick;
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
	this._drinkView.inputModified.attach(function (sender, args) {
	    _this.queryDrinks(args.query);
	});

	this._drinkView.addItem.attach(function (sender, args) {
	    _this.pushCartItem(args.itemId);
	});
    }

    if(this._databaseModel) {
	this._databaseModel.listUpdated.attach(function () {
            _this.refreshDrinks();
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
	    _this.incrementCartItem(args.itemId);
	});

	this._cartView.amountRemoved.attach(function (sender, args) {
	    _this.decrementCartItem(args.itemId);
	});

	this._cartView.logout.attach(function () {
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
	this._loginView.submitClicked.attach(function (sender, args) {
	    _this.login(args.username, args.password);
	});
    }

    if(this._loginModel) {
	this._loginModel.loginDone.attach(function () {
	    _this.checkLogin();
	});

	this._loginModel.logoutDone.attach(function () {
	    _this.checkLogin();
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

    /*
     * ===========================================================
     * == MENU LISTENER ==========================================
     * ===========================================================
     */
  if(this._menuView) {
    /*Listen for menu button clicks*/
  }

  if(this._menuModel) {
    this._menuModel.menuUpdated.attach(function (sender, args) {
      _this.refreshMenu(args.menuList);
    });
  }

  
    /*
     * ===========================================================
     * == QUICK LISTENER =========================================
     * ===========================================================
     */
  if(this._quickView) {
    /*Listen for quick buttons clicks*/
  }

  if(this._quickModel) {
    this._quickModel.quickUpdated.attach(function (sender, args) {
      _this.refreshQuick(args.quickList);
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
	this.checkLogin();
	var initSearch = "";
	this.queryDrinks(initSearch);
	this.refreshTotalPrice();
	this.refreshCredit();
      this.updateMenu();
      this.updateQuick();
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
     * @function refreshDrinks
     */
    refreshDrinks: function () {
	var itemList = this._databaseModel.getItemList();
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
	this._cartModel.addItemToCart(item);
	console.log("Controller.pushCartItem: ", itemId);
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
     * function incrementCartItem
     * @param itemId
     */
    incrementCartItem: function (itemId) {
	console.log("Controller.incrementCartItem: ", itemId);
	this._cartModel.addAmountToItem(itemId);
    },
    
    /* Increases the amount of an item.
     * @function decrementCartItem
     * @param itemId
     */
    decrementCartItem: function (itemId) {
	console.log("Controller.decrementCartItem: ", itemId);
	this._cartModel.removeAmountFromItem(itemId);
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

    },

    /*
     * ===========================================================
     * == MENU ===================================================
     * ===========================================================
     */
  updateMenu: function() {
    this._menuModel.update();
  },

  refreshMenu: function(menuList) {
    this._menuView.refresh(menuList);
  },

      /*
     * ===========================================================
     * == QUICK ==================================================
     * ===========================================================
     */
  updateQuick: function() {
    this._quickModel.update();
  },

  refreshQuick: function(quickList) {
    this._quickView.refresh(quickList);
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
