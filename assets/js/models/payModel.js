function PayModel(elements) {
    this._elements = elements;
}

PayModel.prototype = {
    
    test: function (cart, totalPrice) {
        var itemCart = cart;
        var total = totalPrice;
        console.log("längd", itemCart.length);
        var ok = window.confirm("Price for purchase: " + totalPrice + " Do you want to proceed?");
        console.log("ok?", ok)
        if (ok = "true") {
            DatabaseModel._appendPayment();

            for (var i = 0; i < itemCart.length; i++) {
                console.log("quw", itemCart[i].getItem());
            }

        }
        


    },
    
};
