/*
 * The Model. Model stores items and notifies observers about changes.
 * @class DataBaseModel
 * @parent index
 * @constructor
 * Creates a database model
 */
function DatabaseModel() {
    this._itemList = [];
    this._db_inventory = 'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=inventory_get';
    this.listUpdated = new Event(this); 
}

DatabaseModel.prototype = {
    /*
     * Drops the database.
     * @function _drop
     */
    _drop: function () {
	while(this._itemList.length > 0) {
	    this._itemList.pop();
	}
    },    
    
    
    _appendPayment: function(){
        console.log("append payment")

        /*var db_Payment = "http://pub.jamaica-inn.net/fpdb/api.php?username="+user.id+"&"+"password="+password.id+"&action=payments_append&amount="+amount;
        console.log("db_payment", db_Payment);
        $.ajax({
            url: db_Payment,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            asynch: false,
            success: function () {
                return "true";
                    }
                });	 user, amount	*/
    },

    _appendPurchase: function(user, beerId){
        var db_Purchase = 'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=purchases_append';

    },


    /*
     * Checks how many of the search term has a match on the label
     * @function _getCount
     * @param name
     * @param {String} searchArray
     * @return {Integer} 
     */

    _getCount: function (name, searchArray) {
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
     * @function _filter
     * @param {String} query
     * @param {String} item
     * @param {DatabaseModel} _this
     * @return {Item} 
     * @return {null} if not found
     */
    _filter: function(query, item, _this) {
	var searchString = query.toLowerCase();
        var searchArray = searchString.split(" ");
        var lowerBound = Math.ceil((searchArray.length)/2);
	var name = item.namn.toLowerCase();
	var nameAndName2 = name + ' ' + item.namn2.toLowerCase();
	var count = _this._getCount(nameAndName2, searchArray);
	
	if (name.length > 0 && (searchString.length == 0 || count >= lowerBound)) {
	     
	    return new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price);

	}else{
	    return null;
	}
    },
    /*
     * Query the database. 
     * @function query
     * @param {String} query 
     */
    query: function (query) {
	console.log("Model.query(): " + query);
	var _this = this;
        
	$.ajax({
            url: this._db_inventory,
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
            dataType: 'json',
            asynch: false,
            success: function (data) {
		_this._drop();
		$.each(data.payload, function (key, item){
		    var newItem = _this._filter(query, item, _this);
		    if(newItem) {
			_this._itemList.push(newItem);
		    }
		});		
		
		console.log("Model.query().itemList: ", _this._itemList.length);
		_this.listUpdated.notify();
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('an error occurred!');
            }
        });

    },

    
    /*
     * Get an Item list
     * @function getItemList
     * @return {Item[]} a list with Items.
     */
    getItemList: function () {
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
    }
};
