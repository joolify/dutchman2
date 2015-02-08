/*
 * Event handler
 * @class Event
 * @constructor
 */
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

/*
 * An item in a pub. 
 * @class Item
 * @param {String} name
 * @param {String} name2
 * @param {Float} sbl_price
 * @param {Float} pub_price
 * @param {Integer} id
 * @param {Integer} count
 * @param {Float} price
 * @constructor
 * Creates an Item
 */
function Item(name, name2, sbl_price, pub_price, id, count, price) {
    this._name = name;
    this._name2 = name2;
    this._sbl_price = sbl_price;
    this._pub_price = pub_price;
    this._id = id;
    this._count = count;
    this._price = price;
}

Item.prototype = {
    getName: function () {
	return this._name;
    },
    getName2: function () {
	return this._name2;
    },

    getSblPrice: function () {
	return this._sbl_price;
    },

    getPubPrice: function () {
	return this._pub_price;
    },

    getId: function () {
	return this._id;
    },

    getCount: function () {
	return this._count;
    },

    getPrice: function () {
	return this._price;
    }
};

/*
 * The Model. Model stores items and notifies observers about changes.
 * @class DataBaseModel
 * @parent index
 * @constructor
 * Creates a database model
 */
function DatabaseModel() {
    this._itemList = []; 
    this._db_inventory = 'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=inventory_get';

    this.listUpdated = new Event(this); 
}

DatabaseModel.prototype = {
    /*
     * Query the database. 
     * @function query
     * @param query 
     */
    query: function (query) {
	console.log("Model.query(): " + query.toString() + ", " + query.length);
	var itemList = this._itemList;
	$.ajax({
            url: this._db_inventory,
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
            dataType: 'json',
            asynch: false,
            success: function (data) {
		$.each(data.payload, function (key, item){

		    if(item.namn && item.namn.length > 0 && (!query || query.length == 0 || item.namn.toLowerCase().indexOf(query.toLowerCase()) >= 0)){

			var newItem = new Item(item.namn, item.namn2, item.sbl_price, item.pub_price, item.beer_id, item.count, item.price);
			itemList.push(newItem);
		    }
		});		
		
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('an error occurred!');
            }
        });
	this.listUpdated.notify();
    },

    /*
     * Drops the database.
     * @function drop
     */
    drop: function () {
	var itemList = this._itemList;
	while(itemList.length > 0) {
	    itemList.pop();
	}
    },

    /*
     * Get an Item list
     * @function getItemList
     * @return {Item[]} a list with Items.
     */
    getItemList: function () {
	console.log("Model.getItemList");
	console.log(this._itemList.length);
        return [].concat(this._itemList);
    }
};
/*
 * The View. View presents the model and provides the UI events. The controller is attached to these events to handle the user interraction.
 * @class DataBaseModel
 * @param {DatabaseModel} model
 * @param {Object[]} elements
 * @constructor
 * Creates a DrinkView
 */
function DrinkView(model, elements) {
    this._model = model;
    this._elements = elements;

    this.inputModified = new Event(this);
    
    var _this = this;

    // model listener
    this._model.listUpdated.attach(function () {
        _this.refresh();
    });

    // listener to HTML input
    this._elements.input.keydown(function () {
	_this.inputModified.notify();
    });
}

DrinkView.prototype = {
    /*
     * Shows the view.
     * @function show
     */ 
    show: function () {
	this.refresh();
    },

    /*
     * Refreshes the view. 
     * @function refresh
     */
    refresh: function () {
	this._elements.list.empty();
	var list, itemList = [];

        list = this._elements.list;
        list.html('');

        itemList = this._model.getItemList();

	for(var i = 0; i < itemList.length; i++) {
            list.append($('<li>' + itemList[i].getName() + '</li>'));
        }
    },

    /*
     * Get the query from input
     * @function getQuery
     * @return {string} the query
     */
    getQuery: function () {
	var query = this._elements.input.val();
	return query;
    }
};


/*
 * The Controller. Controller responds to user actions and invokes changes on the model.
 * @class DrinkController
 * @param {DatabaseModel} model
 * @param {DrinkView} view
 * @constructor
 * Creates a DrinkController
 */
function DrinkController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.inputModified.attach(function () {
	_this.updateView();
    });

}

DrinkController.prototype = {
    /*
     * updates the view
     * @function updateView
     */
    updateView: function () {
	var query = this._view.getQuery();
	//this._model.drop();
	this._model.query(query);
    }
};
/*
 * Main
 * @class Main
 * @constructor
 * Creates an MVC
 */
function Main() {
    this._model;
    this._view;
    this._controller;
}

Main.prototype = {
    /* 
     * Creates an MVC and shows the view. 
     * @function run
     */
    run: function() {
	this._model = new DatabaseModel();
	this._view = new DrinkView(this._model, {
	    'list': $('#drink_table'),
	    'input': $('#query')
	});
	this._controller = new DrinkController(this._model, this._view);
	this._view.show();
    }
}

/* 
 * Executes Main after the DOM is ready. 
 * @function ready
 */
$(function () {
    var main = new Main();
    main.run();
});
