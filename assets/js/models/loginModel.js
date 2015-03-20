/*
 * A login model
 * @class LoginModel
 * @constructor
 * Creates a LoginModel
 */
function LoginModel() {
    this.loginDone = new Event(this);
    this.logoutDone = new Event(this);
}

LoginModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Sets a cookie with a key and a value
     * @function _setCookie
     * @param {String} key
     * @param {String} value
     */
    _setCookie: function (key, value) {
        document.cookie = key + "=" + value;
    },

    /*
     * Gets a cookie's value
     * @function _getCookie
     * @param {String} key
     * @return {String} 
     */
    _getCookie: function (key) {
        key = key + "=";
        var cookieArray = document.cookie.split(';');
        for(var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i]; 
            while(cookie.charAt(0)==' ') cookie = cookie.substring(1);
            if(cookie.indexOf(key) == 0) return cookie.substring(key.length, cookie.length);
        }
        return null;
    },

    /*
     * Sets a user's type
     * @function _setUserType
     * @param {Integer}
     */
    _setUserType: function (usertype) {
        this._setCookie("usertype", usertype);
    },

    /* 
     * Sets a user's username
     * @function _setUserName
     * @param {String} username
     */
    _setUserName: function (username) {
        this._setCookie("username", username);
    },

    /*
     * Sets a user's password
     * @function _setPassWord
     * @param {String} password
     */
    _setPassWord: function (password) {
        this._setCookie("password", password);
    },

    /*
     * Sets if a user is logged in
     * @function _setLoggedIn
     * @param {Integer} bool
     */
    _setLoggedIn: function (bool) {
        this._setCookie("isloggedin", bool);
    },

    /*
     * Sets if logged in failed
     * @function _setError
     */
    _setError: function () {
        this._setCookie("error", 1);
    },

    /*
     * Sets a user's settings
     * @function _setUser
     * @param {String} username
     * @param {String} password
     * @param {Integer} usertype
     */
    _setUser: function (username, password, usertype) {
        this._setUserType(usertype);
        this._setUserName(username);
	    this._setPassWord(password);
	    this._setLoggedIn(1);
    },

    /*
     * Flush all cookies
     * @function _flushCookies
     */
    _flushCookies: function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
    	    var eqPos = cookie.indexOf("=");
    	    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        sessionStorage.removeItem('commands');
    },

    /*
     * If login failed, flush cookies, set logged in to false, set error flag
     * @function _loginFailed
     */
    _loginFailed: function (_this) {
        _this._flushCookies();
        _this._setLoggedIn(0);
        _this._setError();
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /* 
     * For debugging: List all available cookies. 
     * @function getCookies
     */
    getCookies: function () {
        var theCookies = document.cookie.split(';');
        var aString = '';
        for (var i = 1 ; i <= theCookies.length; i++) {
            aString += i + ' ' + theCookies[i-1] + "\n";
        }
        return aString;
    },

    /*
     * Gets a user's type
     * @function getUserType
     * @return {Integer}
     */
    getUserType: function() {
        return this._getCookie("usertype");
    },

    /*
     * Gets a user's username
     * @function getUserName
     * @return {String}
     */
    getUserName: function() {
        return this._getCookie("username");
    },

    /*
     * Gets a user's password
     * @function getPassWord
     * @return {String}
     */
    getPassWord: function() {
        return this._getCookie("password");
    },

    /* 
     * Gets if an error occured
     * @function
     * @return {Boolean}
     */
    hasError: function () {
        return this._getCookie("error");
    },

    /*
     * Returns if user is logged 
     * @function isloggedin
     * @returns {Boolean}
     */
    isLoggedIn: function () {
        return this._getCookie("isloggedin");
    },

    /* 
     * Logs out the user from the system
     * @function logout
     */ 
    logout: function () {
        console.log("Controller.logout");
        this._flushCookies();
        this.logoutDone.notify();
    },

    /*
     * Try to log in to the system through the database
     * @function login
     * @param {String} username
     * @param {String} password
     */ 
    login: function (username, password) {
        var _this = this;
        console.log("LoginModel.login: ", username, password);
        var urlLogin = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get';
        var urlCheck = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get_all';
        $.when($.getJSON(urlCheck),$.getJSON(urlLogin)).done(function(resultCheck, resultLogin) {
            var loginResponse = resultLogin[0];
	        if(loginResponse.type != "error"){
                var isVip = resultCheck[0].type == "error";
                if(isVip){
                    console.log("LoginModel.login: is vip");
                    _this._setUser(username, password, 0); 
                    _this.loginDone.notify();
                }
                else {
                    console.log("LoginModel.login: is admin");
                    _this._setUser(username, password, 1); 
                    _this.loginDone.notify();
                }
            }
            else {
                console.log("LoginModel.login: error");
                _this._loginFailed(_this);
                _this.loginDone.notify();
            }
        });
    }
};