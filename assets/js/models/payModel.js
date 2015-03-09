function PayModel() {
    var _this = this;

    this.emptyCart = new Event();
}

PayModel.prototype = {

    /*
     * Loops through the beers of a specific beerid and adds the items to the database
     */
    appendPurchase: function (userName, userPass, beerId, cartAmount) {

        for (var i = 0; i < cartAmount; i++) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://pub.jamaica-inn.net/fpdb/api.php?username=" + userName + "&password=" + userPass + "&action=purchases_append&beer_id=" + beerId, true);
            xhr.send();
        }
    },
    /*
     * When called this looks up what beers have been bought and how many of each id, it then sends the item id username and password to appendPurchase so that it can be added to the database
     * If the cart is empty the controller is notified
     */
    test: function (cart, totalPrice, userName, userPass) {
        var count = cart.length;
        console.log(count)
        if (count === 0) {
            this.emptyCart.notify();
        }
        else {

            var itemCart = cart;
            var total = totalPrice;
            console.log("längd", itemCart.length);
            var ok = window.confirm("Price for purchase: " + totalPrice + " Do you want to proceed?");
            console.log("ok?", ok)
            if (ok = "true") {
                for (var i = 0; i < itemCart.length; i++) {
                    var cartItem = itemCart[i].getItem();
                    var cartAmount = itemCart[i].getAmount();
                    this.appendPurchase(userName, userPass, cartItem._id, cartAmount);

  
                }
            }

        }
    
},




}
    

