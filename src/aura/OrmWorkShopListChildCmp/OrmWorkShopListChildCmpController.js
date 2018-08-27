({
	    inlineEditName : function(component,event,helper){   
        // show the name edit field 
        component.set("v.nameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("inputId").focus();
        }, 100);
         var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.orm_title_workshop"),
            "descriptionField": $A.get("$Label.c.description_title_workshop")
        });
        evt.fire();
    },
      inlineEditPeriod : function(component,event,helper){   
        // show the period edit field 
        component.set("v.periodEditMode", true); 
        // after the 100 millisecond set focus to input field startDate and endDate
        setTimeout(function(){ 
            component.find("startDateid").focus();
        }, 100);
          setTimeout(function(){ 
            component.find("endDateid").focus();
        }, 100);
         var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.orm_start_date")+" - "+$A.get("$Label.c.orm_end_date"),
            "descriptionField": $A.get("$Label.c.description_period_workshop")
        });
        evt.fire();
    },
    
    inlineEditMessage : function(component,event,helper){   
        // show the status edit field 
        component.set("v.messageEditMode", true); 
        
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("accMessage").focus();
        }, 100);
           var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.orm_message_workshop"),
            "descriptionField": $A.get("$Label.c.description_message_workshop")
        });
        evt.fire();
    },
      inlineEditInvitation : function(component,event,helper){   
        // show the status edit field 
        component.set("v.invitationEditMode", true);
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("invitationid").focus();
        }, 100);
    },
    onNameChange : function(component,event,helper){ 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
      onDataChange : function(component,event,helper){ 
        // if date  start or end change,
        // then show save and cancel button by set attribute to true
        component.set("v.showSaveCancelBtn",true);
    },
     closeNameBox : function (component, event, helper) {
      // on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.nameEditMode", false); 
      // check if change/update Name field is blank, then add error class to column -
      // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass",true);
        }else{
            component.set("v.showErrorClass",false);
        }
    }, 
       closePeriodBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'periodEditMode' att. as false   
        component.set("v.periodEditMode", false); 
      
    }, 
     closeMessageBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'messageEditMode' att. as false   
        component.set("v.messageEditMode", false); 
      
    }, 
     closeInvitationBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'messageEditMode' att. as false   
        component.set("v.invitationEditMode", false); 
      
    },
    openModalContactWorkshop: function (component, event, helper) {
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
										'item' :component.get("v.singleRec").Id
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
															component.get("v.ContactListTemp").forEach(
																			function(contact) {
																				component.get("v.ContactWorkshopList").forEach(
																								function(contactworkshop) {
																								
																									if (contactworkshop.orm_contact__c == contact.Id) {
																										contact.invitation = "Associated";
																									}
																								});

																			});

																			component.set("v.ContactList", component.get("v.ContactListTemp"));
																				
				var evt = $A.get("e.c:OrmContactWorkshopListEvt");
			evt.setParams({
			   "contactList" : component.get("v.ContactList"),
			    "workshop" : component.get("v.singleRec")
			});
			evt.fire();
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
				

        }, 
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description show field description search filter 
 * @history 
 * 2018-08-27 : Salimata NGOM - Implementation
 */
      sendDescriptionField: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
    }
})