({
	deleteSelectedHelper : function (component, event, deleteRecordsIds) {
		//call apex class method
		var action = component.get('c.deleteCauses');
		// pass the all selected record's Id's to apex method 
		action.setParams({
			"causeIds": deleteRecordsIds
		});
		action.setCallback(this, function(response) {
			//store state of response
			var state = response.getState();
			if (state === "SUCCESS") {
				console.log(state);
				if (response.getReturnValue() != '') {
					// if getting any error while delete the records , then display a alert msg/
					alert('The following error has occurred. while Delete record-->' + response.getReturnValue());
				} else {
					console.log('check it--> delete successful');
				}
				// call the onLoad function for refresh the List view    
				var evt = $A.get('e.c:OrmCauseCreatedEvt');
				evt.fire();
			}
		});
		$A.enqueueAction(action);
	}
})