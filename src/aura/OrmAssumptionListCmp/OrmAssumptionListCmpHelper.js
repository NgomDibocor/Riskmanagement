({
	refreshList : function(component, event) {
//		// call the apex class method and fetch assumption list
//		var action = component.get("c.findAllAssumptionByAssessmentRisk");
//		var assmntDataId = component.get('v.assessmentData').Id;
//			if(assmntDataId == null){
//			// alert("check if you have created the assessment");
//			var toast = $A.get('e.force:showToast');
//			toast.setParams({
//				'message' : $A.get("$Label.c.orm_toast_warning"),
//				'type' : 'warning',
//				'mode' : 'dismissible'
//			});
//
//			toast.fire();
//		} else {
//		action.setParam('asssessment', assmntDataId);
//		action.setCallback(this, function(response) {
//			var state = response.getState();
//			if (state === "SUCCESS") {
//				var storeResponse = response.getReturnValue();
//				// set assumptionList list with return value from server.
//				//component.set("v.assumptionList", storeResponse);
//				//component.set("v.storeAssumptionList", storeResponse);
//				
//				component.set('v.initialData', response.getReturnValue());
//                component.set('v.items', response.getReturnValue());
//                   // start pagination
//                    var pageSize = component.get("v.pageSizeBis");
//	                // get size of all the records and then hold into an attribute "totalRecords"
//	                component.set("v.totalRecords", component.get("v.items").length);
//	                // set star as 0
//	                component.set("v.startPage",0);
//	                var totalRecords = component.get("v.items").length;
//				    //var div = Math.trunc(totalRecords / pageSize);
//	                if(totalRecords === pageSize){
//	                  component.set("v.hideNext", true);
//	                  component.set("v.endPage", pageSize - 1);
//	                }else{
//	                  component.set("v.hideNext", false);
//	                  component.set("v.endPage", pageSize - 1);
//	                }
//	                var PaginationList = [];
//	                for(var i=0; i< pageSize; i++){
//	                    if(component.get("v.items").length> i)
//	                        PaginationList.push(component.get("v.items")[i]);    
//	                }
//	                component.set('v.PaginationList', PaginationList);
//                //end pagination
//
//			}
//		});
//		$A.enqueueAction(action);
//		}
		
		var action = component.get("c.findAllAssumptionByAssessmentRisk");
		 var assmntDataId = component.get('v.assessmentData').Id;
        action.setParam('asssessment', assmntDataId);
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
//	requiredValidation : function(component, event) {
//		// get all assumptionList
//		var allRecords = component.get("v.assumptionList");
//		var isValid = true;
//		// play a for loop on all assumptionList list and check that assumption
//		// name is not null,
//		for (var i = 0; i < allRecords.length; i++) {
//			if (allRecords[i].Name == null || allRecords[i].Name.trim() == '') {
//
//				isValid = false;
//			}
//		}
//		return isValid;
//	},
	saveDataTable: function(component, event, helper) {
        var editedRecords = component.find("datatableList").get("v.draftValues");
        var totalRecordEdited = editedRecords.length;
        var action = component.get("c.saveAssumption");
        action.setParams({
            'listAssumption': editedRecords
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
            	this.refreshList(component, event)
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