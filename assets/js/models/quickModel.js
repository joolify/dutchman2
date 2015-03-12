/*
 * A quick model
 * @class QuickModel
 * @constructor
 * Creates a QuickModel
 */
function QuickModel() {
    this._itemList = [];
    this.quickUpdated = new Event(this);
    this._init = true;
    this.itemBtnPushed = new Event(this);
}

QuickModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
     _beer_id_in_list: function(beer_id, beer_id_list) {
       for(var beer_id_element in beer_id_list) {
        if (beer_id == beer_id_element) {
          return true;
        }
      };
      return false;
    },

   /*
     * Query the database. 
     * @function query
     * @param {String} query 
     */


    _getMostBought: function(buyCountTable) {
      var mostBoughtBeers = [];
      var nmbrOfBeersInList = 0;
      leastMostBought = 0;
      beersInList = 0;
      for(var beer_id in buyCountTable) {
        if (buyCountTable[beer_id] > leastMostBought || nmbrOfBeersInList < 4) {
          nmbrOfBeersInList++;


          mostBoughtBeers.sort();
          mostBoughtBeers.reverse();
          if(nmbrOfBeersInList > 4) {
            mostBoughtBeers.pop(); 
          };
          mostBoughtBeers.push(beer_id);
         
          if(buyCountTable[beer_id] > mostBoughtBeers[0]) {
            leastMostBought = mostBoughtBeers[0]
          } else {
            leastMostBought = buyCountTable[beer_id];
          }
        }
      };
      for (var i = mostBoughtBeers.length - 1; i >= 0; i--) {
      };
      return mostBoughtBeers;
     },


    _get_inventory: function (beer_id_list, username, password) {
  var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
  console.log("quick.query(): ");
  var _this = this;
  $.ajax({
            url: urlQuery,
      type: "POST",
      contentType: "application/json; charset=utf-8",
            dataType: 'json',
            asynch: false,
            success: function (data) {
    _this._drop();
    $.each(data.payload, function (key, item){
    for(var index in beer_id_list) {
        if (item.beer_id == beer_id_list[index]) {
          newItem = new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price);
          _this._itemList.push(newItem);
        }
        }
    });   
    
    console.log("quickModel.query().itemList: ", _this._itemList.length);
    _this.quickUpdated.notify();
             },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('an error occurred!');
            }
        });
},


    _drop: function () {
  while(this._itemList.length > 0) {
      this._itemList.pop();
  }
    }, 
 //   _drop: function () {
 // while(this._itemList.length > 0) {
 //     this._itemList.pop();
 // }
 //   }, 

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */

    getItems: function () {
        return [].concat(this._itemList);
    },


    query: function (username, password) {
      console.log(username + " " + password);
    var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=purchases_get';
    var _this = this;
    buyCountTable = {};
        
    $.ajax({
            url: urlQuery,
        type: "POST",
        contentType: "application/json; charset=utf-8",
            dataType: 'json',
            asynch: false,
            success: function (data) {
//        _this._drop();
        $.each(data.payload, function (key, purchase){
           var beer_id = purchase.beer_id;
           if(isNaN(buyCountTable[beer_id]) && purchase.namn.length > 0) {
            buyCountTable[beer_id] = 1;
           } else {
            buyCountTable[beer_id]++;
           }
        });     
        var beer_id_list = _this._getMostBought(buyCountTable);
        _this._get_inventory(beer_id_list,username,password);

        console.log("itemlist" + _this._itemList);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            }
        });
    }


};
