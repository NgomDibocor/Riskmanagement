({
     /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description refresh list workshop 
 * @history 
 * 2018-08-24 : Salimata NGOM - Implementation
 */
    refreshList : function(component, event) {
     var assmntDataId=component.get('v.assessmentData').Id;
		var action = component.get('c.findWorkshopByAssessment');
		action.setParam('asssessment',assmntDataId);
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
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

            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	},
	 checkIfMapContentIsEmpty : function(component, event, myMap) {
        console.log("checkIfMapContentIsEmpty start")
        var lengthMap = Object.keys(myMap).length;
        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            if(myMap[page].length != 0){
              component.set("v.isEmptyMap", false);
              console.log("isEmptyMap", component.get("v.isEmptyMap"));
            }
        }
    },
    saveDataTable: function(component, event, helper) {
        var editedRecords = component.find("datatableList").get("v.draftValues");
        var totalRecordEdited = editedRecords.length;
        var action = component.get("c.saveWorkShop");
        action.setParams({
            'lstWorkshop': editedRecords
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //if update is successful
                 var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message':  totalRecordEdited + " workshop Records Updated",
                'type': 'success',
                'mode': 'dismissible'
            });
            toast.fire()
            	this.refreshList(component, event)
                component.find("datatableList").set("v.draftValues", null);
                //helper.reloadDataTable(component);
            } else { //if update got failed
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': "error in update",
                'type': 'error',
                'mode': 'dismissible'
            });
            toast.fire()
            }

        });
        $A.enqueueAction(action);
    },
        openContactModal: function(component, event, helper,row) {
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
                            action1
                                .setParams({
                                    'item': row.Id
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
                                                                        contact.association = $A.get("$Label.c.orm_associatedContactWorkshop");
                                                                        if (contactworkshop.orm_notification__c == true) {
                                                                            contact.orm_notification__c = $A.get("$Label.c.orm_notification_c");
                                                                        }
                                                                    }
                                                                });

                                                    });

                                            component
                                                .set(
                                                    "v.ContactList",
                                                    component
                                                    .get("v.ContactListTemp"));

                                            var evt = $A
                                                .get("e.c:OrmContactWorkshopListEvt");
                                            evt
                                                .setParams({
                                                    "contactList": component
                                                        .get("v.ContactList"),
                                                    "workshop": row
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
        showDetailMessage:function(component,event,row ){
         console.log('v.showMessageDetail');
         component.set('v.descriptionMessage',row.Description);
         component.set('v.workshopEdit',row);
        component.set('v.showMessageDetail',true);
       
        }
        
})