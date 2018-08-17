({
	
	  doInit : function(component, event, helper) { // call the apex class
	  //method and fetch contact list
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
	

	openModalContacts : function(component, event, helper) {
   
		component.set('v.ContactList', event.getParam('contactList'));
		component.set('v.workshop', event.getParam('workshop'));
		component.set("v.isOpenModalContactWorkshop", true);
	},

	closeModalWorkshopContact : function(component, event, helper) {
                         
		component.set("v.isOpenModalContactWorkshop", false);
	},
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
							.get("v.workshop").Id;

					contactsWorkshop.push(newcontactworkshop);
					console.log('v.ContactWorkshopList  nbre'
							+ component.get("v.ContactWorkshopList").length);
				});

		component.set("v.ContactWorkshopList", contactsWorkshop);

	},

	createContactWorkshop : function(component, event, helper) {

		var relatedcontactworkshop = component.get("v.ContactWorkshopList");

		var action = component.get('c.addWorkShopContact');
		action.setParams({
			"items" : relatedcontactworkshop
		});
		alert(JSON.stringify(relatedcontactworkshop));
		action.setCallback(this, function(response) {
			var state = response.getState();
			console.log(state);
			if (component.isValid() && state == "SUCCESS") {
				alert("successful association");
				helper.refreshContactWorkshop(component,event);
			} else {
				alert("failed association");
			}
		});
		$A.enqueueAction(action);
		//component.set("v.isOpenModalContactWorkshop", false);
	},

	handleRowAction : function(component, event, helper) {

		var action = event.getParam('action');
		var row = event.getParam('row');
		switch (action.name) {
		case 'dissociate_contact':
			helper.deleteContactWorkshop(component, row);
			break;
		case 'association_contact':
			helper.addContactWorkshop(component, row);
		default:
			break;
		}

	},
	handleHeaderAction : function(cmp, event, helper) {
		var actionName = event.getParam('action').name;
		alert(actionName);
		var colDef = event.getParam('columnDefinition');
		alert(colDef);
	}

})