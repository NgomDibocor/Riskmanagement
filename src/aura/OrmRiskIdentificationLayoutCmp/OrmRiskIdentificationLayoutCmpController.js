({
	 openModalNewRisk : function(component, event, helper){
        var evt = $A.get("e.c:OrmOpenNewRiskCmpEvt");
		evt.fire();
    },
     doInit : function(component, event, helper) {
       helper.fetchPicklist(component, event);
	},
	
	filterByPicklist:function(component,event,helper)
	{
	var nomfield=component.find("categorieRisk");
	var item = nomfield.get("v.value");
	
	var isItemValid = true;
        if ($A.util.isEmpty(item)) {
            isItemValid = false;
             helper.fetchPicklist(component, event);
        } 
        if (isItemValid) {
            var action = component.get('c.findAllResearchPicklist');
             action.setParams({
                "Research": item
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                 component.set('v.allRisk', response.getReturnValue());
                     }
                  else {
                  helper.fetchPicklist(component, event);
                  }
            });
            $A.enqueueAction(action);
        }
	},
	
	openFilterRisk:function(component,event,helper)
	{
       var nomfield=component.find("Name");
       var item =nomfield.get("v.value");
          var isItemValid = true;
        if ($A.util.isEmpty(item)) {
            isItemValid = false;
             helper.fetchPicklist(component, event);
        } 
        if (isItemValid) {
            var action = component.get('c.findAllResearch');
             action.setParams({
                "Research": item
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                 component.set('v.allRisk', response.getReturnValue());
                     }
                  else {
                  helper.fetchPicklist(component, event);
                  }
            });
            $A.enqueueAction(action);
        }
	},
	OpenPopupAssociation:function(component,event,helper)
	{
	alert("association");
	}
	
})