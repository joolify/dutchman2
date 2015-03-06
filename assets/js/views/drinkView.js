/*
 * The View presents the model and provides the UI events. The controller is attached to these events to handle the user interaction.
 * @class DataBaseModel
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(elements) {
    /** @private */ this._elements = elements;

    this.searchFieldModified = new Event(this);
    this.itemBtnPushed = new Event(this);

    var _this = this;

    // Listens to search input
    this._elements.input.on('input', function(e) {
	_this._searchFieldModified($(this).val());
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
     * @function _searchFieldModified
     * @param {String} newQuery
     */
    _searchFieldModified: function (newQuery) {
	this.searchFieldModified.notify({query: newQuery});
    },

    /*
     * Notifies its listeners that the + button has been pressed
     * @private
     * @function _pushItem
     * @param {Integer} itemId
     */
    _pushItem: function (itemId) {
	console.log("DrinkView._pushItem", itemId);
	this.itemBtnPushed.notify({itemId: itemId});
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
		console.log("View.refresh().itemList", itemList.length);

		for(var i = 0; i < itemList.length; i++) {
			var item = itemList[i];
			var buttonAdd = item.getId();
				list.append(
          '<input type="hidden" class="item_input" id="' + item.getId() + '"/>' +
                '<div class="item" ' +
                ' id="' + buttonAdd + '")">' +
                item.getFullName() +
                '<input id="valueOf_' + item.getId() + '" type="hidden" value="' + item.getId() +'"'+
                '</div>'
				);
        }

        $('.item').click(function(){
          _this._pushItem($(this).attr('id'));
        });
    }
};

/*

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

*/
