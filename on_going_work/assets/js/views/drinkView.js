/*
 * The View presents the model and provides the UI events. The controller is attached to these events to handle the user interaction.
 * @class DataBaseModel
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(elements) {
    this._elements = elements;

    this.inputModified = new Event(this);
    this.addItem = new Event(this);

    var _this = this;

    // Listens to search input
    this._elements.input.on('input', function(e) {
	_this._queryUpdated($(this).val());
    });

}

DrinkView.prototype = {
    _queryUpdated: function (newQuery) {
	this.inputModified.notify({query: newQuery});
    },
    _addToCart: function (itemId) {
	console.log("DrinkView._addToCart", itemId);
	this.addItem.notify({itemId: itemId});
    },
    /*
     * Refreshes the view. 
     * @function refresh
     * @param {Item[]} itemList
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
	// Listen to button clicks
	list.on('click', '#addButton', function(e) {
	    _this._addToCart($(this).val());
	});

    }
};

