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

    tooManyItems: function (list)
    {
        var message = "";
        var tempmessage = "";
        console.log(list);
        console.log("length", list.length);
        for(i=0; i < list.length; i++)
        {
            var tempmessage = message+"\n";
            item = list[i];
            message = tempmessage+ "Beer: " + item[0] + " has only got: " + item[1] + " left in stock, you have ordered: " + item[2];
        }
        window.alert(message);
    },
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