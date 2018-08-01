({
	 fetchPicklist : function(component, event) { 
	 var itemRisk=component.get("v.categorieRisk");
	 var nomfield=component.find("categorieRisk");
	 var item = nomfield.get("v.value");
        var actionOrgs = component.get("c.findAll");
         actionOrgs.setParams({
                "item": itemRisk
                });
                component.set("v.categorieRisk",item);
                
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS')
            {
               
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) 
		            {
		                var row = rows[i]; 
		            }
                component.set('v.allRisk',rows);
               // alert(JSON.stringify(response.getReturnValue()));
               
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
            }
            	 else
            	  {
                
               alert("l'Element n'a pas été retrouvé");
            	  }
        });
     
        $A.enqueueAction(actionOrgs);
	}
})