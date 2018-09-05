({
	refreshList : function(component, event) {
		// call the apex class method and fetch assumption list
		var action = component.get("c.findAllAssumptionByAssessmentRisk");
		var assmntDataId = component.get('v.assessmentData').Id;
		action.setParam('asssessment', assmntDataId);
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
	},
	requiredValidation : function(component, event) {
		// get all assumptionList
		var allRecords = component.get("v.assumptionList");
		var isValid = true;
		// play a for loop on all assumptionList list and check that assumption
		// name is not null,
		for (var i = 0; i < allRecords.length; i++) {
			if (allRecords[i].Name == null || allRecords[i].Name.trim() == '') {

				isValid = false;
			}
		}
		return isValid;
	},
})