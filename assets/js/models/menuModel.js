/*
 * A menu model
 * @class MenuModel
 * @constructor
 * Creates a MenuModel
 */
function MenuModel() {
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
  update: function() {
    var _this = this;
    /* fetch data*/
	
	var urlBeers = 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get';
	var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=';
	console.log("MenuModel.update()");
	var _this = this;
        
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
	
    
    
  }
};
