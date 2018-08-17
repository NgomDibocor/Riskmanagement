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
  
	//get contact workshop
	var contactworkshop=component.get('c.getContactWorkshop');
	contactworkshop.setParams({
	"item":component.get('v.workshop').Id,
	"contact":row.Id
	});
	alert("delete "+component.get('v.workshop').Id+''+row.Id);
	
	contactworkshop.setCallback(this, function(response) {
	 
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
        
            //getdeleteWorkShopContact
            var contactworkshopItem=response.getReturnValue();
            var action=component.get('c.deleteContactWorkshop');
               alert("delete "+JSON.stringify(contactworkshopItem));
            action.setParams({
	"item":contactworkshopItem});
	action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
            //fire toast event
        /*   var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "The record has been delete successfully.",
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();*/
		              //refresh list contact  
		        
            
            } else {
             alert('failed delete');
            
            }
        });
        $A.enqueueAction(action);
            
            } else {
                alert("failed getContactworkshop");
            }
        });
         $A.enqueueAction(contactworkshop);
          this.refreshContactWorkshop(component, event);
        
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
      
      refreshContactWorkshop:function(component,event){

      // call the apex class method and fetch
									// contact list workshop
									var action1 = component
											.get("c.findAllContactWorkshop");
									action1.setParams({
										'item' :component.get("v.workshop")
									});
									action1
											.setCallback(
													this,
													function(response) {
														var stateworkshop = response
																.getState();
														if (stateworkshop === "SUCCESS") {
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
															component.set("v.ContactListTemp", component.get("v.ContactList"));
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
																				//alert(JSON.stringify(component.get('v.ContactList')));
														}
													});
									$A.enqueueAction(action1);
     
      }
	
	
})