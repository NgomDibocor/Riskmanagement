({
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method doInit
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
  doInit : function(component, event, helper){
      helper.refreshList(component, event);
  },
  
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method show measure details
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
showMeasure : function(component, event, helper) 
    {
    	var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	     evtSpinner.fire(); 
	     
	     var measureId = event.target.id;
         var idAssessment = document.getElementById( measureId ).getElementsByTagName( 'span' ).item(0).id;
         var idAssessmentRisk = document.getElementById( measureId ).getElementsByTagName( 'span' ).item(1).id;
         var action = component.get('c.getAssessment');
	     action.setParams({"idAss": idAssessment });
	     action.setCallback(this, function(response){
	          var state = response.getState();
	          if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowMeasureInfoEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			       "idMeasure" : measureId,
			       "idAssessmentRisk" : idAssessmentRisk
			     });
			     evt.fire();        
		     } else {
		        alert($A.get('$Label.c.orm_not_found'));
		     }
	     });
	     $A.enqueueAction(action);
	},
/**
 *
 * @author David diop
 * @version 1.0
 * @description method filter measures
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
	filter : function (component, event, helper){
    	
    	var assessmentRisks = component.get('v.initialData');
    	var data = assessmentRisks;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshList(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.orm_description__c) || regex.test(row.Name));
		        } catch (e) {
		    	   alert(e)
		        }
		   component.set("v.filterPagination", data);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilter(component, event);
         }        	
    },
})