({
    initialiseAssessment: function(component, event, helper) {
        alert('id Assessment ', event.getParam('idAssessment'));
        component.set("v.idAssessment", event.getParam('idAssessment'));
    },
    ormRiskCreatedEvent: function(component, event, helper) {
        helper.fetchPicklist(component, event);
    },

    /*
     * CreatedBy @David Diop
     *
     */
    openModalNewRisk: function(component, event, helper) {
    var assessment= component.get("v.idAssessment");
        var evt = $A.get("e.c:OrmOpenNewRiskCmpEvt");
        evt.fire();
    },
    /*
     * CreatedBy @David Diop
     *
     */
    doInit: function(component, event, helper) {
        // Set the columns of the Table
        component.set('v.columns', [{
            label: 'Risk Name',
            fieldName: 'RiskName',
            type: 'text',iconName: 'standard:orders'
        },
        {
            label: 'Description',
            fieldName: 'RiskDescription',
            type: 'text',iconName: 'standard:orders'
        }, 
        {
           label: 'Risk category',
           fieldName: 'RiskcategorieRisk',
           type: 'text',iconName: 'standard:orders'
        },
        {  label: 'configure', initialWidth: 135,
           typeAttributes: { label: 'configure', name: 'configure', title: 'configure'},
           iconName: 'standard:orders',
           cellAttributes: {
			  iconName: 'custom:custom19'
           }}
        ]);
        helper.fetchPicklist(component, event);
    },
    /*    
     * CreatedBy @David Diop
     *function that allows you to filter by category
     */

    filterByCategorieRisk: function(component, event, helper) {
        var categorieRisk = component.find("categorieRisk");
        var categorieRiskValue = categorieRisk.get("v.value");
        var assessment= component.get("v.idAssessment");
        var isItemValid = true;
        if ($A.util.isEmpty(categorieRiskValue)) {
            isItemValid = false;
            helper.fetchPicklist(component, event);
        }
        if (isItemValid) {
            var action = component.get('c.findAllAssessmentRisk');
            action.setParams({
                "item": categorieRiskValue,
                "assessment":assessment
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.orm_Risk__c) {
                    row.RiskName = row.orm_Risk__r.Name;
                    row.RiskDescription = row.orm_Risk__r.Description;
                    row.RiskcategorieRisk = row.orm_Risk__r.orm_categorieRisk__c;
                    }
                }
                    component.set('v.allRisk', rows);
                    if(rows.length == 0) {
                    	var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'there is no risk associated or category is'+' '+categorieRiskValue,
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
                    }
                    
                    component.find("categorieRisk").set("v.value", event.getSource().get("v.value"));
                } else {
                    helper.fetchPicklist(component, event);
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    openPopupAssociation: function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var assessmentRisks = [];
        selectedRows.forEach(function(selectedRow) {
        var newAssessmentRisk ={};
         	newAssessmentRisk.sobjectType='orm_assessmentRisk__c';
            newAssessmentRisk.orm_assessment__c = component.get("v.idAssessment");
            newAssessmentRisk.orm_Risk__c = selectedRow.Id;
	        assessmentRisks.push(newAssessmentRisk);
        });
        // Display that fieldName of the selected rows
        component.set("v.relatedRisk", assessmentRisks);
    },
    
    openPopupDissociate: function(component, event, helper) {
    	component.set("v.isOpenButton",true);
        var selectedRows = event.getParam('selectedRows');
        var assessmentRisks = [];
        selectedRows.forEach(function(selectedRow) {
        var newAssessmentRisk ={};
         	newAssessmentRisk.sobjectType='orm_assessmentRisk__c';
            newAssessmentRisk.Id=selectedRow.Id;
	        assessmentRisks.push(newAssessmentRisk);
        });
        component.set("v.dissociateRisk", assessmentRisks);
    },
    
    /*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
        var data = component.get("v.allRisk");
        var term = component.get("v.filter");
        var results = data;
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.fetchPicklist(component, event);
        } else {
            term = "^" + term;
        }
        try {
            regex = new RegExp(term, "i");
            // filter checks each row, constructs new array where function returns true
            results = data.filter(row => regex.test(row.RiskName) || regex.test(row.RiskDescription));
        } catch (e) {
            // invalid regex, use full list
            helper.fetchPicklist(component, event);
        }
        component.set("v.allRisk", results);
    },
    relatedRiskfunction: function(component, event, helper) {
        var relatedassesmentRisk= component.get("v.relatedRisk");
        alert(JSON.stringify(relatedassesmentRisk));
        var action = component.get('c.addAssessmentRisks');
        action.setParams({
            "items": relatedassesmentRisk
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state == "SUCCESS") {
                var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'successful association',
			           'type' : 'success',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
                component.set("v.isOpen", false);
                helper.fetchPicklist(component,event);
            } else {
                 var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'failed association',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
               component.set("v.isOpen", false);
            }
        });
        $A.enqueueAction(action);
    },
    
    dissociateRiskfunction:  function(component, event, helper) {
        var deletedAssesmentRisk= component.get("v.dissociateRisk");
        var action = component.get('c.deleteAssessmentRisks');
        action.setParams({
            "items": deletedAssesmentRisk
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state == "SUCCESS") {
                var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'successful dissociation',
			           'type' : 'success',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
                helper.fetchPicklist(component,event);
            } else {
                 var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'failed dissociation',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
            }
        });
        $A.enqueueAction(action);
    },
    sendDescriptionSearchToFD: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
    },
    
     openModalRisk : function(component, event, helper){
		// for Hide/Close Model,set the "isOpen" attribute to "False"
		component.set("v.isOpen", true);
		// Set the columns of the Table
        component.set('v.columns2', [{
            label: 'Risk Name',
            fieldName: 'Name',
            type: 'text',iconName: 'standard:opportunity'
        },
        {
            label: 'Risk category',
            fieldName: 'orm_categorieRisk__c',
            type: 'text',iconName: 'standard:opportunity'
        },
        {
            label: 'Description',
            fieldName: 'Description',
            type: 'text',iconName: 'standard:opportunity'
        }
        ]);
         helper.fetchlistRiskModal(component, event);
	},
	/*    
     * CreatedBy @David Diop
     *function that allows you to filter by category
     */
    filterByCategorieRiskList: function(component, event, helper) {
        var categorieRisk = component.find("categorieRiskList");
        var categorieRiskValue = categorieRisk.get("v.value");
        var isItemValid = true;
        if ($A.util.isEmpty(categorieRiskValue)) {
            isItemValid = false;
            helper.fetchlistRiskModal(component, event);
        }
        if (isItemValid) {
            var action = component.get('c.findAll');
            action.setParams({
                "item": categorieRiskValue,
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                }
                var assessmentRisks = component.get('v.allRisk');
                assessmentRisks.forEach(function(assessmentRisk){                
                	rows = rows.filter( row => row.Id !== assessmentRisk.orm_Risk__c );
                });
                    component.set('v.allRiskList', rows);
                    if(rows.length == 0) {
                    	var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'there is no risk '+' '+categorieRiskValue,
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
                    }
                    component.find("categorieRiskList").set("v.value", event.getSource().get("v.value"));
                } else {
                    helper.fetchlistRiskModal(component, event);
                }
            });
            $A.enqueueAction(action);
        }
    },
    /*
     * CreatedBy @David Diop
     *
     */
    filterByRisk: function(component, event, helper) {
        var data = component.get("v.allRiskList");
        var term = component.get("v.filterRisk");
        var results = data;
        var regex;
        if ($A.util.isEmpty(term)) {
          helper.fetchlistRiskModal(component, event);
           
        } else {
            term = "^" + term;
        }
        try {
            regex = new RegExp(term, "i");
            // filter checks each row, constructs new array where function returns true
            results = data.filter(row => regex.test(row.Name) || regex.test(row.Description));
        } catch (e) {
            // invalid regex, use full list
            helper.fetchlistRiskModal(component, event);
        }
        component.set("v.allRiskList", results);
    },
	closeModal : function(component){
		// for Hide/Close Model,set the "isOpen" attribute to "False"
		component.set("v.isOpen", false);
	}
})