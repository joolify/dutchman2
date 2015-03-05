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
     * Drops the database.
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
     * Search the database to find the categories and under categories 
     * @function update
     * @param {String} username
	 * @param {String} password
	 * @param {Item[]} itemList
     */
	update: function(username, password, itemList) {
		var _this = this;
		//var itemList = _this._startUp("", username, password);
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
					if(index == itemList.length){
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
     * Search the database to find the the items in a category
     * @function queryMenu
	 * @param {String} query
     * @param {String} username
	 * @param {String} password
	 * @param {Item[]} itemList
     */
	queryMenu: function (query, username, password, itemList) {
		console.log("MenuModel.button pushed", query);
		var _this = this;
		_this._drop();
		if(query == ""){
			_this.drinksUpdated.notify({itemList : itemList});
		}
		else{
			var urlBeerData = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=beer_data_get&beer_id=';
			console.log("Model.query(): " + query);
			
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
							if(categoriesTrimed == query){
								var test = dataFilter.payload[0].nr;
								for(var y = 0; y < itemList.length; y++){
									if(itemList[y]._id == test){
										var filteredItem = itemList[y];
										_this._itemList.push(new Item(filteredItem._name, filteredItem._name2, filteredItem._sbl_price, filteredItem._pub_price, filteredItem._id, filteredItem._count, filteredItem._price));
										y=itemList.length;
									}
								}
							}
						}
						index++;
						if(index == itemList.length){
							_this.drinksUpdated.notify({itemList : _this._itemList});
						}
					},
				});	
			}
		}
	},
	
	startUp: function (username, password) {
		var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
		//console.log("Model.query(): " + query);
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
					//var newItem = _this._filterByMatch(query, item, _this);
					//if(newItem) {
						//_this._itemList.push(newItem);
					//}
				});		
				
				//console.log("Model.query().itemList: ", _this._itemList.length);
				_this.menuStartUp.notify();
				//return _this._itemList;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('an error occurred!');
			}
		});
    }
 };
