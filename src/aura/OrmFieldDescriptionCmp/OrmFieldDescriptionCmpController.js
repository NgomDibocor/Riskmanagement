({
	closeFD : function(component, event, helper) {
		var evt = $A.get("e.c:OrmCloseFieldDescriptionEvt");
		evt.fire();
	},
	
	showDescriptionField : function(component, event, helper) {
		component.set("v.nomField", event.getParam("nomField"));
		component.set("v.descriptionField", event.getParam("descriptionField"));
	},
	showDescriptionsField : function(component, event, helper) {
		component.set("v.closeFieldDescription", event.getParam("closeFieldDescription"));
		component.set("v.nomField", event.getParam("nomField"));
		component.set("v.descriptionField", event.getParam("descriptionField"));
	},
})