({
	
	inlineEditName : function(component, event, helper) {
		// show the name edit field popup 
        component.set("v.NameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idName").focus();
        }, 100);
	},
	 closeNameBox : function(component, event, helper){ 
    	// on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.ameEditMode", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass", true);
        } else {
            component.set("v.showErrorClass", false);
        }
    },
    onNameChange : function(component, event, helper){ 
    	// if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
    
    inlineEditDescription : function(component, event, helper) {
		// show the name edit field popup 
        component.set("v.DescriptionEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idDescription").focus();
        }, 100);
	},
	 closeDescriptionBox : function(component, event, helper){ 
    	// on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.DescriptionEditMode", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass", true);
        } else {
            component.set("v.showErrorClass", false);
        }
    },
    onDescriptionChange : function(component, event, helper){ 
    	// if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
})