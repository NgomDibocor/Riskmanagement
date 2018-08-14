({
	/***************************************************************************
	 * doInit : function(component, event, helper) { // call the apex class
	 * method and fetch contact list
	 *  // call the apex class method and fetch contact list
	 *  },
	 **************************************************************************/

	openModalContacts : function(component, event, helper) {
		component.set('v.workshop', event.getParam('Workshop'));
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
								// console.log(component.get("v.ContactList"));

								if (component.get("v.ContactListTemp").length > 0) {

									// call the apex class method and fetch
									// contact list workshop
									var action1 = component
											.get("c.findAllContactWorkshop");
									action1.setParams({
										'item' : component.get("v.workshop")
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
															component
																	.get(
																			"v.ContactListTemp")
																	.forEach(
																			function(
																					contact) {
																				component
																						.get(
																								"v.ContactWorkshopList")
																						.forEach(
																								function(
																										contactworkshop) {
																									if (contactworkshop.orm_contact__c == contact.Id) {
																										contact.invitation = "Invited";
																									}
																								});

																			});
															console
																	.log(component
																			.get("v.ContactListTemp"));

														}
													});
									$A.enqueueAction(action1);

								}
							}
						});

		$A.enqueueAction(action);

		component.set("v.ContactList", component.get("v.ContactListTemp"));
		var rowActions = helper.getRowActions.bind(this, component);
		// Set the columns of the Table
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
			} else {
				alert("failed association");
			}
		});
		$A.enqueueAction(action);
		component.set("v.isOpenModalContactWorkshop", false);
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

		// helper.getData(cmp);

		var actionName = event.getParam('action').name;
		alert(actionName);
		var colDef = event.getParam('columnDefinition');
		alert(colDef);
	}

})