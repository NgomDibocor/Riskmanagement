({
    getAssessmentRiskId: function(component, event, helper) {
    	 component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        }]);
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.refresh(component, component.get("v.idAssessmentRisk"));
    },

    refreshList: function(component, event, helper) {
        helper.refresh(component, component.get("v.idAssessmentRisk"));
    },

    /* @cretedBy: laye
	   @createdDate: 28/07/2018
     */
    openCauseNewCmp: function(component, event, helper) {
        /* after created the assessment we must get the assessment id
			var assessment = component.get('v.assessmentData');
         */
        var assessmentRiskId = "";
        var evt = $A.get("e.c:OrmNewCauseClickedEvt");
        evt.fire();
    },

    sendDescriptionFieldCause: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_label_cause'),
            "descriptionField": $A.get('$Label.c.orm_describe_cause')
        });
        evt.fire();
    },
    openModalDeleteCause: function(component, event, helper) {
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
     cancelDeleteCause: function(component, event, helper) {
        component.set('v.openModalConfirmDeletion', false);
    },
    selectCauses: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
    },
    deleteCausesfunction: function(component, event, helper) {
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
            var action = component.get('c.deleteCauses');
            // pass the all selected record's Id's to apex method 
            action.setParams({
                "causeIds": idCauses
            });
            action.setCallback(this, function(response) {
                //store state of response
                var state = response.getState();
                if (state === "SUCCESS") {
                    //component.set("v.SelectedAccount", []);
                    component.set('v.openModalConfirmDeletion', false);
                    helper.refresh(component, component.get("v.idAssessmentRisk"));
                }
            });
            $A.enqueueAction(action);
        }

    },
    filter: function(component, event, helper) {

        //var causesTemp = component.get('v.causesTemp');
        var causesTemp = component.get('v.AccountData');
        //var data = causes;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refresh(component, component.get("v.idAssessmentRisk"));
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");
                // filter checks each row, constructs new array where function returns true
                causesTemp = causesTemp.filter(cause => regex.test(cause.Description));
            } catch (e) {

            }
            //component.set("v.causes", causesTemp);
            component.set("v.filterPagination", causesTemp);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },
     onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
})