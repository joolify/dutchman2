/*
 * An i18n class
 * @class LanguageModel
 * @constructor
 * Creates LanguageModel
 */
function LanguageModel() {
    /** @private */ this._dictionary = {
        "english":[
            {"position":"#titleIndex","word":"Stormrider Bar","type":"text"},
            {"position":"#subTitleIndex","word":"Welcome to the best bar in Uppsala!","type":"text"},
            {"position":"#username","word":"Username","type":"placeholder"},
            {"position":"#password","word":"Password","type":"placeholder"},
            {"position":"#loginButton","word":"Log in","type":"text"},
            {"position":"order_left_title","word":"Search available beers","type":"text"},
            {"position":"order_center_title","word":"Most bought","type":"text"},
            {"position":"order_right_title","word":"Shopping cart","type":"text"},
            {"position":"order_search","word":"Search ...","type":"placeholder"}],
        "spanish":[
            {"position":"#titleIndex","word":"Bar Jinete de Tormenta","type":"text"},
            {"position":"#subTitleIndex","word":"Bienvenido al mejor bar de Uppsala!","type":"text"},
            {"position":"#username","word":"Usuario","type":"placeholder"},
            {"position":"#password","word":"Contrasenha","type":"placeholder"},
            {"position":"#loginButton","word":"Iniciar sesion","type":"text"},
            {"position":"order_left_title","word":"Buscar cervezas disponibles","type":"text"},
            {"position":"order_center_title","word":"Cervezas mÃ¡s vendidas","type":"text"},
            {"position":"order_right_title","word":"Orden","type":"text"},
            {"position":"order_search","word":"Buscar ...","type":"placeholder"}],
        "swedish":[
            {"position":"#titleIndex","word":"Stormriderbaren","type":"text"},
            {"position":"#subTitleIndex","word":"Välkommen till Uppsalas bästa bar!","type":"text"},
            {"position":"#username","word":"Användarnamn","type":"placeholder"},
            {"position":"#password","word":"Lösenord","type":"placeholder"},
            {"position":"#loginButton","word":"Logga in","type":"text"},
            {"position":"order_left_title","word":"","type":"text"},
            {"position":"order_center_title","word":"","type":"text"},
            {"position":"order_right_title","word":"","type":"text"},
            {"position":"order_search","word":"","type":"placeholder"}]}
}

LanguageModel.prototype = {
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
    searchLanguage: function(language) {
        var words = [];
        $.each(this._dictionary, function(index, element) {
            if (language==index) {
                $.each(this, function(index, element) {
                    words.push([element.position,element.word,element.type]);
                });
            }
        });
        return words;
    }
};