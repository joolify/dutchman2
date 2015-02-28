/*
 * A menu model
 * @class MenuModel
 * @constructor
 * Creates a MenuModel
 */
function MenuModel() {
	/** @private */ this._itemList = [];
    this.menuUpdated = new Event(this);
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
        
	$.ajax({
		url: urlBeers,
		type: "POST",
	    contentType: "application/json; charset=utf-8",
		dataType: 'json',
		asynch: false,
		success: function (data) {
			//_this._drop();
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
							//var categoriesTrimed = categories[0].trim();
							var categoriesTrimed = categories[0].split(' ').join('');;
							if(categoriesTrimed == query){
								console.log("Model.query categories: " + item.namn);
								//_itemList.push();
							}
							//_this.menuUpdated.notify({categories: categories});
						}
					},
					/*error : function(jqXHR, textStatus, errorThrown) {
						console.log('an error occurred!');
					}*/
	
				
				
					/*url: urlBeerData + item.beer_id,
					type: "POST",
					contentType: "application/json; charset=utf-8",
					dataType: 'json',
					asynch: false,
					success: function (dataBeer) {
						_this._drop();
						$.each(data.payload, function (key, item){
							var newItem = _this._filterByMatch(query, item, _this);
							if(newItem) {
								_this._itemList.push(newItem);
							}
						});		
						
						console.log("Model.query().itemList: ", _this._itemList.length);
						_this.drinksUpdated.notify();
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log('an error occurred!');
					}
				});	*/
				});		
			
			console.log("Model.query().itemList: ", _this._itemList.length);
			//_this.drinksUpdated.notify();
			});
		/*error : function(jqXHR, textStatus, errorThrown) {
			console.log('an error occurred!');
		}*/
	
		}
	});
 }
 };
