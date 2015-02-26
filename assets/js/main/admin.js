/*
 * Admin
 * @class Admin
 * @constructor
 * Creates an MVC
 */
function Admin() {
}

Admin.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */

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
    }
};
/* 
 * Executes Admin after the DOM is ready. 
 * @function ready
 */
$(function () {
    var admin = new Admin();
    admin.run();
});
