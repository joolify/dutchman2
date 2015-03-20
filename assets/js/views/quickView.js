 /*
 * A quick view
 * @class QuickView
 * @constructor
 * Creates a QuickView
 */
function QuickView(elements) {
    /** @private */ this._elements = elements;
    this.itemBtnPushed = new Event(this);
}

QuickView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    _pushItem: function (itemId) {
      console.log("QuickView._pushItem()", itemId);
        this.itemBtnPushed.notify({itemId: itemId});
    },
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Refreshes the view.
     * @function refresh
     * @param {Item[]} itemList
     */
    refresh: function(itemList) {
        var _this = this,
            list = this._elements.quickBuy;

        list.empty();

        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            var imageURL = 'url("assets/images/items/';
            imageURL += item.getId() + '.JPG")';
            list.append(
                '<div class="item quick" ' +
                ' id="quick_' + item.getId() + '"' +
                ' draggable="true">' +
                item.getFullName() +
                '<span class="price">' + item.getPubPrice() + ' kr' + '</span>' +
                '<div class="addButton"></div>' +
                '</div>'
            );
            var thisElement = document.getElementById('quick_' + item.getId());
            var addButton = document.getElementById('quick_' +item.getId()).lastElementChild;
            if (item.getCount() < 1) { //Checks availability
                addButton.className = "outOfStockButton";
                thisElement.classList.add('outOfStock');
            } else {
                thisElement.classList.add('inStock');
            }

            thisElement.style.backgroundImage = imageURL;
          document.getElementById('quick_'+ item.getId()).addEventListener('dragstart', handleDragStart, false);
          document.getElementById('quick_'+item.getId()).addEventListener('dragend', handleDragEnd, false);
        }
        // Listen for clicks on items
        $('.inStock').click(function() {
            _this._pushItem(($(this).attr('id')).slice(6));
        });

        var cart = document.getElementById('cart');

        /*
         * Handle drag/drop events
         */
        function handleDragStart(e) {
            this.style.opacity = '0.4';
            itemId = this.getAttribute('id');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('itemId', itemId.slice(6));
            console.log(itemId.slice(6));
            cart.style.boxShadow = 'inset 0 0 20px #0000FF'; // Highlights the cart
        }

        function handleDragEnd(e) {
            this.style.opacity = ''; // Removes the 'opacity' attr.
            cart.style.boxShadow = ''; // Removes the 'boxShadow' attr
        }
    }
};
