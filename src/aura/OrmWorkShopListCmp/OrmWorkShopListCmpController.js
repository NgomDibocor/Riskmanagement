({
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description method to init records 
     * @history 
     * 2018-08-24 : Salimata NGOM - Implementation
     */
    initRecords: function(component, event, helper) {
        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_title_workshop"),
            fieldName: 'Name',
            editable: 'true',
            initialWidth: 150,
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_start_date"),
            fieldName: 'StartDate',
            editable: 'true',
             initialWidth: 150,
            type: 'date',
            typeAttributes: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        }, {
            label: $A.get("$Label.c.orm_end_date"),
            fieldName: 'orm_Contract_End_Date__c',
            editable: 'true',
            initialWidth: 150,
            type: 'date',
            typeAttributes: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        }, {
            label: $A.get("$Label.c.orm_message_workshop"),
            fieldName: 'Description',
           
            editable: 'true',
            type: 'button', initialWidth: 170,
            typeAttributes: { label: $A.get('$Label.c.orm_message_workshop'), name: 'message_details', title: 'Click to View Details'}
        }, {
            label: $A.get("$Label.c.orm_date_invitation"),
            fieldName: 'CompanySignedDate',
            editable: 'true',
             initialWidth: 150,
            type: 'date',
            typeAttributes: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        }, {
            label: 'Action',
            initialWidth: 80,
            type: 'button-icon',
            typeAttributes: {
             name: 'contact_details',
            	iconName: 'action:new_group',
            	size: 'large',
                alignment: 'center',
                class: 'btnContact'
            }
        }]);
        // call the apex class method and fetch activity list  
        var action = component.get("c.findWorkshopByAssessment");
        var assmntDataId = component.get('v.assessmentData').Id;
        var assmntDataOrganisation = component.get('v.assessmentData').orm_organisation__c;
        action.setParam('asssessment', assmntDataId);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                var pageSize = component.get("v.pageSizeInlineEdit");
                component.set('v.ListData', response.getReturnValue());
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.ListData").length);
                //Set the current Page as 0
                component.set("v.currentPage", 0);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.ListData").length;
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.ListData").length > i) {
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
            } else {
                alert('ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description method to save workshop 
     * @history 
     * 2018-08-24 : Salimata NGOM - Implementation
     */
    Save: function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)) {
            // call the saveWorkshop apex method for update inline edit fields update 
            var action = component.get("c.saveWorkShop");
            action.setParams({
                'lstWorkshop': component.get("v.WorkshopList")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set WorkshopList list with return value from server.
                    console.log(JSON.stringify(storeResponse));
                    component.set("v.WorkshopList", storeResponse);
                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': $A.get("$Label.c.orm_updated"),
                        'type': 'success',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn", false);

                }
            });
            $A.enqueueAction(action);
        }
    },
    cancel: function(component, event, helper) {
        component.set("v.showSaveCancelBtn", false);
        helper.refreshList(component, event);

    },
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description method to open modal add new workshop
     * @history 
     * 2018-08-24 : Salimata NGOM - Implementation
     */
    openNewWorkshop: function(component, event, helper) {

        var idAssessment = component.get("v.assessmentData").Id;
        if (idAssessment == null) {
            //alert("check if you have created the assessment");
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_toast_warning"),
                'type': 'warning',
                'mode': 'dismissible'
            });

            toast.fire();
        } else {
            var evt = $A.get("e.c:OrmNewWorkShopEvt");
            evt.setParams({
                "Assessmentdata": component.get("v.assessmentData")
            });
            evt.fire();
        }
    },
    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description add new contact in contact list
     * @history 
     * 2018-08-24 : Salimata NGOM - Implementation
     */
    openNewContact: function(component, event, helper) {

        var idAssessment = component.get("v.assessmentData").Id;
        if (idAssessment == null) {
            //alert("check if you have created the assessment");
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
                "Assessmentdata": component.get("v.assessmentData")
            });
            evt.fire();
        }
    },

    /**
     *
     * @author Salimata NGOM
     * @version 1.0
     * @description search filter 
     * @history 
     * 2018-08-24 : Salimata NGOM - Implementation
     */
    filter: function(component, event, helper) {
        //        var ListWorkshop = component.get('v.storeListWorkshop');
        var ListWorkshop = component.get('v.ListData');
        var data = ListWorkshop;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refreshList(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");

                // filter checks each row, constructs new array where function returns true
                data = ListWorkshop.filter(row => regex.test(row.Name) ||
                    regex.test(row.CompanySignedDate) ||
                    regex.test(row.Description) ||
                    regex.test(row.StartDate) || regex.test(row.orm_Contract_End_Date__c));
            } catch (e) {
                alert(e)
            }

            //            component.set("v.WorkshopList", data);
            component.set("v.filterPagination", data);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },


    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-10-08 : Salimata NGOM - Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.isEmptyMap", true);
        component.set("v.showConfirmRemoveWorkshop", false);
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for show modal confirm delete workshop
     * @history 2018-10-04 : Salimata NGOM - Implementation
     */
    removeWorkshop: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selected", selectedRows.length);
        if (selectedRows.length != 0) {
            var pgName = "page" + current;
            component.get("v.SelectedItem")[pgName] = selectedRows;
        } else {
            var pgName = "page" + current;
            component.get("v.SelectedItem")[pgName] = selectedRows;
            console.log("***View else lenght =0*** ", Object(component.get("v.SelectedItem")));
        }
        var myMap = component.get("v.SelectedItem");
        console.log("selectedRows in delete", Object.keys(myMap).length);
        helper.checkIfMapContentIsEmpty(component, event, myMap);
        if (Object.keys(myMap).length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else if (component.get("v.isEmptyMap")) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else {
            component.set("v.showConfirmRemoveWorkshop", true);
        }
    },
    selectCauses: function(component, event, helper) {},
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for remove workshop selected
     * @history 2018-10-04 : Salimata NGOM - Implementation
     */
    removeWorkshopSelected: function(component, event, helper) {
        var myMap = component.get("v.SelectedItem");
        var idWorkshop = [];
        var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
                idWorkshop.push(myMap[page][j].Id);
            }
        }

        //		call apex class method
        var action = component.get('c.deleteRecordWorkshop');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "lstRecordId": idWorkshop
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set('v.showConfirmRemoveWorkshop', false);
                helper.refreshList(component, event);
            }
        });
        $A.enqueueAction(action);
    },
    onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    openModalContactWorkshop: function(component, event, helper) {
    var actionRow = event.getParam('action');
    console.log('name action'+actionRow.name);
    var row = event.getParam('row');
    console.log(JSON.stringify(row));
    switch (actionRow.name) {
		
		case 'contact_details':
			helper.openContactModal(component,event,helper,row);
			break;
	   case  'message_details':
			console.log('message_details');
			helper.showDetailMessage(component,event,row);
			break;
		default:
			break;
		}
    },
    /** @author: Salimata NGOM
     *  @date: Creation: 09/11/2018
     *  @description: method for show message workshop
     */
    closeShowDetailMessage:function(component,event){
        component.set('v.showMessageDetail',false);

        },
        
    /** @author: Salimata NGOM
     *  @date: Creation: 09/11/2018
     *  @description: method for update message workshop
     */
    editMessageWorkshop: function(component, event, helper) {
    var message =  component.find('description');
     var newItem = component.get("v.workshopEdit");
      newItem.Description=message.get('v.value');
            var action = component.get('c.addWorkShop');
            action.setParams({
                "item": newItem
            });
               action
                .setCallback(
                    this,
                    function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS") {
                            component.set('v.showMessageDetail',false);
                            var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : $A.get('$Label.c.orm_workshop_label')+ ' '+ $A.get('$Label.c.orm_success_updated'),
			           'type' : 'success',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
                         
                        } else if(state ==="ERROR") {
              let errors = response.getError();
              let message = 'Unknown error'; // Default error message
              // Retrieve the error message sent by the server
              if (errors && Array.isArray(errors) && errors.length > 0) {
                 message = errors[0].message;
                    }
                  // Display the message
                console.error(message);
            }
                    });
            $A.enqueueAction(action);
           
    }
    
	
})