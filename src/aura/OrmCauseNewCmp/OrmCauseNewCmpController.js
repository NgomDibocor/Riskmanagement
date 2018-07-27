({
	doInit : function(component, event, helper) {
		
	},
	
	openOrmCauseNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
        component.set('v.assessmentId', event.getParam('idAssessment'));
	},
	
	createItem : function(component, event, helper){
	
	}
})