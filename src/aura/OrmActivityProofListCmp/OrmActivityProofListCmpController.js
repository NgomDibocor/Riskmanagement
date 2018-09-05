({
	doInit: function(component, event, helper) {
		component.set("v.idActivity", event.getParam('idActivity'));
		var idActivity = component.get('v.idActivity');
		console.log(idActivity);
	},
	
	openNewActivityProof : function(component, event, helper) {
		var idActivity = component.get('v.idActivity');
		var evt = $A.get("e.c:OrmNewActivityProofClickedEvt");
	        evt.setParams({
	            "idActivity": idActivity
	        });
        evt.fire();
		
	},
})