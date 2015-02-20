/*
 * The View presents the model and provides the UI events. The controller is attached to these events to handle the user interaction.
 * @class DataBaseModel
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(elements) {
    /** @private */ this._elements = elements;

    this.inputModified = new Event(this);
    this.addItem = new Event(this);

    var _this = this;

    // Listens to search input
    this._elements.input.on('input', function(e) {
	_this._queryUpdated($(this).val());
    });

}

DrinkView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Notifies its listeners that the user has entered a new value
     * @private
     * @function _queryUpdated
     * @param {String} newQuery
     */
    _queryUpdated: function (newQuery) {
	this.inputModified.notify({query: newQuery});
    },

    /*
     * Notifies its listeners that the + button has been pressed
     * @private
     * @function _addToCart
     * @param {Integer} itemId
     */
    _addToCart: function (itemId) {
	console.log("DrinkView._addToCart", itemId);
	this.addItem.notify({itemId: itemId});
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
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
	    var item = itemList[i];
	    var buttonAdd = "addButton_" + item.getId();
            list.append(
		$(
		    '<tr>' +
			'<td><button ' +
			'class="item" ' +
			'id="' + buttonAdd + '"' +
			'value="' + item.getId() + '"' +  
			'draggable="true">' +
			item.getFullName() + 
			'</button></td>' +
			'<td>' + item.getPubPrice() + '</td>' +
			'<td>' + item.getCount() + '</td>' +
			'</tr>'
		)
	    );
	    
	    // Listen to button clicks
	    $('#' + buttonAdd).bind('click', function(e) {
		_this._addToCart($(this).val());
	    });
        }
    }
};

