/*
 * A login model
 * @class LoginModel
 * @constructor
 * Creates a LoginModel
 */
function LoginModel() {
    this.loginDone = new Event(this);
}

LoginModel.prototype = {
    login: function (username, password) {
	var _this = this;
	console.log("LoginModel.login: ", username, password);
	var url_login = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get';
	var url_check = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get_all';

	$.when(
	    $.getJSON(url_check),
	    $.getJSON(url_login)
	).done(function(result_check, result_login){
	    
	    var login_response = result_login[0];
	    if(login_response.type != "error"){
		var is_vip = result_check[0].type == "error";
		if(is_vip){
		    console.log("LoginModel.login: is vip");
		    _this.loginDone.notify({msg: 0});
		}
		else {
		    console.log("LoginModel.login: is admin");
		    _this.loginDone.notify({msg: 1});
		}
	    }
	    else {
		console.log("LoginModel.login: error");
		_this.loginDone.notify({msg: -1});
	    }
	});
    }
};
