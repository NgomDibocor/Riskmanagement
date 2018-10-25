({
    doInit: function(component, event, helper) {
        component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Name',
            editable: 'true',
            type: 'text'
        }]);
        helper.refreshList(component, event);
    },
    openNewAssumption: function(component, event, helper) {
        var idAssessment = component.get("v.assessmentData").Id;
        //alert('idAssessment='+idAssessment);
        if (idAssessment == null) {
            // alert("check if you have created the assessment");
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_toast_warning"),
                'type': 'warning',
                'mode': 'dismissible'
            });

            toast.fire();
        } else {
            var evt = $A.get("e.c:OrmNewAssumptionClickedEvt");
            evt.setParams({
                "Assessmentdata": component.get("v.assessmentData")
            });
            evt.fire();
        }
    },
    /**
     * @author Salimata NGOM
     * @version 1.0
     * @description search filter
     * @history 2018-08-30 : Salimata NGOM - Implementation
     */
    filter: function(component, event, helper) {
        //var ListAssumption = component.get('v.storeAssumptionList');
        var ListAssumption = component.get('v.ListData');
        var data = ListAssumption;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refreshList(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");

                // filter checks each row, constructs new array where
                // function returns true
                data = ListAssumption.filter(row => regex.test(row.Name));
            } catch (e) {
                alert(e)
            }
            //component.set("v.assumptionList", data);
            component.set("v.filterPagination", data);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },
    /**
     * @author Salimata NGOM
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-09-05 : Salimata NGOM - Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.showConfirmRemoveAssumption", false);
    },

    /**
     * @author Salimata NGOM
     * @version 1.0
     * @description method for remove assumption selected
     * @history 2018-09-05 : Salimata NGOM - Implementation
     */
    removeAssumptSelected: function(component, event, helper) {
        component.set("v.showConfirmRemoveAssumption", false);
        //fire event to childActivityList for delete activity selected
        var evt = $A.get("e.c:OrmRemoveRecordAssumptEvnt");
        evt.fire();
    },

    sendDescriptionSearchToFD: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Assumption",
            "descriptionField": "Description"
        });
        evt.fire();
    },
    selectCauses: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
    },
    openModalDeleteAssumption: function(component, event, helper) {
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selectedRows in delete", selectedRows);
        if (selectedRows.length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else {
            component.set("v.showConfirmRemoveAssumption", true);
        }
    },
    removeAssumptSelected: function(component, event, helper) {
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selectedRows in delete", selectedRows);
        if (selectedRows.length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else {
            var myMap = component.get("v.SelectedAccount");
            var idCauses = [];
            var lengthMap = Object.keys(myMap).length;

            for (var i = 0; i < lengthMap; i++) {
                var page = 'page' + i;
                for (var j = 0; j < myMap[page].length; j++) {
                    idCauses.push(myMap[page][j].Id);
                }
            }
            console.log("id Cause", idCauses);

            //		call apex class method
            var action = component.get('c.deleteRecordAssumption');
            // pass the all selected record's Id's to apex method 
            action.setParams({
                "lstRecordId": idCauses
            });
            action.setCallback(this, function(response) {
                //store state of response
                var state = response.getState();
                if (state === "SUCCESS") {
                    //component.set("v.SelectedAccount", []);
                    component.set('v.showConfirmRemoveAssumption', false);
                    helper.refreshList(component, event);
                }
            });
            $A.enqueueAction(action);
        }

    },
    onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
})