/*
 * Index
 * @class Index
 * @constructor
 * Creates an MVC
 */
function Index() {
    this._controller = null;
}

Index.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
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
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /* 
     * Creates an MVC and shows the view. 
     * @function run
     */
    run: function () {
	this._controller = new Controller(this._getModels(), this._getViews());
	this._controller.showLogin();
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
