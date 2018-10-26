({
    refresh: function(component, event) {
        var action = component.get("c.findAllPhasesByAssessment");
        var idAssessment = component.get('v.idAssessment');
        action.setParam('idAss', idAssessment);
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
                'message':  totalRecordEdited + " Phases Records Updated",
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
     checkIfMapContentIsEmpty : function(component, event, myMap) {
        console.log("checkIfMapContentIsEmpty start")
        var lengthMap = Object.keys(myMap).length;
        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            if(myMap[page].length != 0){
              component.set("v.isEmptyMap", false);
              console.log("isEmptyMap", component.get("v.isEmptyMap"));
            }
        }
    },

})