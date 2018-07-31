({
	openCurrentCmp : function(component, event){
        //alert(event.getParam('idAssessment') + 'laye');
        component.set('v.assessmentId', event.getParam('idAssessment'));
	},
	
    closeModal : function(component){
		// for Hide/Close Model,set the "isOpen" attribute to "False"
		component.set("v.isOpen", false);
	}
})