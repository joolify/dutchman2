/*
 * The amount of a particular item in a cart.  
 * @class CartItem
 * @param {Item}
 * @constructor
 * Creates a cart item
 */

function CartItem(item) {
    this._item = item;
    this._amount = 1;
}

CartItem.prototype = {
    /*
     * Add an amount of the cart item.
     * @function add
     */
    add: function () {
	this._amount++;
    },
    /*
     * Remove an amount of the cart item.
     * @function remove
     */
    remove: function () {
	if(this._amount > 0) {
	    this._amount--;
	}
    },
    /*
     * Get the sum of the total amount of an particular item in a cart.
     * @function getSum
     * @return {Float}
     */
    getSum: function () {
	return (this._item.getPubPrice() * this._amount);
    },

    /*
     * Get the amount of items
     * @function getAmount
     * @return {Integer}
     */
    getAmount: function () {
	return this._amount;
    },
    /*
     * Get the id 
     * @function getId
     * @return {Integer}
     */
    getId: function () {
	return this._item.getId();
    },
    /*
     * Get the item 
     * @function getItem
     * @return {Item}
     */
    getItem: function () {
	return this._item;
    }
};
