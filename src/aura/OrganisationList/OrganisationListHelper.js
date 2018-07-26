({
	doFetchContact : function(component) {
		var action = component.get('c.getOrganisations');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                 var rows = response.getReturnValue();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.testOrganisation__c) row.testOrganisationName = row.testOrganisation__r.Name;
            }

                component.set('v.OrganisationList',rows);
                
            } else {
                alert('ERROR Reçu');
            }
        });
        $A.enqueueAction(action);
	},
    
    deleteOrg: function(cmp, org){
        var action = cmp.get("c.deleteOrg");
    	action.setParams({
            "item": org
        });
		action.setCallback(this, function(response){            
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("SUCCESS");
            } else {
                alert("ERROR");
            }
    	});
        $A.enqueueAction(action); 
	}
    
})