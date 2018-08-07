({
	doInit : function(component, event, helper) {
	 // call the apex class method and fetch contact list  
         var action = component.get("c.findAllContact");
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              }
        });
        $A.enqueueAction(action);
		
	},
	
	openModalContacts : function(component, event, helper) {
	 // call the apex class method and fetch contact list  
         var action = component.get("c.findAllContact");
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              }
        });
        $A.enqueueAction(action);
	component.set("v.isOpenModalContactWorkshop", true);
	 component.set('v.workshop', event.getParam('Workshop'));
	},
	
	closeModalWorkshopContact: function(component, event, helper) {
	component.set("v.isOpenModalContactWorkshop", false);
	},
	
	createContactWorkshop :function(component, event, helper) {
	alert(JSON.stringify(component.get('v.assessmentData')));
		var contact = component.find('idcontact');
		var notif=component.find('idnotif');
		var isItemValid = true;
		
	if ($A.util.isEmpty(contact.get('v.value'))) {
			isItemValid = false;

		}

		if (isItemValid) {
		/ new item contactWorkshop

			var newItem = component.get("v.item");
 
			newItem.orm_contact__c=contact.get('v.value');
			newItem.orm_Workshop__c=component.get("v.workshop").Id;
			newItem.orm_dateAjout__c=System.Date();
			newItem.orm_notification__c=notif.get('v.value');
			alert(JSON.stringify(newItem));
			
		}
	}
	
})