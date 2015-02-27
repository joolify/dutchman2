function Command (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
}

Command.prototype = {
  increment: function(value) {
    return new Command(increment, decrement, value);
  },

  decrement: function(value) {
    return new Command(decrement, increment, value);
  }
};
