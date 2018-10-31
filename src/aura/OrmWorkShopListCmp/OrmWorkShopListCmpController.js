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
        // call the apex class method and fetch activity list  
        var action = component.get("c.findWorkshopByAssessment");
        var assmntDataId = component.get('v.assessmentData').Id;
        var assmntDataOrganisation = component.get('v.assessmentData').orm_organisation__c;
        action.setParam('asssessment', assmntDataId);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(JSON.stringify(storeResponse));
                // set WorkshopList list with return value from server.
                // component.set("v.WorkshopList", storeResponse);
                // component.set("v.storeListWorkshop", storeResponse);

                component.set('v.initialData', response.getReturnValue());
                component.set('v.items', response.getReturnValue());
                // start pagination
                var pageSize = component.get("v.pageSizeBis");
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.items").length);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.items").length;
                //var div = Math.trunc(totalRecords / pageSize);
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.items").length > i)
                        PaginationList.push(component.get("v.items")[i]);
                }
                component.set('v.PaginationList', PaginationList);
                //end pagination

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
        var ListWorkshop = component.get('v.initialData');
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
            helper.paginationFilterBis(component, event);
        }
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for show modal confirm delete workshop
     * @history 2018-10-04 : Salimata NGOM - Implementation
     */
    removeWorkshop: function(component, event, helper) {
        // is checked delete workshop show popup message confirmation
        // get all checkboxes 
        //if not checked show toast warning
        var getSelectedNumber = component.get("v.selectedRowsCount");
        console.log('getSelectedNumber'+getSelectedNumber);
        if (getSelectedNumber == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {
            component.set("v.showConfirmRemoveWorkshop", true);
        }


    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for remove workshop selected
     * @history 2018-10-04 : Salimata NGOM - Implementation
     */
    removeWorkshopSelected: function(component, event, helper) {
        component.set("v.showConfirmRemoveWorkshop", false);
        //fire event to childWorkshopList for delete workshop selected
        var evt = $A.get("e.c:OrmRemoveRecordWorkshopEvnt");
        evt.fire();
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
        component.set("v.showConfirmRemoveWorkshop", false);
    },
        // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");

        var evt = $A.get('e.c:OrmEvtSelectAllWorkshop');
        evt.setParams({
            "selectAllCheckbox": selectedHeaderCheck
        });
        evt.fire();
    },
    
})