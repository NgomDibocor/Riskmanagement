({
	     initRecords: function(component, event, helper) {
    
      // call the apex class method and fetch activity list  
         var action = component.get("c.findWorkshopByAssessment");
       // var assmntDataId=component.get('v.assessmentData').Id;
        // alert('assesmment= '+assmntDataId);
        // var assmntDataId='a051H00000aQvq3QAC';
        action.setParam('asssessment','a051H00000d94cDQAQ');
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set WorkshopList list with return value from server.
                  component.set("v.WorkshopList", storeResponse);
              }
        });
        $A.enqueueAction(action);
         // set deafult count and select all checkbox value to false on load 
   // component.set("v.selectedCount", 0);
   // component.find("box3").set("v.value", false);
    },  
   
})