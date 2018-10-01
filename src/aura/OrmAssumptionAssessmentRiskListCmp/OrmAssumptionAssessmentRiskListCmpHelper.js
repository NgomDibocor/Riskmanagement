({
	refreshList : function(component, event) {
		// call the apex class method and fetch assumption list
		var action = component.get("c.findAssumptionByAssessmentRisk");
		var idAssessmentRisk = component.get("v.idAssessmentRisk");
			if(idAssessmentRisk == null){
			// alert("check if you have created the assessment");
			var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_toast_warning"),
				'type' : 'warning',
				'mode' : 'dismissible'
			});

			toast.fire();
		} else {
		action.setParam('asssessmentRiskId', idAssessmentRisk);
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var storeResponse = response.getReturnValue();
				// set assumptionList list with return value from server.
				//component.set("v.assumptionRiskList", storeResponse);
				//component.set("v.storeAssumptionList", storeResponse);
				component.set('v.initialData', response.getReturnValue());
                component.set('v.items', response.getReturnValue());
                   // start pagination
                    var pageSize = component.get("v.pageSize");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                // set star as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.PaginationList', PaginationList);
                //end pagination
				
			}
		});
		$A.enqueueAction(action);
		}
	},
	requiredValidation : function(component, event) {
		// get all assumptionList
		var allRecords = component.get("v.assumptionRiskList");
		var isValid = true;
		// play a for loop on all assumptionList list and check that assumption
		// name is not null,
		for (var i = 0; i < allRecords.length; i++) {
			if (allRecords[i].Name == null || allRecords[i].Name.trim() == '') {

				isValid = false;
			}
		}
		return isValid;
	}
})