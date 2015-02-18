/*
 * The controller responds to user actions and invokes changes on the model.
 * @class LoginController
 * @param {Model[]} model
 * @param {Views[]} view
 * @constructor
 * Creates a Controller
 */
function LoginController(models, views) {
    this._loginModel = models.login;
    this._loginView = views.login;

    var _this = this;
    
    this._loginView.submitClicked.attach(function (sender, args) {
	_this.login(args.username, args.password);
    });

    this._loginModel.loginDone.attach(function (sender, args) {
	_this.redirect(args.msg);
    });
}

LoginController.prototype = {
    login: function (username, password) {
	console.log("LoginController.login: ", username, password);
	this._loginModel.login(username, password);
    },

    redirect: function (msg) {
	switch(msg) {
	case 0:
	    console.log("LoginController.redirect: vip.php");
	    window.location.href = "vip.php";
	    break;
	case 1:
	    console.log("LoginController.redirect: admin.php");
	    window.location.href = "admin.php";
	    break;
	default:
	    console.log("LoginController.redirect: login.php");
	    this._loginView.errorLogin();
	}
    }
};
