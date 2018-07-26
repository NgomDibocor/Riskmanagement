({
	closeFD : function(component, event, helper) {
		var evt = $A.get("e.c:OrmCloseFieldDescriptionEvt");
		evt.fire();
	}
})