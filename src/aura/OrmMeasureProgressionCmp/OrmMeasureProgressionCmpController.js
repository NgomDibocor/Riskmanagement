({
    /**
     * @author David diop
     * @version 1.0
     * @description method doInit
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    measureProgression: function(component, event, helper) {
        // helper.fetchPicklist(component, event, event.getParam('MeasureId'));

        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_DateProgression_label"),
            fieldName: 'orm_dateProgression__c',
            type: 'date'
        }, {
            label: $A.get("$Label.c.orm_PourcentageProgression_label"),
            fieldName: 'orm_poucentageProgression__c',
            type: 'number'
        }, {
            label: $A.get("$Label.c.orm_ProductDescription_label"),
            fieldName: 'Description',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_statusProgress_label"),
            fieldName: 'Family',
            type: 'text'
        }, {
            type: 'button',
            typeAttributes: {
                label: $A.get("$Label.c.orm_files_label"),
                name: $A.get("$Label.c.orm_files_label"),
                title: $A.get("$Label.c.orm_files_label")
            }
        }, {
            type: 'button',
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title")
            }
        }]);
        component.set("v.idMeasure", event.getParam('MeasureId'));
        helper.getAllMeasuresProgressionByMeasure(component, event);
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description methodopen Modal new MeasurePogression
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    openMeasureProgressionNew: function(component, event, helper) {
        var IdMeasure = component.get("v.idMeasure");
        var evt = $A.get("e.c:OrmNewMeasureProgressionClickedEvt");
        evt.setParams({
            "idMeasure": IdMeasure
        });
        evt.fire();
    },
    sendDescriptionFieldMeasure: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_progressmeasure_label'),
            "descriptionField": $A.get('$Label.c.orm_progressmeasure_description')
        });
        evt.fire();
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method refreshList after add new measureProgression
     * @history 
     * 2018-08-31 : David diop - Implementation
     */

    refreshList: function(component, event, helper) {
        helper.getAllMeasuresProgressionByMeasure(component, event);
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method Filter
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    filter: function(component, event, helper) {
        //var dataMeasureProgress = component.get('v.measureProgressionTemp');
        var dataMeasureProgress = component.get('v.initialData');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.getAllMeasuresProgressionByMeasure(component, event);
        } else {
            term = "^" + term;
            try {
                regex = new RegExp(term, "i");

                dataMeasureProgress = dataMeasureProgress.filter(row => regex.test(row.orm_dateProgression__c) || regex.test(row.Description));

            } catch (e) {
                alert(e);
            }
            // component.set("v.measureProgression",dataMeasureProgress);
            component.set("v.filterPagination", dataMeasureProgress);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },

    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method showButtonDelete
     * @history 
     * 2018-09-03 : David diop - Implementation
     */
    showButtonDelete: function(component, event, helper) {
        var showButtonDelete = event.getParam('showButtonDelete');
        console.log('capture event ' + showButtonDelete);
        if (showButtonDelete) {
            component.set('v.showButtonDelete', showButtonDelete);
        } else {
            component.set('v.showButtonDelete', showButtonDelete);
        }
    },


    openfilesList: function(component, event, helper) {
        idMeasurePro = event.getParam('mesurePregression');
        component.set('v.measureProgressionId', idMeasurePro);
        component.set("v.openfilesList", true);
    },
    cancelMeasureProgress: function(component, event, helper) {
        component.set("v.openfilesList", false);
    },
    selectCauses: function(component, event, helper) {},


    /**
     * 
     * @authorDavid diop
     * @version 1.0
     * @description method for show modal confirm delete MeasureProgression
     * @history 2018-09-05 : David diop - Implementation
     */
    removeMeasureProgression: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selectedRows in delete", selectedRows);
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
            component.set("v.openModalConfirmDeletion", true);
        }
    },
    /**
     * 
     * @author Dvaid diop
     * @version 1.0
     * @description method for remove Activity Proofselected
     * @history 2018-09-05 : David diop- Implementation
     */
    removeMeasureProgressionSelected: function(component, event, helper) {
        var myMap = component.get("v.SelectedItem");
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
        var action = component.get('c.deleteMeasureProgress');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "MeasureProgressIds": idCauses
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set('v.openModalConfirmDeletion', false);
                helper.getAllMeasuresProgressionByMeasure(component, event);
            }
        });
        $A.enqueueAction(action);
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method cancelDeleteMeasureProgress
     * @history 
     * 22018-09-03 : David diop - Implementation
     */
    cancelDeleteMeasureProgress: function(component, event, helper) {
        // on cancel close modal
        component.set("v.isEmptyMap", true);
        component.set("v.openModalConfirmDeletion", false);
    },
    selectMeasure: function(component, event, helper) {
        var row = event.getParam('row');
        component.set('v.measureProgressionId', row.Id);
        var idMeasure = component.get("v.idMeasure");
        var actionName = event.getParam('action').name;
        if (actionName == $A.get("$Label.c.orm_edit_button_title")) {
            var evt = $A.get("e.c:OrmEditMeasureProgressClickedEvt");
            evt.setParams({
                "measureProgressionId" : row.Id,
                "idMeasure" : idMeasure
            });
            evt.fire();
        }
        if (actionName == $A.get("$Label.c.orm_files_label")) {
            component.set('v.measureProgressionId', row.Id);
            
            
            component.set("v.openfilesList", true);
        }
    },
})