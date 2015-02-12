/*
 * The view for the cart.
 * @class CartView
 * @param {Object[]} elements
 * @constructor
 * Creates a cart view
 */
function CartView(elements) {
    this._elements = elements;
    this.amountAdded = new Event(this);
    this.amountRemoved = new Event(this);
}

CartView.prototype = {
    /*
     * Increases the amount of an item.
     * @function _addAmountToItem
     * @param {Integer} itemId
     */
    _addAmountToItem: function (itemId) {
	console.log("add: ", itemId); 
	this.amountAdded.notify({itemId: itemId});
    },

    /*
     * Decreases the amount of an item.
     * @function _removeAmountFromItem
     * @param {Integer} itemId
     */
    _removeAmountFromItem: function (itemId) {
	console.log("remove: ", itemId);
	this.amountRemoved.notify({itemId: itemId});
    },

    /*
     * Refreshes the cart view
     * @function refresh
     * @param {CartItem[]} cartItemList
     */
    refresh: function (cartItemList) {
	var _this = this;
	var cart = this._elements.cart;

	cart.empty();

	cart.append($('<table id="cart"></table>'));

	console.log('CartView.refresh().cartItemList', cartItemList.length);

	for(var i = 0; i < cartItemList.length; i++) {
	    var item = cartItemList[i].getItem();
            cart.append(
		$(
		    '<tr>' +
			'<td>' + 
			item.getName() + 
			'</td>' +
			'<td>' + 
			cartItemList[i].getAmount() + '*' + 
			item.getPubPrice() +
			'</td>' +
			'<td>' + cartItemList[i].getSum() + '</td>' +
			'<td>' +
			'<button id="addAmount"' +
			'value="' + item.getId() + '"' +  
			'>+</button>' +
			'<button id="removeAmount"' +
			'value="' + item.getId() + '"' +  
			'>-</button>' +
			'</td>' + 
			'</tr>'
		)
	    );
	    
        }
	// Listens to + button
	cart.on('click', '#addAmount', function(e) {
	    _this._addAmountToItem($(this).val());
	});
	// Listens to - button
	cart.on('click', '#removeAmount', function(e) {
	    _this._removeAmountFromItem($(this).val());
	});
    }
};
