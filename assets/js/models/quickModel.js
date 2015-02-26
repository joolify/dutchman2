/*
 * A quick model
 * @class QuickModel
 * @constructor
 * Creates a QuickModel
 */
function QuickModel() {
        /** @private */ this._recommendedList = [];

    this.quickUpdated = new Event(this);
    this.recommendedUpdated = new Event(this); 

}

QuickModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */


    getRecommended: function () {
        return [].concat(this._recommendedList);
    },


  update: function() {
    var _this = this;
    /* fetch data*/
    var quickList = "Hello Quick!";
    _this.quickUpdated.notify({quickList: quickList});
  },

    query: function (query, username, password) {
    var urlQuery = 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+password+'&action=purchases_get';
    console.log("Model.query(): " + query);
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
            var newItem = _this._filterByMatch(query, item, _this);
            if(newItem) {
            _this._recommendedList.push(newItem);
            }
        });     
        
        console.log("quickModel.query_purchases().recommendedList: ", _this._recommendedList.length);
        _this.drinksUpdated.notify();
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('an error occurred!');
            }
        });
    }


};
