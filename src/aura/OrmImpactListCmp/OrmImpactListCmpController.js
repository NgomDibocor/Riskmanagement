({
	getAssessmentRiskId : function(component, event, helper) {
	
		component.set('v.columns', 
		[{
            label: 'Name',
            fieldName: 'Name',
            type: 'text'
         },
         {
        	 label: 'Description',
            fieldName: 'Description',
            type: 'text'
         },
         {
        	  label: $A.get("$Label.c.orm_categorieImpact"),
            fieldName: 'orm_categorie_impact__c',
            type: 'text'
         },
         {label: $A.get("$Label.c.orm_table_action_label"),
            type: 'button',
            initialWidth: 90,
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title")
            }
            }
        ]);
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		helper.refresh(component, component.get("v.idAssessmentRisk"));
	},
	refreshList : function(component, event, helper) {
		helper.refresh(component, component.get("v.idAssessmentRisk"));
	},
	/* @cretedBy: David
	   @createdDate: 28/08/2018
     */
    openImpactNewCmp : function(component, event, helper){
        var assessmentRiskId = component.get("v.idAssessmentRisk");
        var evt = $A.get("e.c:OrmNewImpactClickedEvt");
        evt.setParams({
            "idAssessmentRisk": assessmentRiskId
        });
		evt.fire();
    },
	/*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
       // var dataRisk = component.get('v.impactsTemp');
        var dataRisk = component.get('v.ListData');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.refresh(component, component.get("v.idAssessmentRisk"));
        } else {
            term = "^" + term;
        try {
            regex = new RegExp(term, "i");
        
            dataRisk = dataRisk.filter(row => regex.test(row.Name) || regex.test(row.Description));
            	
        } catch (e) {
            alert(e);
        }
        //component.set("v.impacts",dataRisk);
           component.set("v.filterPagination", dataRisk);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilterBis(component, event);
        }
    },
   
	openModalDeleteCause: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selected", selectedRows.length);
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
        }
        else {
            component.set("v.openModalConfirmDeletion", true);
        }
    },
     cancelDeleteCause : function (component, event, helper) {
    	component.set("v.isEmptyMap", true);
    	component.set('v.openModalConfirmDeletion', false);
    },
    /**
	 * 
	 * @author Dvaid diop
	 * @version 1.0
	 * @description method for remove Activity Proofselected
	 * @history 2018-09-05 : David diop- Implementation
	 */
    confirmDeleteCause : function (component, event, helper) {
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
        var action = component.get('c.deleteImpacts');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "impactIds": idCauses
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set('v.openModalConfirmDeletion', false);
                helper.refresh(component, component.get("v.idAssessmentRisk"));
            }
        });
        $A.enqueueAction(action);
    },
     sendDescriptionFieldCause : function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Phase",
            "descriptionField": "Description"
        });
        evt.fire();
    },
    selectCauses: function(component, event, helper) {
       
    },
     handleRowAction: function(component, event, helper) {
        var row = event.getParam('row');
        var assessmentRiskId = component.get("v.idAssessmentRisk");
        var evt = $A.get("e.c:OrmEditImpactClickedEvt");
        evt.setParams({
            "idImpact": row.Id,
            "assessmentRiskId":assessmentRiskId
        });
		evt.fire();

    }
   
})