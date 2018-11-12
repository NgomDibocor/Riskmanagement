({
    doInit: function(component, event, helper) {
    	 component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Name',
            editable: 'true',
            type: 'text'
        },
        {
        	label: 'Description',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        },
        {
            label: $A.get("$Label.c.orm_files_label"),
            type: 'button',
            initialWidth: 90,
            typeAttributes: {
                label: $A.get("$Label.c.orm_files_label"),
                name: $A.get("$Label.c.orm_files_label"),
                title: $A.get("$Label.c.orm_files_label")
         }
         }
        ]);
        component.set("v.idActivity", event.getParam('idActivity'));
        var idActivity = component.get('v.idActivity');
        console.log(idActivity);
        helper.getAllActivityProofByActivity(component, event);
    },

    openNewActivityProof: function(component, event, helper) {
        var idActivity = component.get('v.idActivity');
        var evt = $A.get("e.c:OrmNewActivityProofClickedEvt");
        evt.setParams({
            "idActivity": idActivity
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
        helper.getAllActivityProofByActivity(component, event);
    },
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method Filter
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    filterActivityProof: function(component, event, helper) {
        // var dataActivityProof = component.get('v.activityProofTemp');
        var dataActivityProof = component.get('v.ListData');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.getAllActivityProofByActivity(component, event);
        } else {
            term = "^" + term;
            try {
                regex = new RegExp(term, "i");

                dataActivityProof = dataActivityProof.filter(row => regex.test(row.Name) || regex.test(row.Description));

            } catch (e) {
                alert(e);
            }
            //component.set("v.activityProof",dataActivityProof);
            component.set("v.filterPagination", dataActivityProof);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },
   
    /**
     * 
     * @author David Diop
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-09-05 : David Diop- Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.isEmptyMap", true);
        component.set("v.showConfirmRemoveAssumption", false);
    },
    openfilesList: function(component, event, helper) {
    
        idMeasurePro =  event.getParam('activityProof');
        component.set('v.activityProofId',idMeasurePro);
        component.set("v.openfilesList", true);
    },
    cancelActivityProof : function(component, event, helper)
    {
    	component.set("v.openfilesList",false);
    },
    
     selectCauses: function(component, event, helper) {
    },
     removeActivityProof: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selectedRows in delete", selectedRows);
       if (selectedRows.length != 0) {
            var pgName = "page" + current;
            component.get("v.SelectedItem")[pgName] = selectedRows;
        }
        else{
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
        }  else if(component.get("v.isEmptyMap")){
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
     removeActivityProofSelected: function(component, event, helper) {
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
            var action = component.get('c.deleteRecordActivityProof');
            // pass the all selected record's Id's to apex method 
            action.setParams({
                "lstRecordId": idCauses
            });
            action.setCallback(this, function(response) {
                //store state of response
                var state = response.getState();
                if (state === "SUCCESS") {
                	myMap = {};
	                component.set("v.SelectedItem", myMap);
	                component.set("v.isEmptyMap", true);
                    component.set('v.showConfirmRemoveAssumption', false);
                    helper.getAllActivityProofByActivity(component, event);
                }
            });
            $A.enqueueAction(action);
    },
    
     onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    selectActivity: function(component, event, helper) {
        var row = event.getParam('row');
        component.set('v.activityProofId', row.Id);
        component.set("v.openfilesList", true);
        
        

    }
})