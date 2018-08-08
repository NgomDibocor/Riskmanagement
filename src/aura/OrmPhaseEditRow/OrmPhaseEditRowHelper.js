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
                console.log("component.get('v.allPhases') " + 
                		JSON.stringify(component.get("v.allPhases")));
            }
        });
        $A.enqueueAction(action);
    }
})