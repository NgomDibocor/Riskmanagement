({
    doInit: function(component, event, helper) {
        $A.createComponent(
            "c:OrganisationList",{                
            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    createOrganisationShow : function(component, event, helper){
       
        $A.createComponent(
            "c:OrganisationShow", {
                "id": event.getParam("id")
            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    createOrganisationEdit: function(component, event, helper){
       
        $A.createComponent(
            "c:OrganisationEdit", {
                "id": event.getParam("id")
            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
	/*updateCurrentView : function(component, event, helper) {
		component.set('v.currentView', event.getParam('currentView'))
	}*/
})