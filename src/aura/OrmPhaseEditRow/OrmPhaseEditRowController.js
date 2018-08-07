({
	doInit : function(component, event, helper) {		
        helper.fetchPickListVal(component, 'orm_phase__c', 'allPhases'); 
	},
	
	inlineEditPhase : function(component, event, helper) {
		// show the phase edit field popup 
        component.set("v.phaseEditMode", true); 
        // after set ratingEditMode true, set picklist options to picklist field 
        component.find("phaseId").set("v.options" , component.get("v.allphases"));
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("phaseId").focus();
        }, 100);
	},
	
	closePhaseBox : function(component, event, helper) {
		// on focus out, close the input section by setting the 'phaseEditMode' att. as false
        component.set("v.phaseEditMode", false); 
	},
	
	onPhaseChange : function(component, event, helper) {
		 // if picklist value change,
        // then show save and cancel button by set attribute to true
        component.set("v.showSaveCancelBtn",true);
	},
})