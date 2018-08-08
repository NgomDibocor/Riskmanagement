({
	doInit : function(component, event, helper) {
	      // Set the columns of the Table
       component.set('v.columns', [
           {label: 'Name', fieldName: 'Name', type: 'text'},
           {label: 'Notification', fieldName: 'orm_notification__c', type: 'text'} ]);
           
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
	alert(JSON.stringify(component.get('v.workshop')));
		var contact = component.find('idcontact');
		var notif=component.find('idnotif');
		var isItemValid = true;
		
	if ($A.util.isEmpty(contact.get('v.value'))) {
			isItemValid = false;

		}

		if (isItemValid) {
		// new item contactWorkshop

			var newItem = component.get("v.item");
 
			newItem.orm_contact__c=contact.get('v.value');
			newItem.orm_Workshop__c=component.get("v.workshop").Id;
			newItem.orm_notification__c=notif.get('v.value');
			
			  var action = component.get('c.addWorkShopContact');
            action.setParams({
                "item": newItem
            });
            alert(JSON.stringify(newItem));
               action
                .setCallback(
                    this,
                    function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS") {
                        alert('success');
                        /*
                          var evt = $A.get("e.c:OrmRefreshContactWorkshopEvt");
			evt.setParams({
			   "Workshop" : component.get("v.workshop")
			});
			evt.fire();
*/
                        component.set("v.item", {
                        'sobjectType' : 'orm_ContactWorkshop__c',
                        'orm_contact__c':'',
                        'Name':'',
                        'orm_dateAjout__c':'', 
                        'orm_notification__c':'',
                        'orm_Workshop__c':''
                            });
                            
                        }else
                        {
                             alert('error');
                        }
                    });
            $A.enqueueAction(action);
           
		}
	},
	/**
	refreshContactWorkshop  :function(component, event, helper) {
	component.set('v.workshop', event.getParam('Workshop'));
	
	 // call the apex class method and fetch contact workshop list  
         var action = component.get("c.findAllContactWorkshop");
          action.setParams({
                "item": component.get("v.workshop");
            });
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set Contact workshop list with return value from server.
                  component.set("v.ContactWorkshopList", storeResponse);
              }
        });
        $A.enqueueAction(action);
		
	},*/

	
})