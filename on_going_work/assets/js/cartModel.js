/*
 * Stores the items added by the user. 
 * @class CartModel
 * @constructor
 * Creates a cart model
 */
function CartModel() {
    this._cartList = [];
    this.cartUpdated = new Event(this);
}

CartModel.prototype = {
    /*
     * Drops the cart.
     * @function _drop
     */
    _drop: function () {
	while(this._cartList.length > 0) {
	    this._cartList.pop();
	}
    },
    /*
     * Get cart item by id
     * @function _getCartItem
     * return {CartItem}
     */
    _getCartItem: function (cartId) {
	var elementPos = this._cartList.map(function(x) {return x.getId(); }).indexOf(cartId);
	return this._cartList[elementPos];
    },
    /*
     * Add an item to the cart.
     * @function addToCart
     */
    addItemToCart: function (item) {
	if (item) {
	    var cartItem = new CartItem(item);
	    this._cartList.push(cartItem);
	    this.cartUpdated.notify();
	}
    },
    /*
     * Add one amount to an item
     * @function addAmountToItem
     */
    addAmountToItem: function (itemId) {
	console.log("CartModel.addAmountToItem", itemId);
	var cartItem = this._getCartItem(itemId);
	console.log("CartModel.addAmountToItem", cartItem);
	cartItem.add();
	this.cartUpdated.notify();
    },
    /*
     * Remove one amount from an item
     * @function removeAmountFromItem
     */
    removeAmountFromItem: function (itemId) {
	var cartItem = this._getCartItem(itemId);
	cartItem.remove();
	this.cartUpdated.notify();
    },
    /*
     * Get the cart.
     * @function getCart
     * @return {Item[]}
     */
    getCart: function () {
        return [].concat(this._cartList);
    }
};
