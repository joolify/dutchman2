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
    _setCookie: function (key, value) {
       
	document.cookie = key + "=" + value;
    },

    _getCookie: function (key) {
	key = key + "=";
	var cookieArray = document.cookie.split(';');
	for(var i = 0; i < cookieArray.length; i++) {
	    var cookie = cookieArray[i]; 
	    while(cookie.charAt(0)==' ') cookie = cookie.substring(1);
	    if (cookie.indexOf(key) == 0) {
	        return cookie.substring(key.length, cookie.length);
	    }
	}
	return null;
    },

    setUser: function (user) {
	this._setCookie("user", user);
    },

    getUser: function() {
        return this._getCookie("user");
    },
    
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
