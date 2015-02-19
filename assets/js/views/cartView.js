/*
 * The view for the cart.
 * @class CartView
 * @param {Object[]} elements
 * @constructor
 * Creates a cart view
 */
function CartView(elements) {
    this._elements = elements;
    this.itemRemoved = new Event(this);
    this.amountAdded = new Event(this);
    this.amountRemoved = new Event(this);
    this.logout = new Event(this);
    var _this = this;

    this._elements.logout.click(function(e) {
	_this._logout();
    });
}

CartView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    _logout: function () {
	this.logout.notify();
    },
    _itemRemoved: function (itemId) {
	console.log("CartView._itemRemoved(): ", itemId); 
	this.itemRemoved.notify({itemId: itemId});
    },
    /*
     * Increases the amount of an item.
     * @function _addAmountToItem
     * @param {Integer} itemId
     */
    _addAmountToItem: function (itemId) {
	console.log("CartView._addAmountToItem(): ", itemId); 
	this.amountAdded.notify({itemId: itemId});
    },

    /*
     * Decreases the amount of an item.
     * @function _removeAmountFromItem
     * @param {Integer} itemId
     */
    _removeAmountFromItem: function (itemId) {
	console.log("CartView._removeAmountFromItem(): ", itemId);
	this.amountRemoved.notify({itemId: itemId});
    },

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Sets the credit
     * @function setCredit
     * @param {Float} credit
     */ 
    setCredit: function (credit) {
	console.log("CartView.setCredit", credit);
	this._elements.credit.text("Credit: " + credit);
    },
    
    /*
     * Sets the total price
     * @function setTotalPrice
     * @param {Float} price
     */
    setTotalPrice: function (price) {
	console.log("CartView.setTotalPrice", price);
	this._elements.totalPrice.text("Total price: " + price);
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
	    var buttonRemove = "cartRemove_" + item.getId();
	    var buttonPlus = "cartPlus_" + item.getId();
	    var buttonMinus = "cartMinus_" + item.getId();
            cart.append(
		$(
		    '<tr>' +
			'<td>' +
			'<button id="' + buttonRemove + '"' +
			'value="' + item.getId() + '"' +  
			'>x</button>' +
			'</td>' +
			'<td>' + 
			item.getName() + 
			'</td>' +
			'<td>' + 
			cartItemList[i].getAmount() + '*' + 
			item.getPubPrice() +
			'</td>' +
			'<td>' + cartItemList[i].getSum() + '</td>' +
			'<td>' +
			'<button id="' + buttonPlus + '"' +
			'value="' + item.getId() + '"' +  
			'>+</button>' +
			'<button id="' + buttonMinus + '"' +
			'value="' + item.getId() + '"' +  
			'>-</button>' +
			'</td>' + 
			'</tr>'
		)
	    );
	    // Listens to x button
	    $('#' + buttonRemove).bind('click', function(e) {
		_this._itemRemoved($(this).val());
	    });
	    // Listens to + button
	    $('#' + buttonPlus).bind('click', function(e) {
		_this._addAmountToItem($(this).val());
	    });
	    // Listens to - button
	    $('#' + buttonMinus).bind('click', function(e) {
		_this._removeAmountFromItem($(this).val());
	    });
        }
    }
};
