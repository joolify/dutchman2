/*
 * Stores the metadata regarding the undo/redo functionality
 * @class CommandModel
 * @constructor
 * Creates a command model
 */
 function CommandModel() {
    /** @private */ 
    this._commandInverses = [{"push":"pop"},{"pop":"push"}];
    this._inverse;
}

CommandModel.prototype = {
	/*
    * ===========================================================
    * ======================== PUBLIC  =========================
    * ===========================================================
    */
    /*
     * Gets the last element of the corresponding local session variable 
     * @function _getLastElement
     * @param {String} type
     */
	getLastElement: function(type) {
		if (sessionStorage['commands'].length==1) {
			sessionStorage['commands']="";
		}
		if (sessionStorage['redo'].length==1) {
			sessionStorage['redo']="";
		}
		if (type=="commands") {
			var storedCommands = sessionStorage['commands'];
		}
		else {
			var storedCommands = sessionStorage['redo'];
		}
		storedCommands = storedCommands.substring(0, storedCommands.length - 1);
		console.log(storedCommands);
		storedCommands = JSON.parse("[" + storedCommands + "]");
		var last_element = storedCommands[storedCommands.length - 1];
		if (type=="commands") {
			sessionStorage['redo']+=JSON.stringify(last_element)+",";	
		}
		else {
			sessionStorage['commands']+=JSON.stringify(last_element)+",";
		}
		storedCommands.splice(storedCommands.length - 1, 1);
		storedCommands = JSON.stringify(storedCommands);
		storedCommands = storedCommands.substring(0, storedCommands.length - 1);
		storedCommands = storedCommands.substr(1);
		if (type=="commands") {
			sessionStorage['commands']=storedCommands+",";	
		}
		else {
			sessionStorage['redo']=storedCommands+",";
		}
		return last_element;
	},
	/*
     * Gets the inverse command for a specific command
     * @function getInverse
     * @param {String} command
     */
	getInverse: function(command) {
		var _this=this;
		var inverse="";
		$.each(_this._commandInverses, function(index, element) {
            $.each(this, function(index, element) {
            	if(index==command) {
            		inverse = element;
            	}
            });
        });
		return inverse;
	}
};