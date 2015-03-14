/*
 * The View presents the model and provides the UI events. The controller is attached to these events to handle the user interaction.
 * @class DataBaseModel
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(elements) {
    /** @private */
    this._elements = elements;

    this.searchFieldModified = new Event(this);
    this.itemBtnPushed = new Event(this);
    this.refreshDone = new Event(this);

    var _this = this;

    // Listens to search input
    this._elements.input.on('input', function(e) {
        _this._searchFieldModified($(this).val());
    });

    var cart = document.getElementById('cart');

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        itemId = e.dataTransfer.getData('itemId');
        e.stopPropagation(); // Stops the browser from redirecting
        e.preventDefault();
        _this._pushItem(itemId); // Adding to cart
        return false;
    }

    cart.addEventListener('dragover', handleDragOver, false);
    cart.addEventListener('drop', handleDrop, false);

}

DrinkView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Notifies its listeners that the user has entered a new value
     * @private
     * @function _searchFieldModified
     * @param {String} newQuery
     */
    _searchFieldModified: function(newQuery) {
        this.searchFieldModified.notify({
            query: newQuery
        });
    },

    /*
     * Notifies its listeners that the refresh has been finished
     * @private
     * @function _refreshDone
     */
    _refreshDone: function() {
        this.refreshDone.notify();
    },

    /*
     * Notifies its listeners that the + button has been pressed
     * @private
     * @function _pushItem
     * @param {Integer} itemId
     */
    _pushItem: function(itemId) {
        this.itemBtnPushed.notify({
            itemId: itemId
        });
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
            list = this._elements.list;

        list.empty();

        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            var imageURL = 'url("itemImages/';
            imageURL += item.getId() + '.JPG")';
            list.append(
                '<div class="item " ' +
                ' id="' + item.getId() + '"' +
                ' draggable="true">' +
                item.getFullName() +
                '<span class="price">' + item.getPubPrice() + ' kr' + '</span>' +
                '<div class="addButton"></div>' +
                '</div>'
            );
            var thisElement = document.getElementById(item.getId());
            var addButton = document.getElementById(item.getId()).lastElementChild;
            if (item.getCount() < 1) { //Checks availability
                addButton.className = "outOfStockButton";
                thisElement.classList.add('outOfStock');
            } else {
                thisElement.classList.add('inStock');
            }

            thisElement.style.backgroundImage = imageURL;
        }
        // Listen for clicks on items
        $('.inStock').click(function() {
            _this._pushItem($(this).attr('id'));
        });

        var cart = document.getElementById('cart');
        var items = document.querySelectorAll('#drink_table .inStock');

        /*
         * Handle drag/drop events
         */
        function handleDragStart(e) {
            this.style.opacity = '0.4';
            itemId = this.getAttribute('id');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('itemId', itemId);
            cart.style.boxShadow = 'inset 0 0 15px #0000FF'; // Highlights the cart
        }


        function handleDragEnd(e) {
            this.style.opacity = ''; // Removes the 'opacity' attr.
            cart.style.boxShadow = ''; // Removes the 'boxShadow' attr
        }

        /* Now we need to add listeners.
         * Each item needs to listen for drag-(start/end)
         * The cart needs to listen for dragover and drop
         */
        [].forEach.call(items, function(item) {
            item.addEventListener('dragstart', handleDragStart, false);
            item.addEventListener('dragend', handleDragEnd, false);
        });

        _this._refreshDone();
    }
};
