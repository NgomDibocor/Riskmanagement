({
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method doInit
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	  doInit : function(component, event, helper) { 
	   // call the apex class method and fetch contact list
	   	var rowActions = helper.getRowActions.bind(this, component);
	   component.set('v.columns', [ {
			label : 'Name',
			fieldName : 'Name',
			type : 'text'
		}, {
			label : 'Invitation',
			fieldName : 'invitation',
			type : 'text'
		}, {
			type : 'action',
			typeAttributes : {
				rowActions : rowActions
			}
		} ]);
	  },
	
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description open modal
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	openModalContacts : function(component, event, helper) {
   
		component.set('v.ContactList', event.getParam('contactList'));
		component.set('v.workshop', event.getParam('workshop'));
		component.set("v.isOpenModalContactWorkshop", true);
	},
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method close modal
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	closeModalWorkshopContact : function(component, event, helper) {
                         
		component.set("v.isOpenModalContactWorkshop", false);
	},
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method getselectedRows
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	getselectedRows : function(component, event, helper) {
		var selectedRows = event.getParam('selectedRows');
		var contactsWorkshop = [];
		selectedRows
				.forEach(function(selectedRow) {
					console.log('id=' + selectedRow.Id);
					var newcontactworkshop = {};
					newcontactworkshop.sobjectType = 'orm_ContactWorkshop__c';
					newcontactworkshop.orm_contact__c = selectedRow.Id;
					newcontactworkshop.orm_notification__c = false;
					newcontactworkshop.orm_Workshop__c = component
							.get("v.workshop");

					contactsWorkshop.push(newcontactworkshop);
					console.log('v.ContactWorkshopList  nbre'
							+ component.get("v.ContactWorkshopList").length);
				});

		component.set("v.ContactWorkshopList", contactsWorkshop);

	},
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method createContactWorkshop
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	createContactWorkshop : function(component, event, helper) {

		var relatedcontactworkshop = component.get("v.ContactWorkshopList");
		var action = component.get('c.addWorkShopContact');
		action.setParams({
			"items" : relatedcontactworkshop
		});
		
		action.setCallback(this, function(response) {
			var state = response.getState();
			console.log(state);
			if (state == "SUCCESS") {
				alert("successful association");
				helper.refreshContactWorkshop(component);
			} else {
				alert("failed association");
			}
		});
		$A.enqueueAction(action);
		//component.set("v.isOpenModalContactWorkshop", false);
	},
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method handleRowAction
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	handleRowAction : function(component, event, helper) {

		var action = event.getParam('action');
		var row = event.getParam('row');
		switch (action.name) {
		case 'dissociate_contact':
			helper.deleteContactWorkshop(component, row);
			break;
		case 'association_contact':
			helper.addContactWorkshop(component, row);
		case 'send_email':
			helper.sendMailContactWorkshop(component, row);
		default:
			break;
		}

	}
	

})