({
    // fetch picklist values dynamic from apex controller 
    fetchPickListVal: function(component, fieldName, picklistOptsAttributeName) {
        var action = component.get("c.getSelectOptions");
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_phase__c'
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.allPhases", opts);
                /*console.log("component.get('v.allPhases') " + 
                		JSON.stringify(component.get("v.allPhases")));*/
            }
        });
        $A.enqueueAction(action);
    },
    
    deleteSelectedHelper: function(component, event, deleteRecordsIds) {
		//call apex class method
		var action = component.get('c.deletePhases');
		// pass the all selected record's Id's to apex method 
		action.setParams({
			"phaseIds": deleteRecordsIds
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
				var evt = $A.get('e.c:OrmEventNewPhaseCreated');
				evt.fire();
			}
		});
		$A.enqueueAction(action);
	},
	
	// For count the selected checkboxes. 
    checkboxSelect: function(component, event, helper) {
    	// get the selected checkbox value  
    	var selectedRec = event.getSource().get("v.value");
    	// get the selectedCount attrbute value(default is 0) for add/less numbers. 
    	var getSelectedNumber = component.get("v.selectedCount");
    	// check, if selected checkbox value is true then increment getSelectedNumber with 1 
    	// else Decrement the getSelectedNumber with 1     
    	if (selectedRec == true) {
    		getSelectedNumber++;
    	} else {
    		getSelectedNumber--;
    	}
    	// set the actual value on selectedCount attribute to show on header part. 
    	component.set("v.selectedCount", getSelectedNumber);
    },
    
})