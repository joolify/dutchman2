/*
 * A menu model
 * @class MenuModel
 * @constructor
 * Creates a MenuModel
 */
function MenuModel() {
	this.menuUpdated = new Event(this);

	/*this._menuList = [];
	this._db_inventory = 'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=inventory_get';
	this._db_menuItem = 'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=beer_data_get&beer_id=';*/
}

MenuModel.prototype = {
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
  update: function() {
    var _this = this;
    /* fetch data*/
    var menuList = "Hello Menu!";
    _this.menuUpdated.notify({menuList: menuList});
  }
	
	/*_menuUpdate: function (){
		$.getJSON(
		_db_inventory,
		function(data) { 
			$("div").empty();
			$("div").append("<ul></ul>");
			$.each(data.payload, function (key, item){
				$.getJSON(
				_db_menuItem+item.beer_id,
				function(data) {	
					$.each(data.payload, function (key, beer){
						var n = beer.varugrupp.search(",");
						if(n == -1){
							n = (beer.varugrupp).length;
						}
						if(_menuList.indexOf(beer.varugrupp.substring(0,n)) < 0){
							_menuList.push(beer.varugrupp.substring(0,n));
						}
					});
				});
			});		
		});
		return _menuList;
	}*/
};
