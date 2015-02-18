/*
 * The view for the login.
 * @class LoginView
 * @param {Object[]} elements
 * @constructor
 * Creates a login view
 */
function LoginView(elements) {
    this._elements = elements;

    this.submitClicked = new Event(this);

    var _this = this;
    
    this._elements.loginForm.submit(function(e) {
	_this._submit(_this._elements.username.val(), _this._elements.password.val());
    });
}

LoginView.prototype = {
    _submit: function (username, password) {
	console.log("LoginView._submit: usr: " + username + ", pwd: " + password);
	this.submitClicked.notify({username: username, password: password});
    },

    errorLogin: function () {
	console.log("LoginView.error: ");
	this._elements.errorMsg.empty();
	this._elements.errorMsg.text("Login failed: Username/Password is wrong.");
    }    
};

