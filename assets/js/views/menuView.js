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
     * Notifies its listeners that a menu button has been pressed
     * @private
     * @function _pushMenu
     * @param {String} itemId
     */
	_pushMenu: function (itemId) {
		console.log("MenuView._pushMenu", itemId);
		this.menuBtnPushed.notify({itemId: itemId});
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
	
	
	//menuList : [],
	
	/*
     * Refreshes the menu. 
     * @function refresh
     * @param {itemList[]} categories
     */
	refresh: function(itemList) {
		var _this = this;
		var menu = this._elements.menu;
		//var menuList = this.menuList;
		
		//if((menuList.indexOf(itemList[0]) < 0)){
			//menuList.push(itemList[0]);
		menu.empty();
		menu.append($('<table id="menu">'));
		menu.append($('<tr>'));
		for(var i = 0; i < itemList.length; i++){
			var item = itemList[i];
			var itemTrimed = item.split(' ').join('');
			var buttonAdd = "addButton_" + itemTrimed;
			menu.append(
				$(
					'<td><button ' +
					'class="category" ' +
					'id="' + buttonAdd + '"' +
					'value="' + itemTrimed + '"' +  
					'draggable="true">' +
					item + 
					'</button></td>' 
				)
			);
			// Listen to button clicks
			$('#' + buttonAdd).bind('click', function(e) {
			console.log("MenuView.button made", $(this).val());
			_this._pushMenu($(this).val());
			});
		}
		menu.append($('</tr></table>'));
		//}
	}
};
