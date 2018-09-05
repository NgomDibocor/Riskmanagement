({
	ormShowActivityProofList: function(component, event, helper) {
		component.set("v.idActivity", event.getParam('idActivity'));
		var idActivity = component.get('v.idActivity');
		console.log(idActivity);
	}
})