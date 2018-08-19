({
    doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
    showAssessmentRisk : function(component, event, helper) {
         var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	     evtSpinner.fire(); 
    
         var assessmentRiskId = event.target.id;
         var idAssessment = document.getElementById( assessmentRiskId ).getElementsByTagName( 'span' ).item(0).id;
     
	     var action = component.get('c.getAssessment');
	     action.setParams({"idAss": idAssessment });
	     action.setCallback(this, function(response){
	          var state = response.getState();
	          if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowAssessmentRiskInfoEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			       "idAssessmentRisk" : assessmentRiskId
			     });
			     evt.fire();        
		     } else {
		        alert("l'élément n'a pas été chargé");
		     }
	     });
	     $A.enqueueAction(action);
	},

})