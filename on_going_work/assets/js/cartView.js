/*
 * The view for the cart.
 * @class CartView
 * @constructor
 * Creates a cart view
 */
function CartView(elements) {
    this._elements = elements;
    this.amountAdded = new Event(this);
    this.amountRemoved = new Event(this);
}

CartView.prototype = {

    _addAmountToItem: function (itemId) {
	console.log("add: ", itemId); 
	this.amountAdded.notify({itemId: itemId});
    },

    _removeAmountFromItem: function (itemId) {
	console.log("remove: ", itemId);
	this.amountRemoved.notify({itemId: itemId});
    },
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
	// listen to button clicks
	cart.on('click', '#addAmount', function(e) {
	    _this._addAmountToItem($(this).val());
	});
	// listen to button clicks
	cart.on('click', '#removeAmount', function(e) {
	    _this._removeAmountFromItem($(this).val());
	});
    }
};
