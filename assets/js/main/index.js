/*
 * Index
 * @class Index
 * @constructor
 * Creates an MVC
 */
function Index() {
  /** @private */ this._controller = null;
}

Index.prototype = {
  /*
   * ===========================================================
   * ======================== PRIVATE  =========================
   * ===========================================================
   */
  /*
   * Get the models to be used in the system.
   * @function _getModel
   * @return {Models[]}
   */
  _getModel: function (model) {
    switch(model){
    case "login":
      return new LoginModel();
    case "language":
      return new LanguageModel();
    }
  },
  /*
   * Get the views to be used in the system.
   * @function _getViews
   * @return {Views[]}
   */
  _getView: function (view) {
    switch(view) {
    case "login":
      return new LoginView({
        'loginForm': $('#loginForm'),
        'username': $('#username'),
        'password': $('#password'),
        'errorMsg': $('#errorMsg')
      });
    case "language":
      return new LanguageView({
        'language': $('#language')
      });
    }
  },

  _getControllers: function () {
    var loginController = new LoginController(this._getModel("login"), this._getView("login"));
    var languageController = new LanguageController(this._getModel("language"), this._getView("language"));

    return {login: loginController,
            language: languageController};
  },
  /*f
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  /*
   * Creates an MVC and shows the view.
   * @function run
   */
  run: function () {
    this._controller = new IndexController(this._getControllers());
    this._controller.run();
  }
};

/*
 * Executes Index after the DOM is ready.
 * @function ready
 */
$(function () {
  var index = new Index();
  index.run();
});
