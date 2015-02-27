/*
 * A menu view
 * @class MenuView
 * @constructor
 * Creates a MenuView
 */
function MenuView(elements) {
    /** @private */ this._elements = elements;

    var _this = this;
	
    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
}

MenuView.prototype = {
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
	menuList : [],
	refresh: function(categories) {
		var _this = this;
		var menu = this._elements.menu;
		var menuList = this.menuList;
		
		if((menuList.indexOf(categories[0]) < 0)){
			menuList.push(categories[0]);
			menu.empty();
			menu.append($('<table id="menu">'));
			menu.append($('<tr>'));
			for(var i = 0; i < menuList.length; i++){
				var item = menuList[i];
				var buttonAdd = "addButton_" + item;
				menu.append(
					$(
						'<td><button ' +
						'class="category" ' +
						'id="' + buttonAdd + '"' +
						'value="' + item + '"' +  
						'draggable="true">' +
						item + 
						'</button></td>' 
					)
				);
			}
			menu.append($('</tr></table>'));
		}
	}
};
