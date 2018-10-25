({
    doInit: function(component, event, helper) {
    component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        }]);
        helper.refresh(component, event);
    },

    refreshList: function(component, event, helper) {
        helper.refresh(component, event);
    },

    openPopupNewPhase: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEventNewPhaseClicked');
        evt.fire();
    },

    closeOpenModalError: function(component, event, helper) {
        component.set('v.openModalError', false);
    },

    closeOpenModalErrorIfFieldEmpty: function(component, event, helper) {
        component.set('v.openModalErrorIfFieldEmpty', false);
    },
    filter: function(component, event, helper) {
        //var phases = component.get('v.phasesTemp');
        var phases = component.get('v.ListData');
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refresh(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");
                // filter checks each row, constructs new array where function returns true
                phases = phases.filter(row => regex.test(row.Description));
            } catch (e) {

            }
            //component.set("v.phases", phases);
            component.set("v.filterPagination", phases);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },
    sendDescriptionFieldCause: function(component, event, helper) {
       var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_phase'),
            "descriptionField": $A.get('$Label.c.orm_phase_description')
        });
        evt.fire();
    },
    /**
     * 
     * @authorDavid diop
     * @version 1.0
     * @description method for show modal confirm delete MeasureProgression
     * @history 2018-09-05 : David diop - Implementation
     */

     selectCauses: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
    },
     openModalDeletePhase: function(component, event, helper) {
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
            component.set("v.openModalConfirmDeletion", true);
        }
    },
    cancelDeletePhases: function(component, event, helper) {
        component.set('v.openModalConfirmDeletion', false);
    },
     onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    confirmDeletePhases: function(component, event, helper) {
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
            var action = component.get('c.deletePhases');
            // pass the all selected record's Id's to apex method 
            action.setParams({
                "phaseIds": idCauses
            });
            action.setCallback(this, function(response) {
                //store state of response
                var state = response.getState();
                if (state === "SUCCESS") {
                    //component.set("v.SelectedAccount", []);
                    component.set('v.openModalConfirmDeletion', false);
                    helper.refresh(component, event);
                }
            });
            $A.enqueueAction(action);
        }

    },
})