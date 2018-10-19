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
        var selectedRows = event.getParam('selectedRows');
        var causes = [];
        selectedRows.forEach(function(selectedRow) {
            var newCause = {};
            newCause.sobjectType = 'Macro';
            newCause.Id = selectedRow.Id;
            causes.push(newCause);
        });
        console.log(JSON.stringify(causes));
        component.set("v.selectCauses", causes);

    },
     deleteCausesfunction: function(component, event, helper) {
        var deleteCauses = component.get("v.selectCauses");
         var dTable = component.find("accountTable");
        var selectedRows = dTable.getSelectedRows();
        console.log(JSON.stringify(selectedRows));
    },
})