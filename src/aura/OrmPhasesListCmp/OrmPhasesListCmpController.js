({
	doInit : function(component, event, helper) {
		
	},
	
	openOrmPhaseNewCmp : function(component, event, helper) {
		
	},
	
	openOrmPhaseNewCmp : function(component, event, helper) {
		
		var idAssessment = component.get('v.idAssessment');
		if (idAssessment == null) {
			component.set('v.openModalError', true);
		} else {
			var evt = $A.get('e.c:OrmEventNewPhaseClicked');
			evt.fire();
		}
	},
	
	closeOpenModalError : function(component, event, helper) {
		component.set('v.openModalError', false);
	}
})