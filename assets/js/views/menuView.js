/*
 * A menu view
 * @class MenuView
 * @constructor
 * Creates a MenuView
 */
function MenuView(elements) {
	this._elements = elements;
	this.menuUpdate = new Event(this);
	
	
}

MenuView.prototype = {
	createMenu: function(itemList){ 
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
        


	}	
};
