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

  _getMostBought: function(buyCountTable) {
    var mostBoughtBeers = [],
        nmbrOfBeersInList = 0,
        maxNumBeers = 8;
    leastMostBought = 0;
    beersInList = 0;
    for(var beer_id in buyCountTable) {
      if (buyCountTable[beer_id] > leastMostBought || nmbrOfBeersInList < maxNumBeers) {
        nmbrOfBeersInList++;
        mostBoughtBeers.sort();
        mostBoughtBeers.reverse();
        if(nmbrOfBeersInList > maxNumBeers) {
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
    return mostBoughtBeers;
  },

  _get_inventory: function (beer_id_list, username, password) {
    var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=inventory_get';
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

        console.log("QuickModel.query().itemList: ", _this._itemList.length);
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
  /*
   * ===========================================================
   * ======================== PUBLIC  ==========================
   * ===========================================================
   */
  /*
   * Get item by id
   * @function getItem
   * @param {Integer} itemId
   * return {Item}
   */
  getItem: function (itemId) {
    var elementPos = this._itemList.map(function(x) {return x.getId(); }).indexOf(itemId);
    return this._itemList[elementPos];
  },

  getItems: function () {
    return [].concat(this._itemList);
  },


  query: function (username, password) {
    console.log("QuickModel.query()", username, password);
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

      },
      error : function(jqXHR, textStatus, errorThrown) {
      }
    });
  }

};
