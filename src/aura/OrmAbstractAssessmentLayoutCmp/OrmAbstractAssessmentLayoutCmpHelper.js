({
	
    //This method allows to send the description of the fields to the <field description> component  
    sendValuesToFieldDescription  : function(component, event, helper, field, description) {
       component.set("v.closeFieldDescription",false);
            var evt = $A.get("e.c:OrmSendValuesToFieldDescriptionEvt");
            evt.setParams({
				"nomField" : field,
				"descriptionField" : description
			});
		    evt.fire();
    },
})