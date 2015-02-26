/*
 * A quick view
 * @class QuickView
 * @constructor
 * Creates a QuickView
 */
function QuickView(elements) {
    /** @private */ this._elements = elements;

    var _this = this;

    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
}

QuickView.prototype = {
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

 refreshRecommended: function (itemList) {
    var _this = this;
    var list = this._elements.list;
    
    list.empty();
    
        list.append($('<table id="recommended_table"></table>'));

        console.log("View.refresh().itemList!!!!!!!!!!!!!!!!!!X", itemList.length);

    for(var i = 0; i < itemList.length; i++) {
        var item = itemList[i];
        var buttonAdd = "addButton_" + item.getId();
            list.append(
        $(
            '<tr>' +
            '<td><button ' +
            'class="item" ' +
            'id="' + buttonAdd + '"' +
            'value="' + item.getId() + '"' +  
            'draggable="true">' +
            item.getFullName() + 
            '</button></td>' +
            '<td>' + item.getPubPrice() + '</td>' +
            '<td>' + item.getCount() + '</td>' +
            '</tr>'
        )
        );
        
        // Listen to button clicks
        $('#' + buttonAdd).bind('click', function(e) {
        _this._pushItem($(this).val());
        });
        }
    },


  refresh: function(quickList) {
    var _this = this;
    var quick = this._elements.quickBuy;
    quick.append(quickList);
  }
};
