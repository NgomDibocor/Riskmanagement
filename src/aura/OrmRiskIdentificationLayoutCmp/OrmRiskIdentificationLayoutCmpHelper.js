({
	 fetchPicklist : function(component, event) { 
        var actionOrgs = component.get("c.findAll");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
               
                var rows = response.getReturnValue();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
              //  if (row.testOrganisation__c) row.testOrganisationName = row.testOrganisation__r.Name;
              
            }
             component.set('v.allRisk',rows);
               // alert(JSON.stringify(response.getReturnValue()));
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.risk"), 'fld' : 'orm_categorieRisk__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allCategorieRisk', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(actionOrgs);
	},
})