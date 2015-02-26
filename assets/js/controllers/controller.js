/*
 * The controller responds to user actions and invokes changes on the model.
 * @class Controller
 * @param {Model[]} model
 * @param {Views[]} view
 * @constructor
 * Creates a Controller
 */
function Controller(models, views) {
    /** @private */ this._drinkController = new DrinkController(models.database, views.drink);
    /** @private */ this._cartController = new CartController(models.cart, views.cart);

    /** @private */ this._cartView = views.cart;
    /** @private */ this._cartModel = models.cart;
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
	this.isLoggedIn();
      this._drinkController.run(); //TODO: needs username + password
      this._cartController.run(); //TODO: needs username + password
      this.updateMenu();
      this.updateQuick();
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
     * @function _getCurrentPage
     * @return {String}
     */
    _getCurrentPage: function () {
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/')+1);
	return filename;
    },
    
    /* Check if user is on the right page, or should be redirected
     * @function _isCurrentPage
     * @return {Boolean}
     */
    _isCurrentPage: function (page) {
    	return (this._getCurrentPage() == page);
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
