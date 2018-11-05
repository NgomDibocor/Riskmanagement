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
})