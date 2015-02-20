function PayModel(elements) {
    this._elements = elements;
}

PayModel.prototype = {
    
    test: function (cart, totalPrice, userName, userPass) {
        var itemCart = cart;
        var total = totalPrice;
        console.log("längd", itemCart.length);
        var ok = window.confirm("Price for purchase: " + totalPrice + " Do you want to proceed?");
        console.log("ok?", ok)
        if (ok = "true") {
            
            for (var i = 0; i < itemCart.length; i++) {
                var cartItem = itemCart[i].getItem();
                var cartAmount = itemCart[i].getAmount();
                var beerId = cartItem._id;

                this.appendPurchase(userName, userPass, beerId, cartAmount);
            }
            //this.appendPayment(userName, userPass, total);
        }
    },
        

        appendPayment: function (userName, userPass, amount){
            console.log("append payment");

     
            var db_Payment = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+userName+'&password='+userPass+'&action=payments_append&amount='+amount;
            console.log("db_payment", db_Payment);
            $.ajax({
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + userName + '&password=' + userPass + '&action=payments_append&amount=' + amount,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                asynch: false,
                success: function () {
                    window.alert("Köpet är genomfört");
                }
            });
        },

        appendPurchase: function (userName, userPass, beerId, cartAmount){
           
            var db_Purchase = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+userName+'&password='+userPass+'&action=purchases_append&beer_id='+beerId;
            console.log("db_purchase", db_Purchase);
            for (var i = 0; i < cartAmount; i++) {
                $.ajax({
                    url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + userName + '&password=' + userPass + '&action=purchases_append&beer_id=' + beerId,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    asynch: false,
                    success: function () {
                        window.alert("öl lagrad");
                    }
                });
            }
        },

}
    

