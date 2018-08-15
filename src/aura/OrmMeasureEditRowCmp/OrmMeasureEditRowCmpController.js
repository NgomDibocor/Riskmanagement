({
	inlineEditName : function(component, event, helper) {
		// show the name edit field popup 
        component.set("v.nameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idName").focus();
        }, 100);
	},
	
	inlineEditDescription : function(component, event, helper){   
        // show the rating edit field popup 
        component.set("v.descriptionEditMode", true);        
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idDescription").focus();
        }, 100);
    },
})