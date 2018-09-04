({

    requiredValidation : function(component,event) {
        // get all activity.. 	
        var allRecords = component.get("v.ActivityList");
        var isValid = true;
        // play a for loop on all activity list and check that activty name is not null,   
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description refresh list activity 
 * @history 
 * 2018-08-20 : Salimata NGOM - Implementation
 */
    refreshList : function(component, event) {
		var action = component.get('c.findActivityByAssessment');
		action.setParam("assessment",component.get("v.assessmentData").Id);
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
              component.set('v.ActivityList', response.getReturnValue());
              
            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	}
})