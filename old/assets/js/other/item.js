/*
 * An item in a pub. 
 * @class Item
 * @param {String} name
 * @param {String} name2
 * @param {Float} sbl_price
 * @param {Float} pub_price
 * @param {Integer} id
 * @param {Integer} count
 * @param {Float} price
 * @constructor
 * Creates an Item
 */
function Item(name, name2, sbl_price, pub_price, id, count, price) {
    this._name = name;
    this._name2 = name2;
    this._sbl_price = sbl_price;
    this._pub_price = pub_price;
    this._id = id;
    this._count = count;
    this._price = price;
}

Item.prototype = {
    /*
     * Get the name of the Item
     * @function getName
     * @return {String}
     */
    getName: function () {
	return this._name;
    },
    /*
     * Get the second name of the Item
     * @function getName2
     * @return {String}
     */
    getName2: function () {
	return this._name2;
    },

    /*
     * Get both names of the Item
     * @function getFullName
     * @return {String}
     */
    getFullName: function () {
	return ((this._name2.length == 0) ? this._name :
		this._name + '<br>(' + this._name2 + ')');
    },

    /*
     * Get the Systembolaget price of the Item
     * @function getSblPrice
     * @return {Float}
     */
    getSblPrice: function () {
	return this._sbl_price;
    },

    /*
     * Get the pub price of the Item
     * @function getPubPrice
     * @return {Float}
     */
    getPubPrice: function () {
	return this._pub_price;
    },

    /*
     * Get the id of the Item
     * @function getId
     * @return {Integer}
     */
    getId: function () {
	return this._id;
    },

    /*
     * Get the order count of the Item
     * @function getCount
     * @return {Integer}
     */
    getCount: function () {
	return this._count;
    },

    /*
     * Get the price of the Item
     * @function getPrice
     * @return {Float}
     */
    getPrice: function () {
	return this._price;
    }
};
