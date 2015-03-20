/*
 * Vip
 * @class Vip
 * @constructor
 * Creates an MVC
 */
function Vip() {
    /** @private */ this._controller = null;
}
Vip.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Get the views to be used in the system.
     * @function _getViews
     * @return {Views[]}
     */
    _getViews: function () {
        var cartView = new CartView({
            'cart': $('#cart_table'),
            'credit': $('#credit'),
            'totalPrice': $('#totalPrice'),
            'logout': $('#logout'),
            'clear': $('#clear')
        });

        var drinkView = new DrinkView({
            'list': $('#drink_table'),
            'input': $('#query')
        });

        var menuView = new MenuView({
            'menu': $('#menu'),
            'theme': $('#theme')
        });

        var quickView = new QuickView({
            'quickBuy': $('#quick_buy')
        });

        var languageView = new LanguageView();


        var payView = new PayView({
            'purchase': $('#purchase')
        });

        var commandView = new CommandView({
            'undo': $('#undo'),
            'redo': $('#redo')
        });

        return {
            cart: cartView,
            drink: drinkView,
            menu: menuView,
            quick: quickView,
            language: languageView,
            pay: payView,
            command: commandView
        };
    },
    /*
     * Get the models to be used in the system.
     * @function _getModels
     * @return {Models[]}
     */
    _getModels: function () {
        var databaseModel = new DatabaseModel();
        var cartModel = new CartModel();
        var loginModel = new LoginModel();
        var menuModel = new MenuModel();
        var quickModel = new QuickModel();
        var languageModel = new LanguageModel();
        var commandModel = new CommandModel();

        var payModel = new PayModel();
        return {
            cart: cartModel,
            database: databaseModel,
            login: loginModel,
            menu: menuModel,
            quick: quickModel,
            language: languageModel,
            pay: payModel,
            command: commandModel
        };

    },

    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
    /*
     * Creates an MVC and shows the view.
     * @function run
     */
    run: function () {
        this._controller = new Controller(this._getModels(), this._getViews());
        this._controller.showDrinks();
        sessionStorage['commands'] = "";
        sessionStorage['redo'] = "";
    }
};

/*
 * Executes Vip after the DOM is ready.
 * @function ready
 */
$(function () {
    var wheel = new Wheel('wheel');
    wheel.draw();
    var vip = new Vip();
    vip.run();
});
