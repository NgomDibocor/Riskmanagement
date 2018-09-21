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
		},{
			label : 'Email',
			fieldName : 'Email',
			type : 'email'
		}, {
			label : 'Association',
			fieldName : 'association',
			type : 'text'
		}, 
		 {
			label : 'Invitation',
			fieldName : 'orm_notification__c',
			type : 'text'
		},{
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
							.get("v.workshop").Id;

					contactsWorkshop.push(newcontactworkshop);
					console.log('v.ContactWorkshopList  nbre'
							+ component.get("v.ContactWorkshopList").length);
				});

		component.set("v.ContactWorkshopList", contactsWorkshop);
		component.set("v.contactListSelected", selectedRows);

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
					var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_success_associated"),
                'type' : 'success',
                'mode' : 'dismissible'
            });      
            toast.fire();
				helper.refreshContactWorkshop(component);
			} else {
					var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_failed_association"),
                'type' : 'error',
                'mode' : 'dismissible'
            });      
            toast.fire();
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
			break;
		case 'send_email':
		
		component.set("v.contactListSelected",row);
		component.set("v.emailTemplate",true);
			break;
		default:
			break;
		}

	},
	 // when user click on the close buttton on message popup ,
    // hide the Message box by set the mailStatus attribute to false 
    closeMessage: function(component, event, helper) {
        component.set("v.mailStatus", false);
    },
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method open modal email template
 * @history 
 * 2018-09-11 : Salimata NGOM - Implementation
 */
	openMailTemplate : function(component,row) {
	//check if contact selected
	if($A.util.isEmpty(component.get("v.contactListSelected")))
	{
                		var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_warning_checked_checkbox"),
				'type' : 'warning',
				'mode' : 'dismissible'
			});
			toast.fire();
		}         
		
	else{
	component.set("v.emailTemplate",true);
	}
	},
	 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method open modal add new contact
 * @history 
 * 2018-09-17 : Salimata NGOM - Implementation
 */
	     openNewContact : function(component, event, helper){
                
        var idworkshop = component.get("v.workshop").Id;
       if($A.util.isEmpty(idworkshop)){
       	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_toast_warning"),
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
       } else {
     
        	var evt = $A.get("e.c:OrmNewContactEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.workshop").orm_Assessment__c
			});
			evt.fire();
        }
    },
/**
 * @author Salimata NGOM
 * @version 1.0
 * @description method refresh contact workshoplist
 * @history 
 * 2018-09-17 : Salimata NGOM - Implementation
 */
refreshContact:function(component, event, helper){
helper.refreshContactWorkshop(component);
}

})