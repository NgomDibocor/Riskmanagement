({
	/**
	 * @author: Salimata NGOM
	 * @date: Creation:  2018-08-06
	 * @description: method for create contact
	 *               
	 */
	createContact : function(component, event, helper) {
		var firstname = component.find('idname');
		var lastname = component.find('idlastname');
		var phone = component.find('idphone');
		var mail = component.find('idemail');

		var isItemValid = true;
		
	if ($A.util.isEmpty(firstname.get('v.value')) || $A.util.isEmpty(lastname.get('v.value')) || $A.util.isEmpty(mail.get('v.value'))) {
			isItemValid = false;

		}

		if (isItemValid) {
			
			// new item contact

			var newItem = component.get("v.item");

			newItem.orm_organisation__c = component.get('v.assessmentData').orm_organisation__c;
			newItem.FirstName = firstname.get('v.value');
			newItem.LastName = lastname.get('v.value');
			newItem.Phone = phone.get('v.value');
			newItem.Email = mail.get('v.value');
			var action = component.get('c.add');
			action.setParams({
				"item" : newItem
			});
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (state == "SUCCESS") {
				
					component.set("v.item", {
						'sobjectType' : 'Contact',
						'FirstName': '',
                        'LastName': '',
						'Phone' : '',
						'Email' : '',
						'orm_organisation__c' : ''
					});
				
				var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_contact_menu")+" "+$A.get("$Label.c.orm_toast_success"),
                'type' : 'success',
                'mode' : 'dismissible'
            });      
              
            toast.fire(); 
            component.set("v.isOpen", false);
            var evt = $A.get("e.c:OrmContactCreatedEvt");
			evt.setParams({
			   "Assessmentdata" : component.get('v.assessmentData').orm_organisation__c
			});
			evt.fire();          
          	var evnt = $A.get("e.c:OrmCloseContactWrokshopEvnt");
			evnt.fire();
				} else {
					let
					errors = response.getError();
					let
					message = 'Unknown error'; // Default error message
					// Retrieve the error message sent by the server
					if (errors && Array.isArray(errors) && errors.length > 0) {
						message = errors[0].message;
					}
					// Display the message
					console.error(message);
				}
			});
			$A.enqueueAction(action);


		} else {
		
						var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_error_field_empty"),
				'type' : 'error',
				'mode' : 'dismissible'
			});
			toast.fire();
		}

	},
	openModalContact : function(component, event) {
		        component.set("v.isOpen", true);
		        component.set("v.isOpenModalContactWorkshop",false);
		component.set('v.assessmentData', event.getParam('Assessmentdata'));
	},
	closeModal:function(component,event){
		var evt = $A.get("e.c:OrmCloseContactWrokshopEvnt");
			evt.fire();
			  component.set("v.isOpen", false);
	}
})