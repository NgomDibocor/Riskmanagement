({
	openModal : function(component, event, helper){
		// for Display Model,set the "isOpen" attribute to "true"
		component.set("v.isOpen", true);        
	},
	closeModal : function(component, event, helper){
		// for Hide/Close Model,set the "isOpen" attribute to "False"
		component.set("v.isOpen", false);
	},
})