({
	getIdAssessmentRisk : function(component, event, helper) {
		
		component.set('v.columns', [{
            label: $A.get("$Label.c.orm_measure_label"),
            fieldName: 'Name',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_measure_description"),
            fieldName: 'orm_description__c',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_category_measure_label"),
            fieldName: 'orm_measureCategorie__c',
            type: 'text'
        }, {
            type: 'button',
            typeAttributes: {
                label: $A.get("$Label.c.orm_add_proof_title"),
                name: $A.get("$Label.c.orm_add_proof_title"),
                title: $A.get("$Label.c.orm_add_proof_title")
            }
        }, {
            type: 'button',
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title")
            }
        }]);
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		//console.log('idAssessmentRisk ', event.getParam('idAssessmentRisk'));
		helper.getAllMeasuresByAssessmentRisk(component, event);
	},
	
	refreshList : function(component, event, helper) {
		helper.getAllMeasuresByAssessmentRisk(component, event);
	},
	
	filterMeasure : function (component, event, helper){
    	
    	//var measures = component.get('v.measuresTemp');
    	var measures = component.get('v.ListData');
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.getAllMeasuresByAssessmentRisk(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		measures = measures.filter(row => regex.test(row.Name)|| regex.test(row.orm_description__c));
		        } catch (e) {
		    	   
		        }
		   //component.set("v.measures", measures);
		   component.set("v.filterPagination", measures);
		   component.set("v.items", component.get("v.filterPagination"));
		    helper.paginationFilter(component, event);
         }        	
    },
    
    openNewMeasureCmp : function (component, event, helper){
        var evt = $A.get("e.c:OrmNewMeasureClickedEvt");
		evt.fire();
    },
    
    sendDescriptionFieldMeasure : function (component, event, helper){
    		var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_measures_label'),
            "descriptionField": $A.get('$Label.c.orm_measures_description')
        });
        evt.fire();
    },
    
    cancelDeleteMeasure : function (component, event, helper){
    	 component.set("v.isEmptyMap", true);
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    /**
	 * 
	 * @authorDavid diop
	 * @version 1.0
	 * @description method for show modal confirm delete MeasureProgression
	 * @history 2018-09-05 : David diop - Implementation
	 */ 
	
	 removeMeasure: function(component, event, helper) {
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
    confirmDeleteMeasure: function(component, event, helper) {
        var myMap = component.get("v.SelectedItem");
        var idMeasures = [];
        var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
                idMeasures.push(myMap[page][j].Id);
            }
        }

        //		call apex class method
        var action = component.get('c.deleteMeasures');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "measureIds": idMeasures
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set('v.openModalConfirmDeletion', false);
                helper.getAllMeasuresByAssessmentRisk(component, event);
            }
        });
        $A.enqueueAction(action);
    },
     selectCauses: function(component, event, helper) {
       
    },
    handleRowAction: function(component, event, helper) {
        var row = event.getParam('row');
       var actionName = event.getParam('action').name;
        if (actionName == $A.get("$Label.c.orm_edit_button_title")) {
        	var evt = $A.get("e.c:OrmEditMeasureClickedEvt");
            evt.setParams({
                "idMeasure" : row.Id
            });
            evt.fire();
        }
        if (actionName == $A.get("$Label.c.orm_add_proof_title")) {
        var evt = $A.get("e.c:OrmActiveRiskTraitementCmpEvt");
	        evt.setParams({
	            "idMeasure": row.Id
	        });
        evt.fire();
        }

    }
    
})