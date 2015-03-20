/*
 * A menu view
 * @class MenuView
 * @constructor
 * Creates a MenuView
 */
function MenuView(elements) {
    /** @private */ this._elements = elements;
    this.menuBtnPushed = new Event(this);
    var _this = this;
    this._buttonPushed = "";

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
    // Listens to theme drop down
    this._elements.theme.change(function (e) {
        _this._theme();
    });
}

MenuView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Changes the theme by changing to another CSS file
     * @private
     * @function _theme
     */
    _theme: function () { //TODO This whole function is not very expandable. Should be updated if wanting more than 2 themes
        var option = $("#theme").val();
        if (option === "Theme 2") {
            var oldlink = document.getElementsByTagName("link").item(0);
            oldlink.href = "assets/css/main2.css";
        }
        else {
            var oldlink = document.getElementsByTagName("link").item(0);
            oldlink.href = "assets/css/main.css";
        }
    },
    /*
     * Notifies its listeners that a menu button has been pressed
     * and changes the pressed buttons color
     * @private
     * @function _pushMenu
     * @param {String} itemId
     */
    _pushMenu: function (itemId) {
        if (this._buttonPushed === itemId) {
            var unClickedItem = "addButton_" + this._buttonPushed;
            this._buttonPushed = "";
            document.getElementById(unClickedItem).className = "category";
            this.menuBtnPushed.notify();
        } else if (this._buttonPushed === "") {
            this._buttonPushed = itemId;
            var clickedItem = "addButton_" + this._buttonPushed;
            document.getElementById(clickedItem).className = "categoryClicked";
            this.menuBtnPushed.notify();
        } else {
            var lastClickedItem = "addButton_" + this._buttonPushed;
            document.getElementById(lastClickedItem).className = "category";
            this._buttonPushed = itemId;
            var newClickedItem = "addButton_" + this._buttonPushed;
            document.getElementById(newClickedItem).className = "categoryClicked";
            this.menuBtnPushed.notify();
        }
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */

    /*
     * Get the id of the menu button that is clicked
     * @function getMenuClicked
     * return {ButtonId}
     */
    getMenuClicked: function () {
        return this._buttonPushed;
    },

    /*
     * Creates the menu buttons 
     * @function refresh
     * @param {itemList[]} itemList
     */
    refresh: function (itemList) {
        var _this = this;
        var menu = this._elements.menu;

        menu.empty();

        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            var itemTrimed = item.split(' ').join('');
            var buttonAdd = "addButton_" + itemTrimed;
            menu.append($('<div class="category" id="' + buttonAdd + '" value="' + itemTrimed + '">' + item + '</div>'));
            // Listen to button clicks
            $('#' + buttonAdd).bind('click', function (e) {
                _this._pushMenu($(this).attr('value'));
            });
        }
    }
};
