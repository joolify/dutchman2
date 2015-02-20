function PayModel(elements) {
    this._elements = elements;
}

PayModel.prototype = {
    
    test: function (cart, totalPrice, user) {
        var itemCart = cart;
        var total = totalPrice;
        console.log("längd", itemCart.length);
        var ok = window.confirm("Price for purchase: " + totalPrice + " Do you want to proceed?");
        console.log("ok?", ok)
        if (ok = "true") {
            
            for (var i = 0; i < itemCart.length; i++) {
                console.log("quw", itemCart[i].getItem());
                var ol = itemCart[i].getItem();
                var olId = ol._id;
                console.log("skickad")
                console.log("olid", olId);
                console.log("user", user.id, user.password)
                this.appendPurchase(user, olId);
            }
            this.appendPayment(user, total);
        }
    },
        

        appendPayment: function (user, amount){
            console.log("append payment");

            // var db_Payment = "http://pub.jamaica-inn.net/fpdb/api.php?username="+user.id+"&password="+user.password+"&action=payments_append&amount="+amount;
            var db_Payment = 'http://pub.jamaica-inn.net/fpdb/api.php?username=aamsta&password=aamsta&action=payments_append&amount='+amount;
            console.log("db_payment", db_Payment);
            $.ajax({
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=aamsta&password=aamsta&action=payments_append&amount=9000',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                asynch: false,
                success: function () {
                    window.alert("Köpet är genomfört");
                }
            });
        },

        appendPurchase: function (user, beerId){
            //var db_Purchase = "http://pub.jamaica-inn.net/fpdb/api.php?username="+user.id+"&password="+user.password+"&action=purchases_append&=beer_id="+beerId;
            var db_Purchase = "http://pub.jamaica-inn.net/fpdb/api.php?username=&password=aamsta&action=aamsta&action=purchases_append&=beer_id=" + beerId;
            console.log("db_purchase", db_Purchase);
            $.ajax({
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=aamsta&password=aamsta&action=purchases_append&beer_id='+beerId,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                asynch: false,
                success: function () {
                    window.alert("öl lagrad");
                }
            });
        },

}
    

