({
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method doInit
     * @history 2018-08-13 : Salimata NGOM - Implementation
     */
    doInit: function(component, event, helper) {
        // call the apex class method and fetch contact list
        var rowActions = helper.getRowActions.bind(this, component);
        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_name_label"),
            fieldName: 'Name',
            type: 'text',editable:'true'
        }, {
            label: $A.get("$Label.c.orm_email_contact"),
            fieldName: 'Email',
            type: 'email'
        }, {
            label:  $A.get("$Label.c.orm_invitation_contact_workshop"),
            fieldName: 'orm_notification__c',
            type: 'text'
        }, {
            type: 'action',
            typeAttributes: {
                rowActions: rowActions
            }
        }]);
    },

    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description open modal
     * @history 2018-08-13 : Salimata NGOM - Implementation
     */
    openModalContacts: function(component, event, helper) {
      //  component.set('v.contactList', event.getParam('contactList'));
// start pagination
    				 component.set('v.items',event.getParam('contactList'));
                    var pageSize = component.get("v.pageSize");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                //Set the current Page as 0
                    component.set("v.currentPage",0);
	                // set start as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.contactList', PaginationList);
                //end pagination
    
        component.set('v.contactsSearch', event.getParam('contactList'));
        component.set('v.workshop', event.getParam('workshop'));
        component.set("v.isOpenModalContactWorkshop", true);
        component.set("v.contactListSelected", []);
        component.set("v.contactChecked", []);
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method close modal
     * @history 2018-08-13 : Salimata NGOM - Implementation
     */
    closeModalWorkshopContact: function(component, event, helper) {
        component.set("v.isOpenModalContactWorkshop", false);
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method getselectedRows
     * @history 2018-08-13 : Salimata NGOM - Implementation
     */
    getselectedRows: function(component, event, helper) {
        component.set("v.contactListSelected", []);
        component.set("v.totalSelectedContact", []);
        var selectedRows = event.getParam('selectedRows');
        
        var contact = component.get('v.contactChecked');
        var contactsWorkshop = [];
        selectedRows
            .forEach(function(selectedRow) {
                var newcontactworkshop = {};
                newcontactworkshop.sobjectType = 'orm_ContactWorkshop__c';
                newcontactworkshop.orm_contact__c = selectedRow.Id;
                newcontactworkshop.orm_notification__c = false;
                newcontactworkshop.orm_Workshop__c = component
                    .get("v.workshop").Id;
                contactsWorkshop.push(newcontactworkshop);
                console.log('v.contactWorkshopList  nbre' +
                    component.get("v.contactWorkshopList").length);
            });

        component.set("v.contactWorkshopList", contactsWorkshop);
        if (!$A.util.isEmpty(contact)) {
            selectedRows.push(contact);

        }
         var dTable = component.find("idworkshopcontact");
            // var selectedRows = dTable.getSelectedRows();
          //   console.log('row selectionné'+JSON.stringify(component.get("v.selectedContactMap")[1]));
        
        if(component.get('v.totalSelectedContact').length>0){
        component.set("v.contactListSelected", component.get('v.totalSelectedContact'));
        }else{
        component.set("v.contactListSelected", selectedRows);
        }
        
    },

    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method handleRowAction
     * @history 2018-08-13 : Salimata NGOM - Implementation
     */
    handleRowAction: function(component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'dissociate_contact':
                helper.deleteContactWorkshop(component, row);
                break;
            case 'send_email':

                component.set("v.contactListSelected", row);
                component.set("v.emailTemplate", true);
                var form = component.find('modalcontacts');
                $A.util.removeClass(form, 'slds-fade-in-open');
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
    openMailTemplate: function(component, row, helper) {

        if (($A.util.isEmpty(component.get("v.contactListSelected")))) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {
        	 console.log("contactListSelected "+JSON.stringify(component.get("v.selectedContactMap")[0]));   
            component.set("v.emailTemplate", true);
            var form = component.find('modalcontacts');
            $A.util.removeClass(form, 'slds-fade-in-open');
        }
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method open modal add new contact
     * @history 2018-09-17 : Salimata NGOM - Implementation
     */
    openNewContact: function(component, event, helper) {
        var idworkshop = component.get("v.workshop").Id;
        if ($A.util.isEmpty(idworkshop)) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_toast_warning"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {

            var evt = $A.get("e.c:OrmNewContactEvt");
            evt.setParams({
                "Assessmentdata": component.get("v.workshop").orm_Assessment__c
            });
            evt.fire();
            var form = component.find('modalcontacts');
            $A.util.removeClass(form, 'slds-fade-in-open');
        }
    },
    /**
     * @author Salimata NGOM
     * @version 1.0
     * @description method refresh contact workshoplist
     * @history 2018-09-17 : Salimata NGOM - Implementation
     */
    refreshContact: function(component, event, helper) {
        console.log('refreshcontact');
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
    filter: function(component, event, helper) {
        var Listcontact = component.get('v.items');
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
                data = Listcontact.filter(row => regex.test(row.Name) || regex.test(row.Email));
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
    onContactSelected: function(cmp, event, helper) {
        helper.contactSelected(cmp, event);
    },
    // function for clear the Record Selection 
    clear: function(component, event, heplper) {
    component.get("v.selectedRows");
        var contact = component.get('v.contactChecked');
        var selectedPillId = event.getSource().get("v.name");
        var AllPillsList = component.get("v.contactListSelected");
        for (var i = 0; i < AllPillsList.length; i++) {
            if (AllPillsList[i].Id == selectedPillId) {
                if (contact.Id == selectedPillId) {
                    component.set('v.contactChecked', []);
                }
                AllPillsList.splice(i, 1);
                component.set("v.contactListSelected", AllPillsList);
            }
        }
        //component.set("v.SearchKeyWord",null);
        //component.set("v.listOfSearchRecords", null );      
    },
    sendEmailAction: function(component, event, helper) {
        helper.sendEmails(component, event);
    },

    showModalContacts: function(component, event, helper) {
        //open modal contactworkshop
        var form = component.find('modalcontacts');
        $A.util.addClass(form, 'slds-fade-in-open');
    },
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description method close modal email failed
     * @history 
     * 2018-10-05 : Salimata NGOM - Implementation
     */
    closeEmailFailed: function(component, event, helper) {
        var evt = $A.get("e.c:OrmCloseContactWrokshopEvnt");
        evt.fire();
        component.set("v.mailfailed", false);
        helper.refreshContactWorkshop(component);
        var form = component.find('modalcontacts');
        $A.util.addClass(form, 'slds-fade-in-open');
    },
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description method open modal email failed
     * @history 
     * 2018-10-05 : Salimata NGOM - Implementation
     */
    showModalContactsFailed: function(component, event, helper) {
        console.log('showmodal');
        //open modal contactfailed
        component.set('v.emailfailed', event.getParam('mailsfailed'));
        component.set('v.mailfailed', true);
        var form = component.find('modalcontacts');
        $A.util.removeClass(form, 'slds-fade-in-open');

    },
     /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description Method to go to the next page
     * @history 
     * 2018-10-15 : Salimata NGOM - Implementation
     */
        next : function (component, event, helper) {
      helper.next(component, event);
    },
    previous : function (component, event, helper) {
      helper.previous(component, event);
    },
    
   refreshcontactSelected:function(component,event,helper){
    component.set('v.contactListSelected',event.getParam('contactSelected'));
     console.log("event success "+JSON.stringify(component.get('v.contactListSelected')));
   }
})