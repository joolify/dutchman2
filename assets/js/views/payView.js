function PayView(elements) {

    this._elements = elements;
    /*
     * Events and listeners
     */
    this.paybuttonClicked = new Event(this);

    var _this = this;
    this._elements.purchase.off('click').click(function (e) {
        _this.buy();
    });
    
}


PayView.prototype = {

    /*
     * Notifies the controller that the purchase/paybutton has been clicked
     */
    buy: function () {
        this.paybuttonClicked.notify();
    },

    /*
     * writes an error message if called by the controller
     */
    emptyCart: function () {
        window.alert("There are no articles in the shoppingcart");
    },
}