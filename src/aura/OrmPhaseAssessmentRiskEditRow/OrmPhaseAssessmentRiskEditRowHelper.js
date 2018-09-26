({
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
                component.set("v.selectedRowsCount", 0);
                var evt = $A.get('e.c:OrmEventNewPhaseAssessmentRiskCreated');
                evt.fire();
            }
        });
        $A.enqueueAction(action);
    },
})