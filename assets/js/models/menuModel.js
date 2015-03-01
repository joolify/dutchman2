/*
 * A menu model
 * @class MenuModel
 * @constructor
 * Creates a MenuModel
 */
function MenuModel() {
	/** @private */ this._itemList = [];
    this.menuUpdated = new Event(this);
	this.drinksUpdated = new Event(this); 
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
	update: function(username, password) {
		var _this = this;
		
		var urlBeers = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
		var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=beer_data_get&beer_id=';
		console.log("MenuModel.update()");
			
		$.ajax({
			url: urlBeers,
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			asynch: false,
			success: function (data) {
				$.each(data.payload, function (key, item){
					$.ajax({
						url: urlBeerData + item.beer_id,
						type: "POST",
						contentType: "application/json; charset=utf-8",
						dataType: 'json',
						asynch: false,
						success: function (dataBeer) {
							if (dataBeer.payload.length > 0 && dataBeer.payload[0].varugrupp){
								var categories = dataBeer.payload[0].varugrupp.split(",");
								for (var i = 0; i < categories.length; i++) {
									categories[i] = categories[i].trim();
								}
								_this.menuUpdated.notify({categories: categories});
							}
						},
						error : function(jqXHR, textStatus, errorThrown) {
							console.log('an error occurred!');
						}
					});
				});		
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('an error occurred!');
			}
		}); 
	},
  
	queryMenu: function (query, username, password) {
		console.log("MenuModel.button pushed", query);
		var urlBeers = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
		var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=beer_data_get&beer_id=';
		console.log("Model.query(): " + query);
		var _this = this;
		var itemList = _this._itemList;	
		$.ajax({
			url: urlBeers,
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			asynch: false,
			success: function (data) {
				itemList = [];
				$.each(data.payload, function (key, item){
					$.ajax({
						url: urlBeerData + item.beer_id,
						type: "POST",
						contentType: "application/json; charset=utf-8",
						dataType: 'json',
						asynch: false,
						success: function (dataFilter) {
							if (dataFilter.payload.length > 0 && dataFilter.payload[0].varugrupp){
								var categories = dataFilter.payload[0].varugrupp.split(",");
								var categoriesTrim = categories[0].trim();
								var categoriesTrimed = categoriesTrim.split(' ').join('');
								if(categoriesTrimed == query){
									itemList.push(new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price));
									//console.log("Model.query categories: " + categoriesTrimed + " " + item.namn + " " +  itemList.length);
									_this.drinksUpdated.notify({itemList : itemList});
								}
							}
						},	
					});	
				});
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('an error occurred!');
			}
		});
	}
 };
