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
	this._elements.theme.change(function(e) {
	_this._theme();
    });
}

MenuView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */

	 _theme: function () {
		var option = $("#theme").val();
		if(option === "Theme 2"){
			$("#Theme2").prop('disabled', false);
			$("#Theme1").prop('disabled', true);
		}
		else{
			$("#Theme2").prop('disabled', true);
			$("#Theme1").prop('disabled', false);
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
		console.log("MenuView._pushMenu", itemId);

		
		if(this._buttonPushed === itemId){
			var unClickedItem = "addButton_" + this._buttonPushed;
			this._buttonPushed = "";
			document.getElementById(unClickedItem).className = "category";
			itemId = "";
			this.menuBtnPushed.notify();
		}
		else if(this._buttonPushed === ""){
			this._buttonPushed = itemId;
			var clickedItem = "addButton_" + this._buttonPushed;
			document.getElementById(clickedItem).className ="categoryClicked";
			this.menuBtnPushed.notify();
		}
		else{
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

	theme: function() {
		alert("Func them");
	},
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
	refresh: function(itemList) {
		var _this = this;
		var menu = this._elements.menu;
		
		menu.empty();
		menu.append($('<table id="menu">'));
		menu.append($('<tr>'));


		//Ska ha texten tagen från det språket som är!
		/*menu.append($('<td><button ' +
					'class="logout" >' +
					"Log Out" + 
					'</button></td>' ));*/

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
		
	}
};
