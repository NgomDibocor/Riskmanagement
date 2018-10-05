({/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description call apex class method for remove records workshop
	 * @history 2018-10-04 : Salimata NGOM - Implementation
	 */
	deleteSelectedHelper : function(component, event, deleteRecordsIds) {
		var action = component.get('c.deleteRecordWorkshop');
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
						var evt = $A
						.get("e.c:OrmRefreshWorkshopEvnt");
						evt.fire();
					}
				});
		$A.enqueueAction(action);
	},
})