/*
 * An undo/redo view
 * @class CommandView
 * @constructor
 * Creates CommandView
 */
function CommandView(elements) {
    this._elements = elements;
    this.undoPressed = new Event(this);
    this.redoPressed = new Event(this);
    var _this = this;
    // Listen to undo/redo pressed buttons
    /*
     * ===========================================================
     * ==================== EVENT LISTENERS ======================
     * ===========================================================
     */
    this._elements.undo.click(function (e) {
        _this._undoClicked();
    });

    this._elements.redo.click(function (e) {
        _this._redoClicked();
    });
}

CommandView.prototype = {
    /*
     * ===========================================================
     * ======================== PRIVATE  =========================
     * ===========================================================
     */
    /*
     * Notifies its listener that the user has pressed the undo button
     * @private
     * @function _undoPressed
     */
    _undoClicked: function () {
        this.undoPressed.notify();
    },

    /*
     * Notifies its listener that the user has pressed the redo button
     * @private
     * @function _redoPressed
     */
    _redoClicked: function () {
        this.redoPressed.notify();
    }
};