function PayView(elements) {
    this._elements = elements;
    this.button = new Event(this);
    document.getElementById('button').onclick = function () {
        this._button();
    };
}


PayView.prototype = {

    _button: function() {
        this.button.notify();
    }
}