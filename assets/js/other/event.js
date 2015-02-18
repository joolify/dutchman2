/*
 * Event handler
 * @class Event
 * @param {Object} sender
 * @constructor 
 * Creates an Event
 */
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    /*
     * Attach a listener to an event
     * @function attach
     * @param {Object} listener
     */
    attach: function (listener) {
        this._listeners.push(listener);
    },

    /* 
     * Notify listeners if an event occurs
     * @function notify
     * @param {Object[]} args
     */
    notify: function (args) {
        for (var index = 0; index < this._listeners.length; index++) {
            this._listeners[index](this._sender, args);
        }
    }
};
