({
doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
showAssessmentRisk : function(component, event, helper) 
    {
	     var measureId = event.target.id;
         var idAssessment = document.getElementById( measureId ).getElementsByTagName( 'span' ).item(0).id;
         var action = component.get('c.getAssessment');
	     action.setParams({"idAss": idAssessment });
	     action.setCallback(this, function(response){
	          var state = response.getState();
	          if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowMeasureInfoEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			       "idMeasure" : measureId
			     });
			     evt.fire();        
		     } else {
		        alert("l'élément n'a pas été chargé");
		     }
	     });
	     $A.enqueueAction(action);
	},
})