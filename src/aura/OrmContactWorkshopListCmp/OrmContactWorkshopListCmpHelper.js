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
 // var contactListOld=component.get('v.ContactList');
	//get contact workshop
	var contactworkshop=component.get('c.getContactWorkshop');
	contactworkshop.setParams({
	"item":component.get('v.workshop'),
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

		              //refresh list contact  
		            this.refreshContactWorkshop(component);
            
            } else {
             alert('failed delete');
            
            }
        });
        $A.enqueueAction(action);
            } else if(state ==="ERROR") {
              let errors = response.getError();
              let message = 'Unknown error'; // Default error message
              // Retrieve the error message sent by the server
              if (errors && Array.isArray(errors) && errors.length > 0) {
                 message = errors[0].message;
                    }
                  // Display the message
                console.error(message);
            }
        });
         $A.enqueueAction(contactworkshop);
    
      
         //  alert('contactListOld'+contactListOld);
         	//component.set("v.isOpenModalContactWorkshop", false);
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
    
      addContactWorkshop: function(component,row) {
      var newcontactworkshop={};
        newcontactworkshop.sobjectType='orm_ContactWorkshop__c';
	            newcontactworkshop.orm_contact__c = row.Id;
	           newcontactworkshop.orm_notification__c = false;
	            newcontactworkshop.orm_Workshop__c =  component.get("v.workshop");
	            component.set("v.ContactWorkshopList", newcontactworkshop);
      var action = component.get('c.addWorkShopContact');
        action.setParams({
            "items": component.get("v.ContactWorkshopList")
        });
    
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if ( state == "SUCCESS") {
                 //fire toast event
                 /**
            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Contact associated with succes",
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });**/
              this.refreshContactWorkshop(component);
            } else {
                alert("failed association");
            }
        });
        $A.enqueueAction(action);
      },
      
      refreshContactWorkshop:function(component){
       var action = component.get("c.findAllContact");
		action
				.setCallback(
						this,
						function(response) {
							var state = response.getState();
							if (state === "SUCCESS") {
							var storeResponse = response.getReturnValue();
								// console.log(JSON.stringify(storeResponse));

								// set ContactListTemp list with return value
								// from server.
								component.set("v.ContactListTemp",
										storeResponse);
if (component.get("v.ContactListTemp").length > 0) {

      // call the apex class method and fetch
									// contact list workshop
									var action1 = component
											.get("c.findAllContactWorkshop");
									action1.setParams({
										'item' :component.get('v.workshop')
									});
									action1
											.setCallback(
													this,
													function(response) {
														var stateworkshop = response
																.getState();
														if (stateworkshop == "SUCCESS") {
															var storeResponseWorkshopcontact = response
																	.getReturnValue();
															component
																	.set(
																			"v.ContactWorkshopList",
																			storeResponseWorkshopcontact);
																			
															// iterate and check
															// if contact is
															// associated to
															// workshop
															//alert('contactList au refresh'+contactListOld);
															//component.set("v.ContactListTemp", contactListOld);
															component.get("v.ContactListTemp").forEach(
																			function(contact) {
																				component.get("v.ContactWorkshopList").forEach(
																								function(contactworkshop) {
																								
																									if (contactworkshop.orm_contact__c == contact.Id) {
																										contact.invitation = "Invited";
																									}
																								});

																			});

																			component.set("v.ContactList", component.get("v.ContactListTemp"));
														}
													});
									$A.enqueueAction(action1);
     
      }
      
							}
							});
				$A.enqueueAction(action);
	}
	
})