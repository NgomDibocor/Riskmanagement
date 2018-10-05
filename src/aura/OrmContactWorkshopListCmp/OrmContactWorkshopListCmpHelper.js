({	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description dissociate contacts selected to workshop
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	deleteContactWorkshop : function(component, row) {
		// var contactListOld=component.get('v.ContactList');
		// get contact workshop
		var contactworkshop = component.get('c.getContactWorkshop');
		contactworkshop.setParams({
			"item" : component.get('v.workshop').Id,
			"contact" : row.Id
		});

		contactworkshop.setCallback(this, function(response) {

			var state = response.getState();
			console.log(state);
			if (state == "SUCCESS") {

				// getdeleteWorkShopContact
				var contactworkshopItem = response.getReturnValue();

				var action = component.get('c.deleteContactWorkshop');
				action.setParams({
					"item" : contactworkshopItem
				});
				action.setCallback(this, function(response) {
					var state = response.getState();
					console.log(state);
					if (state == "SUCCESS") {

						// refresh data ContactList
						this.refreshContactWorkshop(component);
						// fire toast event
						var toastEvent = $A.get('e.force:showToast');
						toastEvent.setParams({
							'message' : 'Contact dissociated with workshop',
							'type' : 'warning',
							'mode' : 'dismissible'
						});

						toastEvent.fire();

					} else if (state === "ERROR") {
						let
						errors = response.getError();
						let
						message = 'Unknown error'; // Default error message
						// Retrieve the error message sent by the server
						if (errors && Array.isArray(errors)
								&& errors.length > 0) {
							message = errors[0].message;
						}
						// Display the message
						console.error(message);
					}
				});
				$A.enqueueAction(action);
			} else if (state === "ERROR") {
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
		$A.enqueueAction(contactworkshop);

	},

	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description getRowActions label
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	getRowActions : function(cmp, row, doneCallback) {
		if (row.orm_notification__c) {
			var actions = [ {
				'label' : 'Dissociation',
				'iconName' : 'utility:delete',
				'name' : 'dissociate_contact'
			}];
		} else {
			var actions = [{
				'label' : 'Send Mail',
				'iconName' : 'utility:email',
				'name' : 'send_email'
			} ];
		}
		// simulate a trip to the server
		setTimeout($A.getCallback(function() {
			doneCallback(actions);
		}), 200);
	},

	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description refresh data ContactList
	 * @history 2018-08-17 : Salimata NGOM - Implementation
	 */
	refreshContactWorkshop : function(component) {
		// call the apex class
		// method and fetch contact list in v.ContactList
		var action = component.get("c.findAllContact");
		action
				.setCallback(
						this,
						function(response) {
							var state = response.getState();
							if (state === "SUCCESS") {
								var storeResponse = response.getReturnValue();

								// set ContactListTemp list with return value
								// from server.
								component.set("v.contactListTemp",
										storeResponse);
								if (component.get("v.contactListTemp").length > 0) {

									// call the apex class method and fetch
									// contact list workshop
									var action1 = component
											.get("c.findAllContactWorkshop");
									action1.setParams({
										'item' : component.get('v.workshop').Id
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
																			"v.contactWorkshopList",
																			storeResponseWorkshopcontact);

															// iterate and check
															// if contact is
															// associated to
															// workshop
															// alert('contactList
															// au
															// refresh'+contactListOld);
															// component.set("v.ContactListTemp",
															// contactListOld);
															component
																	.get(
																			"v.contactListTemp")
																	.forEach(
																			function(
																					contact) {
																				component
																						.get(
																								"v.contactWorkshopList")
																						.forEach(
																								function(
																										contactworkshop) {

																									if (contactworkshop.orm_contact__c == contact.Id) {
																										
																										if (contactworkshop.orm_notification__c == true) {
																											contact.orm_notification__c = $A
																													.get("$Label.c.orm_notification_c");
																										}
																									}
																								});

																			});

															component
																	.set(
																			"v.contactList",
																			component
																					.get("v.contactListTemp"));
														}
													});
									$A.enqueueAction(action1);

								}

							}
						});
		$A.enqueueAction(action);
	},

    contactSelected : function(cmp, event) {
        var contacts = cmp.get('v.contactsSearch');
        var contact = cmp.get('v.contactListSelected');
       // var input = cmp.find('inputSearch');
        //input.set('v.value', contacts[event.target.id].Name);
   
		 contact.push(contacts[event.target.id]);
	
		
       
        cmp.set('v.contactListSelected',contact);
         cmp.set('v.contactChecked',contacts[event.target.id]);
        var form = cmp.find('lookupForm');
                $A.util.removeClass(form, 'slds-is-open');
                cmp.set('v.key','');
   
    }
	
})