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
	this.menuStartUp = new Event(this);
}

MenuModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
	/*
     * Empties the itemList
     * @function _drop
     */
    _drop: function () {
	while(this._itemList.length > 0) {
	    this._itemList.pop();
	}
    },    
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
	/*
     * Get an Item list
     * @function getItems
     * @return {Item[]} a list with Items.
     */
    getItems: function () {
        return [].concat(this._itemList);
    },
	/*
     * Search the database to find the categories
     * @function update
     * @param {String} username
	 * @param {String} password
	 * @param {Item[]} itemList
     */
	update: function(username, password, itemList) {
		var _this = this;
		_this._drop();
		var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=beer_data_get&beer_id=';
		var index = 0;
		for(var i = 0; i < itemList.length; i++) {
			var item = itemList[i];
			var itemId = item._id;
			$.ajax({
				url: urlBeerData + itemId,
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				asynch: false,
				success: function (dataBeer) {
					if (dataBeer.payload.length > 0 && dataBeer.payload[0].varugrupp){
						var categories = dataBeer.payload[0].varugrupp.split(",");
						for (var j = 0; j < categories.length; j++) {
							categories[j] = categories[j].trim();
							if((_this._itemList.indexOf(categories[0]) < 0)){
								_this._itemList.push(categories[0]);
							}
						}
					}
					index++;
					if(index === itemList.length){
						_this.menuUpdated.notify({itemList : _this._itemList});
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log('an error occurred!');
				}
			});	
		}
	},
  
	/*
     * Search the database to find the items in the itemList that has the specified category
     * @function queryMenu
	 * @param {String} category
     * @param {String} username
	 * @param {String} password
	 * @param {Item[]} itemList
     */
	queryMenu: function (category, username, password, itemList) {
		console.log("MenuModel.button pushed", category);
		var _this = this;
		_this._drop();
		if(category === ""){
			_this.drinksUpdated.notify({itemList : itemList});
		}
		else{
			var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=beer_data_get&beer_id=';
			console.log("Model.query(): " + category);
			
			_this._drop();
			var index = 0;
			for(var i = 0; i < itemList.length; i++) {
				var item = itemList[i];
				var itemId = item._id;
				$.ajax({
					url: urlBeerData + itemId,
					type: "POST",
					contentType: "application/json; charset=utf-8",
					dataType: 'json',
					asynch: false,
					success: function (dataFilter) {
						if (dataFilter.payload.length > 0 && dataFilter.payload[0].varugrupp){
							var categories = dataFilter.payload[0].varugrupp.split(",");
							var categoriesTrim = categories[0].trim();
							var categoriesTrimed = categoriesTrim.split(' ').join('');
							if(categoriesTrimed === category){
								var test = dataFilter.payload[0].nr;
								for(var y = 0; y < itemList.length; y++){
									if(itemList[y]._id === test){
										var filteredItem = itemList[y];
										_this._itemList.push(new Item(filteredItem._name, filteredItem._name2, filteredItem._sbl_price, filteredItem._pub_price, filteredItem._id, filteredItem._count, filteredItem._price));
										y=itemList.length;
									}
								}
							}
						}
						index++;
						if(index === itemList.length){
							_this.drinksUpdated.notify({itemList : _this._itemList});
						}
					},
				});	
			}
		}
	},
	
	/*
     * Search the database to find all the items
     * @function startUp
     * @param {String} username
	 * @param {String} password
     */
	startUp: function (username, password) {
		var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
		var _this = this;
			
		$.ajax({
			url: urlQuery,
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			asynch: false,
			success: function (data) {
				_this._drop();
				$.each(data.payload, function (key, item){
					if(item.namn.length > 0){
						_this._itemList.push(new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price));
					}
				});		
				_this.menuStartUp.notify();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('an error occurred!');
			}
		});
    }
 };
