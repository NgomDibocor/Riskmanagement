({
	getEmailTempaltes : function(component, event) {
		var action = component.get("c.getTemplates");

		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				var loadResponse = response.getReturnValue();
				console.log('templates..!', loadResponse);
				component.set('v.templates', loadResponse);
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
				var toast = $A.get('e.force:showToast');
				toast.setParams({
					'message' : "$Label.c.orm_error",
					'type' : 'error',
					'mode' : 'dismissible'
				});
				toast.fire();
			}
		});
		$A.enqueueAction(action);
	},
	getSelctedContacts : function(component, event) {

		var listcontact = component.get("v.contactListSelected");

	},
	getTemplate : function(component, event) {
		// get Id template selected
		var templId = component.get("v.selTempl");

		if (!$A.util.isEmpty(templId)) {

			var action = component.get("c.getTemplateDetails");
			action.setParams({
				"templteId" : templId
			});
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (state == "SUCCESS") {
					var responseVal = response.getReturnValue();
					console.log('responseVal..@getTemplate ', responseVal);
					component.set("v.templDetail", responseVal);
					component.set("v.subjTxt", responseVal.Subject);
					if (!$A.util.hasClass(component.find("emailBodyDiv"),
					"slds-hide")) {

						$A.util.addClass(component.find("emailBodyDiv"),
						'slds-hide');
					}
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

			if ($A.util.hasClass(component.find("emailBodyDiv"), "slds-hide")) {

				$A.util
				.removeClass(component.find("emailBodyDiv"),
				'slds-hide');
			}
		}
	},
	sendEmails : function(component, event) {

		var templateId = component.get("v.selTempl");
		console.log('sel template ', templateId);
		var subjMatter = component.find('subjMatter').get('v.value');
		console.log('subjMatter ', subjMatter);
		var contactIds = component.get("v.contactListSelected");
		console.log('workshop' + component.get('v.workshop').Id);

		if (!$A.util.isEmpty(subjMatter) || !$A.util.isEmpty(contactIds)) {
			var action = component.get("c.sendMailMethod");
			// set the 3 params to sendMailMethod method
			action.setParams({
				'mailcontacts' : contactIds,
				'mSubject' : subjMatter,
				'templateId' : templateId,
				'workshop' : component.get('v.workshop').Id
			});
			action
			.setCallback(
					this,
					function(response) {
						var state = response.getState();
						console.log('state=' + state);
						if (state == "SUCCESS") {
							var resultList = response.getReturnValue();
							// update listcontactworshop

							var listcontactworkshop = resultList['listcontactworkshop'];
							var mailfailed = resultList['contactfailed'];
							if (!$A.util.isEmpty(listcontactworkshop)) {
								listcontactworkshop
								.forEach(function(
										contactworkshopItem) {
									contactworkshopItem.orm_notification__c = true;
									var updatecontactworkshop = component
									.get('c.updateContactWorkshop');
									updatecontactworkshop
									.setParams({
										"item" : contactworkshopItem
									});
									updatecontactworkshop
									.setCallback(
											this,
											function(
													respUpdate) {
												var state = respUpdate
												.getState();
												if (state === "SUCCESS") {

													// fire
													// toast
													var toast = $A
													.get('e.force:showToast');
													toast
													.setParams({
														'message' : 'send mail success',
														'type' : 'success',
														'mode' : 'dismissible'
													});
													toast
													.fire();
													var evt = $A
													.get("e.c:OrmCloseContactWrokshopEvnt");
													evt
													.fire();
													component
													.set(
															"v.emailTemplate",
															false);
													// fire
													// event
													// for
													// refresh
													// list
													// contact
													var evt = $A
													.get("e.c:OrmRefreshContactWorkshopEvt");
													evt
													.setParams({
														"Workshop" : component
														.get("v.workshop")
													});
													evt
													.fire();
												} else if (state === "ERROR") {
													console
													.log('error update');
												}
											});
									$A
									.enqueueAction(updatecontactworkshop);
								});

								// end update listcontact
							}
							if (!$A.util.isEmpty(mailfailed)) {
								component.set('v.emailfailed',
										mailfailed);
								// List<Contact> listcontact= new
								// List<Contact>() ;
								var emails = '';
								mailfailed.forEach(function(contact) {
									// alert('mail failed'+contact);
									// listcontact.add(contact);
									// emails=emails+contact.Email+' ,
									// ';
								});
								var contactfail = component
								.get('v.emailfailed');

								// alert(JSON.stringify(component.get('v.emailfailed'));
								// email incorrect , send alert and
								// close modal
								// fire toast
								component.set("v.emailTemplate", false);
								var evnt = $A
								.get("e.c:OrmShowMailfailedEvent");
								evnt.setParam('mailsfailed',
										contactfail);
								evnt.fire();
							}
						} else if (state == "ERROR") {

							console.log('error send mail method');
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
		}
	}

})