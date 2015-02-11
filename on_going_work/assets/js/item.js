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
    getName: function () {
	return this._name;
    },
    getName2: function () {
	return this._name2;
    },

    getFullName: function () {
	return ((this._name2.length == 0) ? this._name :
		this._name + '<br>(' + this._name2 + ')');
    },

    getSblPrice: function () {
	return this._sbl_price;
    },

    getPubPrice: function () {
	return this._pub_price;
    },

    getId: function () {
	return this._id;
    },

    getCount: function () {
	return this._count;
    },

    getPrice: function () {
	return this._price;
    }
};
