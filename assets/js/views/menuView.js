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
	//this.menuUpdate = new Event(this);
	
	
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
  refresh: function(menuList) {
    var _this = this;
    var menu = this._elements.menu;
    menu.append(menuList);
  }






	/*createMenu: function(itemList){ 
	    var item = itemList[i];
	    var buttonAdd = "addButton_" + item.getId();
		var _this = this;
		var list = this._elements.list;
		list.empty();
	
        list.append($('<table id="menu"></table>'));

		console.log("View.refresh().itemList", itemList.length);
		
        list.append(
		$(
		    '<tr>' +
			'<td><button ' +
			'class="item" ' +
			'id="' + buttonAdd + '"' +
			'value="' + item.getId() + '"' +  
			'draggable="true">' +
			item.getFullName() + 
			'</button></td>' +
			'</tr>'
		)
	    );
	    
	    // Listen to button clicks
	    $('#' + buttonAdd).bind('click', function(e) {
		_this._addToCart($(this).val());
	    });
	}	*/
};
