function LoginController(model, view) {
  /** @private */ this._model = model;
  /** @private */ this._view = view;

  var _this = this;

  console.log("LoginController()", this._model, this._view);
  /*
   * ===========================================================
   * ==================== EVENT LISTENERS ======================
   * ===========================================================
   */
  if(this._view) {
    this._view.loginBtnClicked.attach(function (sender, args) {
      _this.login(args.username, args.password);
    });

    this._view.logoutBtnClicked.attach(function () {
      _this.logout();
    });
  }

  if(this._model) {
    this._model.loginDone.attach(function () {
      console.log("LoginController.loginDone");
      _this.isLoggedIn();
    });

    this._model.logoutDone.attach(function () {
      _this.isLoggedIn();
    });
  }
}

LoginController.prototype = {
  run: function () {
    console.log("LoginController.run()");
    this.isLoggedIn();
  },
  /*
   * Redirects to a new page
   * @function _redirect
   * @param page
   */
  _redirect: function (page) {
    console.log("LoginController._redirect: ", page);
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
    console.log("LoginController.login: ", username, password);
    this._model.login(username, password);
  },

  /*
   * Log out and redirects to index.html
   * @function logout
   */
  logout: function () {
    console.log("LoginController.logout");
    this._model.logout();
  },

  /* Checks if the login was successful, if so redirect if needed.
   * @function isLoggedIn
   */
  isLoggedIn: function() {
    console.log("LoginController.isLoggedIn()");
    var page = "index.html";
    var _isLoggedIn = +this._model.isLoggedIn();
    if(_isLoggedIn) {
      console.log("LoginController.isLoggedIn: " + _isLoggedIn);
      var user = +this._model.getUserType();
      if(0 == user) {
        page = "vip.html";
      }else if(1 == user) {
        page = "admin.html";

        //FIXME
        this.logout(); // Just to not get caught in admin.html...
      }
    }
    console.log("LoginController.isLoggedIn: " + page);
    if(!this._isCurrentPage(page)) {
      this._redirect(page);
    }

    if(this._model.hasError() && this._isCurrentPage("index.html")) {
      this._view.showErrorMsg();
    }
  }
};
