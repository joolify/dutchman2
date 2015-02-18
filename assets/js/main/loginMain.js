/*
 * LoginMain
 * @class LoginMain
 * @constructor
 * Creates an MVC
 */
function LoginMain() {
    this._controller = null;
}

LoginMain.prototype = {
    /*
     * Get the views to be used in the system.
     * @function _getViews
     * @return {Views[]}
     */
    _getViews: function () {
	var loginView = new LoginView(
	    {'loginForm': $('#loginForm'),
	     'username': $('#username'),
	     'password': $('#password'),
	     'errorMsg': $('#errorMsg')});
	
	return {login: loginView};
    },

    /*
     * Get the models to be used in the system.
     * @function _getModels
     * @return {Models[]}
     */
    _getModels: function () {
	var loginModel = new LoginModel();
	    
	return {login: loginModel};
    },

    /* 
     * Creates an MVC and shows the view. 
     * @function run
     */
    run: function () {
	this._controller = new LoginController(this._getModels(), this._getViews());
    }
};

/* 
 * Executes Main after the DOM is ready. 
 * @function ready
 */
$(function () {
    var main = new LoginMain();
    main.run();
});
