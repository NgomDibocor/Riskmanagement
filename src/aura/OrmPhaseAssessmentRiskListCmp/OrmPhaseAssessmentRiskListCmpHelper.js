({
	refresh : function(component, event) {	
		 var action = component.get("c.findAllPhaseByAssessmentRisk");
		 var idAssessmentRisk = component.get("v.idAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                var pageSize = component.get("v.pageSizeInlineEdit");
                component.set('v.ListData', response.getReturnValue());
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.ListData").length);
                //Set the current Page as 0
                component.set("v.currentPage", 0);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.ListData").length;
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.ListData").length > i) {
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
            } else {
                alert('ERROR');
            }
        });
        $A.enqueueAction(action);
	},
	saveDataTable: function(component, event, helper) {
        var editedRecords = component.find("datatableList").get("v.draftValues");
        var totalRecordEdited = editedRecords.length;
        var action = component.get("c.updatePhases");
        action.setParams({
            'phases': editedRecords
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //if update is successful
                 var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message':  totalRecordEdited + " Causes Records Updated",
                'type': 'success',
                'mode': 'dismissible'
            });
            toast.fire()
            	this.refresh(component, event)
                component.find("datatableList").set("v.draftValues", null);
                //helper.reloadDataTable(component);
            } else { //if update got failed
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': "error in update",
                'type': 'error',
                'mode': 'dismissible'
            });
            toast.fire()
            }

        });
        $A.enqueueAction(action);
    },
})