/*
 * The View. View presents the model and provides the UI events. The controller is attached to these events to handle the user interraction.
 * @class DataBaseModel
 * @param {DatabaseModel} model
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(elements) {
    this._elements = elements;
    this._currentQuery = "";
    //this._addButtons = [];

    this.inputModified = new Event(this);
    this.addItem = new Event(this);

    var _this = this;

    // listener to HTML input
    this._elements.input.on('input', function(e) {
	_this._setQuery($(this).val());
    });

}

DrinkView.prototype = {
    _setQuery: function (newQuery) {
	this._currentQuery = newQuery;
	this.inputModified.notify();
    },
    _addToCart: function (itemId) {
	console.log("DrinkView._addToCart", itemId);
	this.addItem.notify({itemId: itemId});
    },
    /*
     * Refreshes the view. 
     * @function refresh
     */
    refresh: function (itemList) {
	var _this = this;
	var list = this._elements.list;
	
	list.empty();
	
        list.append($('<table id="drink_table"></table>'));

	console.log("View.refresh().itemList", itemList.length);

	for(var i = 0; i < itemList.length; i++) {
            list.append(
		$(
		    '<tr>' +
			'<td><button ' +
			'class="item" ' +
			'id="addButton" '  +
			'value="' + itemList[i].getId() + '"' +  
			'draggable="true">' +
			itemList[i].getFullName() + 
			'</button></td>' +
			'<td>' + itemList[i].getPubPrice() + '</td>' +
			'<td>' + itemList[i].getCount() + '</td>' +
			'</tr>'
		)
	    );
	    
        }
	// listen to button clicks
	list.on('click', '#addButton', function(e) {
	    _this._addToCart($(this).val());
	});

    },

    /*
     * notify the query from input
     * @function getQuery
     * @return {string} the query
     */
    getQuery: function () {
	return this._currentQuery;
    }
};

