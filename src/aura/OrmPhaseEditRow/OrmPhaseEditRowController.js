({
	doInit : function(component, event, helper) {		
        helper.fetchPickListVal(component, 'orm_phase__c', 'allPhases'); 
	},
	
	inlineEditDescription : function(component, event, helper){   
        // show the rating edit field popup 
        component.set("v.descriptionEditMode", true);        
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idDescription").focus();
        }, 100);
    },
    
    closeDescriptionBox : function (component, event, helper) {
       // on focus out, close the input section by setting the 'descriptionEditMode' att. as false
        component.set("v.descriptionEditMode", false);
        
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass", true);
        } else {
            component.set("v.showErrorClass", false);
        } 
    },
    
    onDescriptionChange : function(component,event,helper) { 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
})