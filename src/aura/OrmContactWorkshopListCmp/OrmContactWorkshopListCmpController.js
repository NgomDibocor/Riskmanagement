({
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method doInit
	 * @history 2018-08-13 : Salimata NGOM - Implementation
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
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	openModalContacts : function(component, event, helper) {

		component.set('v.contactList', event.getParam('contactList'));
		component.set('v.contactsSearch', event.getParam('contactList'));
		component.set('v.workshop', event.getParam('workshop'));
		component.set("v.isOpenModalContactWorkshop", true);
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method close modal
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	closeModalWorkshopContact : function(component, event, helper) {
		component.set("v.isOpenModalContactWorkshop", false);
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method getselectedRows
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	getselectedRows : function(component, event, helper) {
		var selectedRows = event.getParam('selectedRows');
		var contacts = component.get('v.contactListSelected');
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
			console.log('v.contactWorkshopList  nbre'
					+ component.get("v.contactWorkshopList").length);
					
		contacts.push(selectedRow);
		});

		component.set("v.contactWorkshopList", contactsWorkshop);
		
		component.set("v.contactListSelected", contacts);
	},

	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method handleRowAction
	 * @history 2018-08-13 : Salimata NGOM - Implementation
	 */
	handleRowAction : function(component, event, helper) {
		var action = event.getParam('action');
		var row = event.getParam('row');
		switch (action.name) {
		case 'dissociate_contact':
			helper.deleteContactWorkshop(component, row);
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
	 * @history 2018-09-11 : Salimata NGOM - Implementation
	 */
	openMailTemplate : function(component,row,helper) {
	
		if(($A.util.isEmpty(component.get("v.contactListSelected"))))
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
	 * @history 2018-09-17 : Salimata NGOM - Implementation
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
	 * @history 2018-09-17 : Salimata NGOM - Implementation
	 */
	refreshContact:function(component, event, helper){
		helper.refreshContactWorkshop(component);
	},
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description search filter list contact
 * @history 
 * 2018-09-27 : Salimata NGOM - Implementation
 */
    filter : function (component, event, helper){
    	var Listcontact = component.get('v.contactList');
    	var data = Listcontact;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshContactWorkshop(component);  
    		 var form = component.find('lookupForm');
                $A.util.removeClass(form, 'slds-is-open'); 		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 	
        	 		// filter checks each row, constructs new array where function returns true
        	 		data=Listcontact.filter(row => regex.test(row.Name) || regex.test(row.Email)
        	 		);
		        } catch (e) {
		    	 console.log(e);
		        }
		        
		   component.set("v.contactsSearch", data);
		   var form = component.find('lookupForm');
                $A.util.addClass(form, 'slds-is-open');
         }        	
    },

 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get contact selected
 * @history 
 * 2018-09-27 : Salimata NGOM - Implementation
 */
    onContactSelected : function(cmp, event, helper) {
        helper.contactSelected(cmp, event);        
    },
     // function for clear the Record Selection 
    clear :function(component,event,heplper){
        var selectedPillId = event.getSource().get("v.name");
        var AllPillsList = component.get("v.contactListSelected"); 
        for(var i = 0; i < AllPillsList.length; i++){
            if(AllPillsList[i].Id == selectedPillId){
                AllPillsList.splice(i, 1);
                component.set("v.contactListSelected", AllPillsList);
            }  
        }
        //component.set("v.SearchKeyWord",null);
        //component.set("v.listOfSearchRecords", null );      
    },
      sendEmailAction : function(component, event, helper) {
        helper.sendEmails(component, event);
    },

})