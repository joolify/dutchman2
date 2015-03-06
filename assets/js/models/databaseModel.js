/*
 * The Model. Model stores items and notifies observers about changes.
 * @class DataBaseModel
 * @parent index
 * @constructor
 * Creates a database model
 */
function DatabaseModel() {
    /** @private */ this._itemList = [];

    this.drinksUpdated = new Event(this); 
	this.menuStartUp = new Event(this);
}

DatabaseModel.prototype = {
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
     * Checks how many of the search term has a match on the label
     * @function _getSearchHits
     * @param name
     * @param {String} searchArray
     * @return {Integer} 
     */
    _getSearchHits: function(name, searchArray) {
	var count = 0;
        for (var index = 0; index < searchArray.length; index++) {
            if (searchArray[index].length > 0 &&
                name.indexOf(searchArray[index]) > -1) {
                count++;
            }
        }
	return count;
    },

    /*
     * Filters out items where name is not empty and where enough search terms exist in the item.
     * @function _filterByMatch
     * @param {String} query
     * @param {String} item
     * @param {DatabaseModel} _this
     * @return {Item} 
     * @return {null} if not found
     */
    _filterByMatch: function(query, item, _this) {
		var searchString = query.toLowerCase();
        var searchArray = searchString.split(" ");
        var lowerBound = Math.ceil((searchArray.length)/2);
		var name = item.namn.toLowerCase();
		var nameAndName2 = name + ' ' + item.namn2.toLowerCase();
		var count = _this._getSearchHits(nameAndName2, searchArray);
	
		if (name.length > 0 && (searchString.length == 0 || count >= lowerBound)) {
			return new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price);

		}else{
			return null;
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
     * Get item by id
     * @function getItem
     * @param {Integer} itemId
     * return {Item}
     */
    getItem: function (itemId) {
	var elementPos = this._itemList.map(function(x) {return x.getId(); }).indexOf(itemId);
	return this._itemList[elementPos];
    },
    /*
     * Query the database. 
     * @function query
     * @param {String} query 
     */
    query: function (query, username, password) {
		var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
		console.log("Model.query(): " + query);
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
		});
    }
};
