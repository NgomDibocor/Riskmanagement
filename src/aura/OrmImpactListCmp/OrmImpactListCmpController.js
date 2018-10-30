({
	getAssessmentRiskId : function(component, event, helper) {
	
		component.set('v.columns', 
		[{
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
        	  label: $A.get("$Label.c.orm_categorieImpact"),
            fieldName: 'orm_categorie_impact__c',
            type: 'text'
         },
         {label: $A.get("$Label.c.orm_table_action_label"),
            type: 'button',
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
    cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
     component.set("v.showSaveCancelBtn",false); 
     helper.refresh(component, component.get("v.idAssessmentRisk"));
    },
	save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateImpacts");
               action.setParams({
            	   'impacts': component.get("v.PaginationList")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var impacts = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.impacts", impacts);
	                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
	                    component.set("v.showSaveCancelBtn", false);
	                    var toast = $A.get('e.force:showToast');
			            toast.setParams({
			            	'message' : $A.get('$Label.c.orm_updated'),
			                'type' : 'success',
			                'mode' : 'dismissible'
			            });	
			            toast.fire();
			       }
	           });
	           $A.enqueueAction(action);
        } 
        }, 
		
	
	/*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
       // var dataRisk = component.get('v.impactsTemp');
        var dataRisk = component.get('v.initialData');
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
     selectAll : function (component, event, helper) {
    	//get the header checkbox value  
    	var selectedHeaderCheck = event.getSource().get("v.value");
    	
    	var evt = $A.get('e.c:OrmEvtSelectAllImpact');
    	evt.setParams({"selectAllCheckbox": selectedHeaderCheck});
    	evt.fire();
    },
    /**
	 * 
	 * @authorDavid diop
	 * @version 1.0
	 * @description method for show modal confirm delete MeasureProgression
	 * @history 2018-09-05 : David diop - Implementation
	 */ 
//	openModalDeleteCause:function(component,event,helper){
//		// is checked delete assumption show popup message confirmation
//		// get all checkboxes 
//		//if not checked show toast warning
//		var getSelectedNumber = component.get("v.selectedRowsCount");
//		if(getSelectedNumber==0){
//		var toast = $A.get('e.force:showToast');
//					toast.setParams({
//						'message' : $A.get("$Label.c.orm_warning_checked_checkbox"),
//						'type' : 'warning',
//						'mode' : 'dismissible'
//					});      
//					toast.fire(); 
//		}else{
//	component.set("v.openModalConfirmDeletion",true);
//		}
//
//
//	},
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