var NAME = "Test";
var NAME2 = "tseT";
var SBL_PRICE = 10.0;
var PUB_PRICE = 20.0;
var ID = 1;
var COUNT = 3;
var PRICE = 30.0;
/*
 * Main test
 */
QUnit.test( "Main is not null", function( assert ) {
    var main = new Main();
    assert.ok( main != null, "Passed!");
});


QUnit.test( "Main._getViews() is not null", function( assert ) {
    var main = new Main();
    
    assert.ok( main._getViews() != null, "Passed!");
});

QUnit.test( "Main._getModels() is not null", function( assert ) {
    var main = new Main();
    
    assert.ok( main._getModels() != null, "Passed!");
});

QUnit.test( "Main._getModels() is not null", function( assert ) {
    var main = new Main();
    
    assert.ok( main._getModels() != null, "Passed!");
});

/*
 * Item Test
 */
QUnit.test( "Item is not null", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item != null, "Passed!");
});

QUnit.test( "Item.getName() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getName() == NAME, "Passed!");
});

QUnit.test( "Item.getName2() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getName2() == NAME2, "Passed!");
});

QUnit.test( "Item.getFullName() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getFullName() == NAME + '<br>(' + NAME2 + ')', "Passed!");
});

QUnit.test( "Item.getSblPrice() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getSblPrice() == SBL_PRICE, "Passed!");
});

QUnit.test( "Item.getId() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getId() == ID, "Passed!");
});

QUnit.test( "Item.getCount() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getCount() == COUNT, "Passed!");
});

QUnit.test( "Item.getPrice() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    
    assert.ok( item.getPrice() == PRICE, "Passed!");
});

/*
 * Cart Item Test
 */
QUnit.test( "CartItem is not null", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    assert.ok( cartItem != null, "Passed!");
});

QUnit.test( "CartItem.add increments 1", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    cartItem.add();
    assert.ok( cartItem._amount == 2, "Passed!");
});

QUnit.test( "CartItem.add increments 100", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    for(var i = 0; i < 99; i++) {
	cartItem.add();
    }
    assert.ok( cartItem._amount == 100, "Passed!");
});

QUnit.test( "CartItem.remove decrements 1", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    cartItem.remove();
    assert.ok( cartItem._amount == 0, "Passed!");
});

QUnit.test( "CartItem.remove decrements 10", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    for(var i = 0; i < 10; i++) {
	cartItem.remove();
    }
    assert.ok( cartItem._amount == 0, "Passed!");
});

QUnit.test( "CartItem.remove decrements 100", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    for(var i = 0; i < 99; i++) {
	cartItem.add();
    }
    for(var i = 0; i < 99; i++) {
	cartItem.remove();
    }
    assert.ok( cartItem._amount == 1, "Passed!");
});

QUnit.test( "CartItem.getSum returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    assert.ok( cartItem.getSum() == PUB_PRICE, "Passed!");
});

QUnit.test( "CartItem.getSum returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);

    for(var i = 0; i < 13; i++) {
	cartItem.add();
    }
    assert.ok( cartItem.getSum() == 14*PUB_PRICE, "Passed!");
});

QUnit.test( "CartItem.getAmount returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    assert.ok( cartItem.getAmount() == 1, "Passed!");
});

QUnit.test( "CartItem.getId() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    assert.ok( cartItem.getId() == ID, "Passed!");
});

QUnit.test( "CartItem.getItem() returns correctly", function( assert ) {
    var item = new Item(NAME, NAME2, SBL_PRICE, PUB_PRICE, ID, COUNT, PRICE);
    var cartItem = new CartItem(item);
    assert.ok( cartItem.getItem() == item, "Passed!");
});
