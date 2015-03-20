/*
 * The view for the cart.
 * @class CartView
 * @param {Object[]} elements
 * @constructor
 * Creates a cart view
 */
function CartView(elements) {
    /** @private */ this._elements = elements;

    this.popBtnClicked = new Event(this);
    this.incrementBtnClicked = new Event(this);
    this.amountRemoved = new Event(this);
    this.clearBtnClicked = new Event(this);

    var _this = this;

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
      this._elements.clear.off('click').click(function (e) {
        _this.clearCart();
    });

}

CartView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
      clearCart: function () {
        this.clearBtnClicked.notify();
    },
    /*
     * Notifies its listeners that the user has pressed the remove item button
     * @function _pop
     * @param {Integer} itemId
     */
    _pop: function (itemId) {
	console.log("CartView._pop(): ", itemId);
	this.popBtnClicked.notify({itemId: itemId});
    },
    /*
     * Notifies its listeners that the user has pressed the increase item button
     * @function _increment
     * @param {Integer} itemId
     */
    _increment: function (itemId) {
	console.log("CartView._increment(): ", itemId);
	this.incrementBtnClicked.notify({itemId: itemId});
    },

    /*
     * Notifies its listeners that the user has pressed the decrease item button
     * @function _decrement
     * @param {Integer} itemId
     */
    _decrement: function (itemId) {
	console.log("CartView._decrement(): ", itemId);
	this.amountRemoved.notify({itemId: itemId});
    },

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Sets the credit text to a new value
     * @function setCredit
     * @param {Float} credit
     */
    setCredit: function (credit) {
	console.log("CartView.setCredit", credit);
	this._elements.credit.text("Credit: " + credit);
    },

    /*
     * Sets the total price text to a new value
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

	cart.append($('<table id="cart_table"></table>'));

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
		_this._pop($(this).val());
	    });
	    // Listens to + button
	    $('#' + buttonPlus).bind('click', function(e) {
		_this._increment($(this).val());
	    });
	    // Listens to - button
	    $('#' + buttonMinus).bind('click', function(e) {
		_this._decrement($(this).val());
	    });
        }
    }
};
