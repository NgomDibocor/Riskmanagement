({
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
					var evt = $A.get("e.c:OrmNewContactEvt");
					evt.setParams({
						"Assessmentdata" : component.get("v.assessmentData")
					});
					evt.fire();

					component.set("v.item", {
						'sobjectType' : 'Contact',
						'FirstName': '',
                        'LastName': '',
						'Phone' : '',
						'Email' : '',
						'orm_organisation__c' : ''
					});
					component.set("v.isOpen", false);
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
			// alert("ajout échouée");
		}

	},
	openModalContact : function(component, event) {
		component.set("v.isOpen", true);
		component.set('v.assessmentData', event.getParam('Assessmentdata'));
	},
})