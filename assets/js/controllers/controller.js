/*
 * The controller responds to user actions and invokes changes on the model.
 * @class Controller
 * @param {Model[]} model
 * @param {Views[]} view
 * @constructor
 * Creates a Controller
 */
function Controller(models, views) {
    /** @private */
    this._cartView = views.cart;
    /** @private */
    this._cartModel = models.cart;
    /** @private */
    this._databaseModel = models.database;
    /** @private */
    this._drinkView = views.drink;
    /** @private */
    this._loginModel = models.login;
    /** @private */
    this._loginView = views.login;
    /** @private */
    this._languageModel = models.language;
    /** @private */
    this._languageView = views.language;
    /** @private */
    this._menuModel = models.menu;
    /** @private */
    this._menuView = views.menu;
    /** @private */
    this._quickModel = models.quick;
    /** @private */
    this._quickView = views.quick;
    /** @private */
    this._currentLanguage = null;
    /** @private */
    this._payView = views.pay;
    /** @private */
    this._payModel = models.pay;
    /** @private */
    if (typeof Wheel == 'function') {
        this._wheel = new Wheel('wheel', 50);
    }
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
    if (this._drinkView) {
        this._drinkView.searchFieldModified.attach(function(sender, args) {
            _this.queryDrinks(args.query);
        });

        this._drinkView.itemBtnPushed.attach(function(sender, args) {
            _this.pushCartItem(args.itemId);
        });

        this._drinkView.refreshDone.attach(function(sender, args) {
            _this._wheel.hide();
        });
    }

    if (this._databaseModel) {
        this._databaseModel.drinksUpdated.attach(function() {
            _this.queryMenu();
        });

    }
    /*
     * ===========================================================
     * == CART LISTENER ==========================================
     * ===========================================================
     */
    if (this._cartView) {
        this._cartView.popBtnClicked.attach(function(sender, args) {
            _this.popCartItem(args.itemId);
        });

        this._cartView.incrementBtnClicked.attach(function(sender, args) {
            _this.incrementCartItem(args.itemId);
        });

        this._cartView.amountRemoved.attach(function(sender, args) {
            _this.decrementCartItem(args.itemId);
        });

        this._cartView.logoutBtnClicked.attach(function() {
            _this.logout();
        });
    }
    if (this._cartModel) {
        this._cartModel.cartUpdated.attach(function() {
            _this.refreshCart();
            _this.refreshTotalPrice();
        });
        this._cartView.clearBtnClicked.attach(function() {

            _this.clearCart();
        });
    }
    /*
     * ===========================================================
     * == LOGIN LISTENER =========================================
     * ===========================================================
     */
    /* Login */
    if (this._loginView) {
        this._loginView.loginBtnClicked.attach(function(sender, args) {
            _this.login(args.username, args.password);
        });
    }

    if (this._loginModel) {
        this._loginModel.loginDone.attach(function() {
            _this.isLoggedIn();
        });

        this._loginModel.logoutDone.attach(function() {
            _this.isLoggedIn();
        });
    }

    /*
     * ===========================================================
     * == LANGUAGE LISTENER ======================================
     * ===========================================================
     */

    if (this._languageView) {
        this._languageView.languageSelected.attach(function(sender, args) {
            _this.updateLanguage(args.language);
        });
    }


    if (this._languageModel) {
        this._languageModel.languageUpdated.attach(function(sender, args) {
            _this.refreshLanguage(args.words);
        });
    }

    /*
     * ===========================================================
     * == MENU LISTENER ==========================================
     * ===========================================================
     */
    if (this._menuView) {
        /*Listen for menu button clicks*/
        this._menuView.menuBtnPushed.attach(function(sender, args) {
            _this._wheel.show();
            _this.queryMenu();
        });
    }

    if (this._menuModel) {
        this._menuModel.menuUpdated.attach(function(sender, args) {
            _this.refreshMenu(args.itemList);
        });

        this._menuModel.drinksUpdated.attach(function(sender, args) {
            _this.refreshDrinksMenu(args.itemList);
        });

        this._menuModel.menuStartUp.attach(function() {
            //_this.refreshDrinks();
            _this.updateMenu();
        });
    }


    /*
     * ===========================================================
     * == QUICK LISTENER =========================================
     * ===========================================================
     */
    if (this._quickView) {
        /*Listen for quick buttons clicks*/
        this._quickView.itemBtnPushed.attach(function(sender, args) {
            _this.pushCartItem(args.itemId);
        });
    }

  if(this._quickModel) {
    this._quickModel.quickUpdated.attach(function () {
      _this.refreshQuick();
    });
  }


    //if (this._quickModel) {
    //    this._quickModel.quickUpdated.attach(function(sender, args) {
    //        _this.refreshQuick(args.quickList);
    //    });
    //}

    /*
     * ===========================================================
     * == Pay Listener =========================================
     * ===========================================================
     */
    if (this._payView) {
        this._payView.paybuttonClicked.attach(function() {
            _this.buy();
        });

        this._payModel.emptyCart.attach(function() {
            _this.cartEmpty();
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
     * ======================== Pay functions  ==========================
     * ===========================================================
     */


    /*
     * calls the emptyCart function in payView
     */
    cartEmpty: function() {
        this._payView.emptyCart();
    },

    /*
     * Gets the cart username and password and sends the information to Paymodel so that the purchase can be processed.
     * After the purchase is completed it clears the cart and refreshes the view
     */
    buy: function() {
        var cart = this._cartModel.getCart(),
            totalSum = this._cartModel.getTotalPrice(),
            userName = this._loginModel.getUserName(),
            userPass = this._loginModel.getPassWord(),
            object = this._payModel.test(cart, totalSum, userName, userPass);
            
        if (object === "success") {
            this._cartModel._drop();
            this.refreshCart();
            this.refreshTotalPrice();
            this.refreshDrinks();
            this.refreshCredit();
            this.showDrinks();
        } else if (object === "cancel") {} else {
            console.log(object);
            this._payView.tooManyItems(object);
        }


    },
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
        this.isLoggedIn();
        var initSearch = "";

        this.queryDrinks(initSearch);
        this.queryRecommended();
        this.refreshTotalPrice();
        this.refreshCredit();
        this.startUpMenu();
        //this.updateMenu();
//        this.updateQuick();
        this.refreshDictionary();
    },

    queryRecommended: function () {
    console.log("Controller.queryRecommended");
    var username = this._loginModel.getUserName();
    var password = this._loginModel.getPassWord();
    this._quickModel.query(username, password);
    },

    /*
     * Show the login
     * @function showLogin
     */
    showLogin: function() {
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
    refreshDrinks: function() {
        this._wheel.show();
        var itemList = this._databaseModel.getItems();
        this._drinkView.refresh(itemList);
    },

    /* Queries the DatabaseModel
     * @function queryDrinks
     */
    queryDrinks: function(query) {
        this._wheel.show();
        var username = this._loginModel.getUserName();
        var password = this._loginModel.getPassWord();
        this._databaseModel.query(query, username, password);
    },


    /*
     * ===========================================================
     * == CART ===================================================
     * ===========================================================
     */

    /*
     * Clears the cart and refreshes the view
     */
    clearCart: function() {
        this._cartModel._drop();
        this.refreshCart();
    },

    /* Add an item to the CartModel
     * @function pushCartItem
     * @param itemId
     */
    pushCartItem: function(itemId) {
        var item = this._databaseModel.getItem(itemId);
        this._cartModel.push(item);
        console.log("Controller.pushCartItem: ", itemId);
    },
    /*
     * Remove an item from the CartModel
     * @function popCartItem
     * @param {Integer} itemId
     */
    popCartItem: function(itemId) {
        console.log("Controller.popCartItem: ", itemId);
        this._cartModel.pop(itemId);
    },
    /* Increases the amount of an item.
     * function incrementCartItem
     * @param itemId
     */
    incrementCartItem: function(itemId) {
        console.log("Controller.incrementCartItem: ", itemId);
        this._cartModel.increment(itemId);
    },

    /* Increases the amount of an item.
     * @function decrementCartItem
     * @param itemId
     */
    decrementCartItem: function(itemId) {
        console.log("Controller.decrementCartItem: ", itemId);
        this._cartModel.decrement(itemId);
    },

    /*
     * Refreshes the CartView
     * @function refreshCart
     */
    refreshCart: function() {
        var cartItemList = this._cartModel.getCart();
        console.log("Controller.refreshCart: " + cartItemList.length);
        this._cartView.refresh(cartItemList);
    },

    /*
     * Refreshes the total price
     * @function refreshTotalPrice
     */
    refreshTotalPrice: function() {
        var totalPrice = this._cartModel.getTotalPrice();
        this._cartView.setTotalPrice(totalPrice);
    },
    /*
     * Refreshes the credit
     * @function refreshCredit
     */

    refreshCredit: function() {
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
    _redirect: function(page) {
        console.log("Controller._redirect: ", page);
        window.location.href = page;
    },

    /*
     * Get the current file name of a page
     * @function _getCurrentPage
     * @return {String}
     */
    _getCurrentPage: function() {
        var url = window.location.pathname;
        var filename = url.substring(url.lastIndexOf('/') + 1);
        return filename;
    },

    /* Check if user is on the right page, or should be redirected
     * @function _isCurrentPage
     * @return {Boolean}
     */
    _isCurrentPage: function(page) {
        return (this._getCurrentPage() == page);
    },
    /*
     * Login to the system
     * @function login
     * @param username
     * @param password
     */
    login: function(username, password) {
        console.log("Controller.login: ", username, password);
        this._loginModel.login(username, password);
    },

    /*
     * Log out and redirects to index.html
     * @function logout
     */
    logout: function() {
        console.log("Controller.logout");
        this._loginModel.logout();
    },

    /* Checks if the login was successful, if so redirect if needed.
     * @function isLoggedIn
     */
    isLoggedIn: function() {
        var page = "index.html";
        var isLoggedIn = +this._loginModel.isLoggedIn();
        if (isLoggedIn) {
            console.log("Controller.isLoggedIn: " + isLoggedIn);
            var user = +this._loginModel.getUserType();
            if (0 == user) {
                page = "vip.html";
            } else if (1 == user) {
                page = "vip.html";

                //FIXME
                //this.logout(); // Just to not get caught in admin.html...
            }
        }
        console.log("Controller.isLoggedIn: " + page);
        if (!this._isCurrentPage(page)) {
            this._redirect(page);
        }

        if (this._loginModel.hasError() && this._isCurrentPage("index.html")) {
            this._loginView.showErrorMsg();
        }

    },

    /*
     * ===========================================================
     * == MENU ===================================================
     * ===========================================================
     */
    updateMenu: function() {
        var username = this._loginModel.getUserName();
        var password = this._loginModel.getPassWord();
        var itemList = this._menuModel.getItems();
        this._menuModel.update(username, password, itemList);
    },

    refreshMenu: function(itemList) {
        this._menuView.refresh(itemList);
    },


    queryMenu: function() {

        console.log("Controller.queryMenu: " + query);
        var username = this._loginModel.getUserName();
        var password = this._loginModel.getPassWord();
        var itemList = this._databaseModel.getItems();
        var query = this._menuView.getMenuClicked();
        this._menuModel.queryMenu(query, username, password, itemList);
    },

    refreshDrinksMenu: function(itemList) {
        this._wheel.show();
        this._drinkView.refresh(itemList);
    },

    startUpMenu: function() {
        var username = this._loginModel.getUserName();
        var password = this._loginModel.getPassWord();
        this._menuModel.startUp(username, password);
    },

    /*
     * ===========================================================
     * == QUICK ==================================================
     * ===========================================================
     */
//    updateQuick: function() {
//        this._quickModel.update();
//    },

  refreshQuick: function() {
    var itemList = this._quickModel.getItems();
//    console.log("Controller.refreshQuick: " + itemList.length);
//    console.log("Itemlist from controller: " + itemList);
    this._quickView.refresh(itemList);
  },
    /*
     * ===========================================================
     * == TRANSLATION ============================================
     * ===========================================================
     */

    initLanguage: function(language) {
        this._languageModel.setDictionary(language);
    },

    updateLanguage: function(language) {
        this._languageModel.setDictionary(language);
    },

    refreshLanguage: function(words) {
        console.log("refreshLanguage", words);
        this._languageView.translate(words);
    },

    refreshDictionary: function() {
        var words = this._languageModel.getDictionary();
        this.refreshLanguage(words);
    }
};
