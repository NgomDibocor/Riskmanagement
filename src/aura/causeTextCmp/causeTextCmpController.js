({
    getAssessmentRiskId: function(component, event, helper) {
        component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        }]);
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.getCauses(component, component.get("v.idAssessmentRisk"));
    },
    onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    nexttt: function(component, event, helper) {
        helper.nexttt(component, event);
    },
    previoustt: function(component, event, helper) {
        helper.previoustt(component, event);
    },

    selectCauses: function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var causes = [];
        selectedRows.forEach(function(selectedRow) {
            var causesss = {};
            causesss.sobjectType = 'Macro';
            causesss.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
            causesss.Id = selectedRow.Id;
            causes.push(causesss);
        });
        // Display that fieldName of the selected rows
        component.set("v.causesSelected", causes);
        console.log("selectedAccount " + JSON.stringify(component.get("v.causesSelected")));
    },
    deleteCausesfunction: function(component, event, helper) {
        console.log("selectedAccount " + JSON.stringify(component.get("v.SelectedAccount")));
    },
})