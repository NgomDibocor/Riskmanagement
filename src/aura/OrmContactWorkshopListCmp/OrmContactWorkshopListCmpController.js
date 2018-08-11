({
	doInit : function(component, event, helper) {
	   
	 // call the apex class method and fetch contact list  
       /**  var action = component.get("c.findAllContact");
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                // console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              }
        });
        $A.enqueueAction(action);
         
		**/
	},
	
	openModalContacts : function(component, event, helper) {

	 // call the apex class method and fetch contact list  
         var action = component.get("c.findAllContact");
         action.setParams({
         'item':event.getParam('Workshop')});
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
               // console.log(JSON.stringify(storeResponse));
                
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
<<<<<<< HEAD
                    //console.log(component.get("v.ContactList"));
             
                	
                   if(component.get("v.ContactList").length > 0){
                   
                
                   // call the apex class method and fetch contact list workshop
=======
              
                	// call the apex class method and fetch contact list workshop
>>>>>>> 7fb370c90b153aa956d440b051826e2f5f84b3b8
          var action1 = component.get("c.findAllContactWorkshop");
          action1.setParams({
          'item':event.getParam('Workshop')
          });
<<<<<<< HEAD
           action1.setCallback(this, function(response) {
              var stateworkshop = response.getState();
              if (stateworkshop === "SUCCESS") {
                  var storeResponseWorkshopcontact = response.getReturnValue();
                   component.set("v.ContactWorkshopList", storeResponseWorkshopcontact);
                 
                 //iterate and check if contact is associated to workshop
                  component.get("v.ContactList").forEach(function(contact){
                  component.get("v.ContactWorkshopList").forEach (function(contactworkshop){
                  	if(contactworkshop.orm_contact__c == contact.Id){
                  contact.association= "associé";
                  }else{
                  contact.association= "non associé";
                  }
                  });
                  //helper.checkContactWorkshop(contact.Id,component.get("v.ContactWorkshopList"));
                    
                          });
                           console.log(component.get("v.ContactList"));
                          
                  }
                  });
                     $A.enqueueAction(action1);
       
        }
              }
        });
        
                 
        $A.enqueueAction(action);
        
          
             
          component.set('v.workshop', event.getParam('Workshop'));
     
      
	component.set("v.isOpenModalContactWorkshop", true);
	                 // Set the columns of the Table
       component.set('v.columns', [
           {label: 'Name', fieldName: 'Name', type: 'text'},
           {label: 'Association', fieldName: 'association', type: 'text' } ]);
          
	alert(JSON.stringify(component.get("v.ContactList")));
  // console.log(component.get("v.ContactWorkshopList"));
=======
             action1.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponseWorkshopcontact = response.getReturnValue();
                  //console.log(JSON.stringify(storeResponseWorkshopcontact));
               // set ContactWorkshopList list with return value from server.
                  component.set("v.ContactWorkshopList", storeResponseWorkshopcontact);
                  //iterate and check if contact is associated to workshop
                  component.get("v.ContactList").forEach(function(contact){
                  contact.association= helper.checkContactWorkshop(contact.Id,storeResponseWorkshopcontact);
                  });
                  console.log(component.get("v.ContactList"));
                  
                     // Set the columns of the Table
       component.set('v.columns', [
           {label: 'Name', fieldName: 'Name', type: 'text'},
           {label: 'Association', fieldName: 'association', type: 'boolean'} ]);
          
                  
                 
              }
        });
        $A.enqueueAction(action1);
               
            }
            
        });
        $A.enqueueAction(action);
      
	component.set("v.isOpenModalContactWorkshop", true);
	 component.set('v.workshop', event.getParam('Workshop'));
>>>>>>> 7fb370c90b153aa956d440b051826e2f5f84b3b8

	},
	
	closeModalWorkshopContact: function(component, event, helper) {
	component.set("v.isOpenModalContactWorkshop", false);
	},
	   getselectedRows: function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var contactsWorkshop = [];
        selectedRows.forEach(function(selectedRow) {
        console.log('id='+selectedRow.Id);
        var newcontactworkshop={};
        newcontactworkshop.sobjectType='orm_ContactWorkshop__c';
	            newcontactworkshop.orm_contact__c = selectedRow.Id;
	           newcontactworkshop.orm_notification__c = false;
	            newcontactworkshop.orm_Workshop__c =  component.get("v.workshop").Id;
	        
	            contactsWorkshop.push(newcontactworkshop);
	            console.log('v.ContactWorkshopList  nbre' + component.get("v.ContactWorkshopList").length);
        });
       
        component.set("v.ContactWorkshopList", contactsWorkshop);
        
    },
	
	createContactWorkshop :function(component, event, helper) {
	
        var relatedcontactworkshop= component.get("v.ContactWorkshopList");
       
        var action = component.get('c.addWorkShopContact');
        action.setParams({
            "items": relatedcontactworkshop
        });
       alert(JSON.stringify(relatedcontactworkshop));
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state == "SUCCESS") {
                alert("successful association");
            } else {
                alert("failed association");
            }
        });
        $A.enqueueAction(action);
        	component.set("v.isOpenModalContactWorkshop", false);
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