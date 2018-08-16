({
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description dissociate contacts selected to workshop
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
  deleteContactWorkshop : function(component,row) {
  alert("delete "+row.Id+''+component.get('v.workshop').Id);
	//get contact workshop
	var contactworkshop=component.get('c.getContactWorkshop');
	contactworkshop.setParams({
	"item":component.get('v.workshop').Id,
	"contact":row.Id
	});
	contactworkshop.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
            //getdeleteWorkShopContact
            var contactworkshopItem=response.getReturnValue();
            var action=component.get('c.deleteContactWorkshop');
            action.setParams({
	"item":contactworkshopItem});
	action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
            //fire toast event
            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "The record has been delete successfully.",
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
           //refresh workshop list
           
            
            } else {
               //fire toast event
            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Error!",
                            "message": "Failed to delete Record.",
                            'type' : 'error',
                            'mode' : 'dismissible'
                        });
            
            }
        });
        $A.enqueueAction(action);
            
            } else {
                alert("failed getContactworkshop");
            }
        });
        $A.enqueueAction(contactworkshop);
        	component.set("v.isOpenModalContactWorkshop", false);
      
	},
	 getRowActions: function (cmp, row, doneCallback) {
	 if(row.invitation){
	  var actions = [{
            'label': 'Dissociation',
            'iconName': 'utility:delete',
            'name': 'dissociate_contact'
        }];
	 }else{
	 var actions = [{
            'label': 'Association',
            'iconName': 'utility:zoomin',
            'name': 'association_contact'
        }];
	 }
        // simulate a trip to the server
        setTimeout($A.getCallback(function () {
            doneCallback(actions);
        }), 200);
    },
    
      addContactWorkshop : function(component,row) {
      var newcontactworkshop={};
        newcontactworkshop.sobjectType='orm_ContactWorkshop__c';
	            newcontactworkshop.orm_contact__c = row.Id;
	           newcontactworkshop.orm_notification__c = false;
	            newcontactworkshop.orm_Workshop__c =  component.get("v.workshop").Id;
	            component.set("v.ContactWorkshopList", newcontactworkshop);
      var action = component.get('c.addWorkShopContact');
        action.setParams({
            "items": component.get("v.ContactWorkshopList")
        });
    
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state == "SUCCESS") {
                 //fire toast event
            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Contact associated with succes",
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });
              
            } else {
                alert("failed association");
            }
        });
        $A.enqueueAction(action);
      },
      
      refreshContactWorkshop:function(component){
     
      }
	
	
})