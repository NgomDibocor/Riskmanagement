({
	 requiredValidation : function(component,event) {
        // get all workshop	
        var allRecords = component.get("v.WorkshopList");
        var isValid = true;
        // play a for loop on all workshop list and check that workshop title is not null,   
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
   
                isValid = false;
            }  
        }
        return isValid;
    },
     /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description refresh list workshop 
 * @history 
 * 2018-08-24 : Salimata NGOM - Implementation
 */
    refreshList : function(component, event) {
     var assmntDataId=component.get('v.assessmentData').Id;
		var action = component.get('c.findWorkshopByAssessment');
		action.setParam('asssessment',assmntDataId);
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
              component.set('v.WorkshopList', response.getReturnValue());
              
            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	}
})