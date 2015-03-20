/*
 * An i18n class
 * @class LanguageModel
 * @constructor
 * Creates LanguageModel
 */
function LanguageModel() {
    this.languageUpdated = new Event(this);
    /** @private */  
    this._words = [];
    this._dictionary = {
        "english":[
            {"position":"#titleIndex","word":"Stormrider Bar","type":"text"},
            {"position":"#subTitleIndex","word":"Welcome to the best bar in Uppsala!","type":"text"},
            {"position":"#usernameLabel","word":"Username: ","type":"text"},
            {"position":"#username","word":"Username","type":"placeholder"},
            {"position":"#passwordLabel","word":"Password: ","type":"text"},
            {"position":"#password","word":"Password","type":"placeholder"},
            {"position":"#loginButton","word":"Log in","type":"text"},
            {"position":"#queryLabel","word":"Search","type":"text"},
            {"position":"#quick_buy h2","word":"Your favourites","type":"text"},
            {"position":"#cart h2","word":"Order","type":"text"},
            {"position":"#query","word":"Search","type":"placeholder"}],
        "spanish":[
            {"position":"#titleIndex","word":"Bar Jinete de Tormenta","type":"text"},
            {"position":"#subTitleIndex","word":"Bienvenido al mejor bar de Uppsala!","type":"text"},
            {"position":"#usernameLabel","word":"Usuario:  ","type":"text"},
            {"position":"#username","word":"Usuario","type":"placeholder"},
            {"position":"#passwordLabel","word":"Contrasenha: ","type":"text"},
            {"position":"#password","word":"Contrasenha","type":"placeholder"},
            {"position":"#loginButton","word":"Iniciar sesion","type":"text"},
            {"position":"#queryLabel","word":"Buscar","type":"text"},
            {"position":"#quick_buy h2","word":"Cervezas mÃ¡s vendidas","type":"text"},
            {"position":"#cart h2","word":"Orden","type":"text"},
            {"position":"#query","word":"Buscar","type":"placeholder"}],
        "swedish":[
            {"position":"#titleIndex","word":"Stormrider","type":"text"},
            {"position":"#subTitleIndex","word":"Välkommen till Uppsalas bästa bar!","type":"text"},
            {"position":"#usernameLabel","word":"Användarnamn: ","type":"text"},
            {"position":"#username","word":"Användarnamn","type":"placeholder"},
            {"position":"#passwordLabel","word":"Lösenord: ","type":"text"},
            {"position":"#password","word":"Lösenord","type":"placeholder"},
            {"position":"#loginButton","word":"Logga in","type":"text"},
            {"position":"#queryLabel","word":"Sök","type":"text"},
            {"position":"#quick_buy h2","word":"Mest köpta","type":"text"},
            {"position":"#cart h2","word":"Beställning","type":"text"},
            {"position":"#query","word":"Sök","type":"placeholder"}]}
}

LanguageModel.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
     /*
     * Sets a local session storage with the language value
     * @function _setLanguage
     * @param {String} value
     */
    _setLanguage: function(value) {
        sessionStorage.setItem("language", value);
    },
     
    /*
     * ===========================================================
     * ======================== PUBLIC  ==========================
     * ===========================================================
     */
     /*
     * Gets the language local session storage
     * @function _setLanguage
     * @param {String} key
     */
     getLanguage: function() {
        return sessionStorage.getItem("language");
     },

     getDictionary: function() {
        var language = this.getLanguage();
        this.makeDictionary(language);
        return [].concat(this._words);
     },

    setDictionary: function(language) {
        console.log("setDictionary on LanguageModel");
        console.log(language);
        this._setLanguage(language);
        this.makeDictionary(language);
        console.log(this._words);
        this.languageUpdated.notify({words: [].concat(this._words)});
    },

    makeDictionary: function(language) {
        var _this=this;
        $.each(_this._dictionary, function(index, element) {
            if (language==index) {
                $.each(this, function(index, element) {
                    _this._words.push([element.position,element.word,element.type]);
                });
            }
        });
    }

};