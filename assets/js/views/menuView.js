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
		//menu.append($('<table id="menu"></table>'));
		
		if((menuList.indexOf(categories[0]) < 0)){
			menuList.push(categories[0]);
			menu.empty();
			for(var i = 0; i < menuList.length; i++){
				//menu.append(menuList[i].toString());
				
				var item = menuList[i];
				var buttonAdd = "addButton_" + item;
				menu.append(//menuList[i].toString()
					$(
						'<tr>' +
						'<td><button ' +
						'class="item" ' +
						'id="' + buttonAdd + '"' +
						'value="' + item + '"' +  
						'draggable="true">' +
						item + 
						'</button></td>' +
						'</tr>'
					)
				);
			}
		}
		
		
		/*var _this = this;
		var list = this._elements.list;
		
		list.empty();
        list.append($('<table id="drink_table"></table>'));
		console.log("View.refresh().itemList", itemList.length);

		for(var i = 0; i < itemList.length; i++) {
			var item = itemList[i];
			var buttonAdd = "addButton_" + item.getId();
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
						'<td>' + item.getPubPrice() + '</td>' +
						'<td>' + item.getCount() + '</td>' +
						'</tr>'
					)
			);
			
			// Listen to button clicks
			$('#' + buttonAdd).bind('click', function(e) {
			_this._pushItem($(this).val());
			});
		}*/
    
	
	
	
	/*if(menuList.length == 0){
			menuList.push(categories[0]);
			menu.empty();
			menu.append(menuList.toString());
		}
		else{*/
	
	/*else{
			//for(var i = 0; i < menuList.length; i++) {
				//Check if category exists in the array
				//if(menuList.indexOf(categories[0]) > 0){
					//Check if there are any sub categories
					if(categories.length > 1){
						for(var y = 1; y < categories.length; y++){
							//Check if the sub category exists in the array
							if(menuList[i].indexOf(categories[y]) < 0){
								menuList[i].push(categories[y]);
								menu.empty();
								menu.append(menuList.toString());
							}
						}
					}
					//i = menuList.length;
				//}
				If the category dose not exist and we are looking at the last element of the array, 
				put the category and its sub categories in the array
				if((menuList.indexOf(categories[0]) < 0)){//&& (i == menuList.length-1)){
					menuList.push(categories[0]);
					menu.empty();
					menu.append(menuList.toString());
				}
			//}
		}*/
		//}
  }
};
