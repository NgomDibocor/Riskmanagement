({
	getAssessmentRiskId : function(component, event, helper) {        
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Description', editable:'true', type: 'text'}
        ]);        
         component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.getCauses(component, component.get("v.idAssessmentRisk"));
    },
      onSave : function (component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    nexttt: function (component, event, helper) {
        helper.nexttt(component, event);
    },
    previoustt: function (component, event, helper) {
        helper.previoustt(component, event);
    },
       openModalDeleteCause: function(component, event, helper) {
  },
     deleteCausesfunction: function(component, event, helper) {
    	  console.log("selectedAccount "+JSON.stringify(component.get("v.SelectedAccount")));
    },
})