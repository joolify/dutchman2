/*
 * The view for the login.
 * @class LoginView
 * @param {Object[]} elements
 * @constructor
 * Creates a login view
 */
function LoginView(elements) {
    /** @private */ this._elements = elements;

    this.loginBtnClicked = new Event(this);

    var _this = this;
    
    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
    this._elements.loginForm.submit(function(e) {
	_this._login(_this._elements.username.val(), _this._elements.password.val());
    });
}

LoginView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Notifies that the user has clicked the submit button
     * @function _login
     * @param {String} username
     * @param {String} password
     */
    _login: function (username, password) {
	console.log("LoginView._login: usr: " + username + ", pwd: " + password);
	this.loginBtnClicked.notify({username: username, password: password});
    },

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Evokes the error message
     * @function showErrorMsg
     */
    showErrorMsg: function () {
	console.log("LoginView.error: ");
	this._elements.errorMsg.empty();
	this._elements.errorMsg.text("Login failed: Username/Password is wrong.");
    }    
};

