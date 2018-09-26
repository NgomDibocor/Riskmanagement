({ 
     /**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description call apex class method for remove records assumption
	 * @history 2018-09-05 : Salimata NGOM - Implementation
	 */
	deleteSelectedHelper : function(component, event, deleteRecordsIds) {
		var action = component.get('c.deleteRecordAssumption');
		// pass the all selected record's Id's to apex method
		action.setParams({
			"lstRecordId" : deleteRecordsIds
		});
		action
		.setCallback(
				this,
				function(response) {
					// store state of response
					var state = response.getState();
					if (state === "SUCCESS") {
						console.log(state);
						if (response.getReturnValue() != '') {
							// if getting any error while delete the
							// records , then display a alert msg/
							alert('The following error has occurred. while Delete record-->'
									+ response.getReturnValue());
						} else {
							console
							.log('check it--> delete successful');
						}
						// fire the event function for refresh the List
						// view
						// this.onLoad(component, event);
						component.set("v.selectedRowsCount", 0) ; 
						var evt = $A
						.get("e.c:OrmAssumptionAssessmentRiskCreatedEvt");
						evt.fire();
					}
				});
		$A.enqueueAction(action);
	},
})