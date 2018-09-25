({
	refreshList : function(component, event) {
		// call the apex class method and fetch assumption list
		var action = component.get("c.findAllAssumptionByAssessmentRisk");
		vvar idAssessmentRisk = component.get("v.idAssessmentRisk");
			if(assmntDataId == null){
			// alert("check if you have created the assessment");
			var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_toast_warning"),
				'type' : 'warning',
				'mode' : 'dismissible'
			});

			toast.fire();
		} else {
		action.setParam('asssessmentId', idAssessmentRisk);
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var storeResponse = response.getReturnValue();
				// set assumptionList list with return value from server.
				component.set("v.assumptionList", storeResponse);
				component.set("v.storeAssumptionList", storeResponse);

			}
		});
		$A.enqueueAction(action);
		}
		
	},
})