/*
 * Stores the items added by the user. 
 * @class CartModel
 * @constructor
 * Creates a cart model
 */
function CartModel() {
    this._cartList = [];
    this._credit = 0;
    this.cartUpdated = new Event(this);
}

CartModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
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
     * Get the position of the cart item
     * @function _getCartItemIndex
     * @param {Integer} itemId
     * @return {Integer}
     */
    _getCartItemIndex: function (itemId) {
	var index = this._cartList.map(function(x) {return x.getId(); }).indexOf(itemId);
	return index;
    },
    /*
     * Get cart item by id
     * @function _getCartItem
     * @param {Integer} itemId
     * return {CartItem}
     */
    _getCartItem: function (itemId) {
	var index = this._getCartItemIndex(itemId);
	return this._cartList[index];
    },

    /* Returns true if cart item exists, else false.
     * @function exists
     * @param {Item} item
     * @return {Boolean}
     */
    _exists: function (item) {
	return (this._getCartItem(item.getId()) != null);
    },

    /*
     * Compare two cart items' names 
     * @function _compareItems
     * @param {CartItem} cartItemA
     * @param {CartItem} cartItemB
     */
    _compareItems: function(cartItemA, cartItemB){
	return(cartItemA.getItem().getName().localeCompare(cartItemB.getItem().getName()));
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Add an item to the cart.
     * @function addToCart
     * @param {Item} item
     */
    addItemToCart: function (item) {
	if (item && !this._exists(item)) {
	    var cartItem = new CartItem(item);
	    this._cartList.push(cartItem);
	    this._cartList.sort(this._compareItems);
	    this.cartUpdated.notify();
	}
    },
    /*
     * Increases the amount of an item.
     * @function addAmountToItem
     * @param {Integer} itemId
     */
    addAmountToItem: function (itemId) {
	console.log("CartModel.addAmountToItem", itemId);
	var cartItem = this._getCartItem(itemId);
	console.log("CartModel.addAmountToItem", cartItem);
	cartItem.add();
	this.cartUpdated.notify();
    },
    /*
     * Decreases the amount of an item. If the amount is 1, the item is removed.
     * @function removeAmountFromItem
     * @param {Integer} itemId
     */
    removeAmountFromItem: function (itemId) {
	var cartItem = this._getCartItem(itemId);
	if(cartItem.getAmount() == 1) {
	    this.removeItem(itemId);
	}else{
	    cartItem.remove();
	}
	this.cartUpdated.notify();
    },

    /*
     * Removes an item from the cart
     * @function removeItem
     * @param {Integer} itemId
     */
    removeItem: function (itemId) {
	console.log("CartModel.removeItem: ", itemId);
	var index = this._getCartItemIndex(itemId);
	if(index > -1) {
	    this._cartList.splice(index, 1);
	    this.cartUpdated.notify();
	}
    },
    
    /*
     * Checks if user has enough credit to buy items for
     * @function hasEnoughCredit
     * @return {Boolean}
     */
    hasEnoughCredit: function () {
	return (this._credit >= this.getTotalPrice());
    },
    /*
     * Get the cart.
     * @function getCart
     * @return {CartIt
     */
    getCart: function () {
        return [].concat(this._cartList);
    },

    /*
     * Get the total price of all cart items
     * @function getTotaltPrice
     * @return {Float}
     */
    getTotalPrice: function () {
	var sum = 0;
	for(var i = 0; i < this._cartList.length; i++) {
	    sum += this._cartList[i].getSum();
	}
	return sum;
    },

    /* 
     * Get the user's credit
     * @function getCredit
     * @return {Float}
     */
    getCredit: function (username, password) {
	console.log("CartModel.getCredit: ", username, password);
	var _this = this;
	var credit = null;
	var iou = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=iou_get';
	
	$.ajax({
	    url: iou,
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		$.each(data.payload, function (key, value){
			credit = value.assets; 
		});
	    }
	});
	_this._credit = credit;
	return credit;
    }
};
