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
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        if (selectedRows.length != 0) {
            var pgName = "page" + current;
            component.get("v.SelectedAccount")[pgName] = selectedRows;
            console.log("***View*** ", Object(component.get("v.SelectedAccount")));
        }else{
           var pgName = "page" + current;
           component.get("v.SelectedAccount")[pgName] = selectedRows;
           console.log("***View else lenght =0*** ", Object(component.get("v.SelectedAccount")));
        }
        var myMap = component.get("v.SelectedAccount");
        helper.checkIfMapContentIsEmpty(component, event, myMap);
        if (Object.keys(myMap).length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else if(component.get("v.isEmptyMap")){
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        }else{
            component.set("v.openModalConfirmDeletion", true);
        }
    },
    
    cancelDeleteCause: function(component, event, helper) {
        /*myMap = {};
        component.set("v.SelectedAccount", myMap);
        console.log("SelectedAccount after cancel ", Object(component.get("v.SelectedAccount")));*/
        component.set("v.isEmptyMap", true);
        component.set('v.openModalConfirmDeletion', false);
    },
    selectCauses: function(component, event, helper) {
        console.log("keys ", Object.keys(component.get("v.SelectedAccount")));
        console.log("object ", Object(component.get("v.SelectedAccount")));
    },
    deleteCausesfunction: function(component, event, helper) {

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
                myMap = {};
                component.set("v.SelectedAccount", myMap);
                component.set("v.isEmptyMap", true);
                console.log("SelectedAccount after delete ", Object(component.get("v.SelectedAccount")));
                console.log("SelectedAccount after delete ", Object(component.get("v.SelectedAccount")));
                component.set('v.openModalConfirmDeletion', false);
                helper.refresh(component, component.get("v.idAssessmentRisk"));
            }
        });
        $A.enqueueAction(action);

    },
    filter: function(component, event, helper) {

        //var causesTemp = component.get('v.causesTemp');
        var causesTemp = component.get('v.ListData');
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