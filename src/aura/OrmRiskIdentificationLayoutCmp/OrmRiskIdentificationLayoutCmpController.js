({
    initialiseAssessment: function(component, event, helper) {
        //alert('id Assessment ', event.getParam('idAssessment'));
        component.set("v.idAssessment", event.getParam('idAssessment'));
    },
    ormRiskCreatedEvent: function(component, event, helper) {
    	component.set("v.categorieRisk", event.getParam('riskCategoriy'));
        helper.fetchPicklist(component, event);
    },

    /*
     * CreatedBy @David Diop
     *
     */
    openModalNewRisk: function(component, event, helper) {
        var assessment = component.get("v.idAssessment");
        var evt = $A.get("e.c:OrmOpenNewRiskCmpEvt");
        evt.setParams({
            "idAssessment": assessment
        });
        evt.fire();
    },
    /*
     * CreatedBy @David Diop
     *
     */
    doInit: function(component, event, helper) {
        // Set the columns of the Table
        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_name_risk"),
            fieldName: 'RiskName',
            type: 'text',
            iconName: 'standard:orders'
        }, {
            label: $A.get("$Label.c.orm_description_risk"), 
            fieldName: 'RiskDescription',
            type: 'text',
            iconName: 'standard:orders',
            cellAttributes: { class: "descriptionToolTip" }
        }, {
            label:  $A.get("$Label.c.orm_risk_category"),
            fieldName: 'RiskcategorieRisk',
            type: 'text',
            iconName: 'standard:orders'
        }, {
            label: $A.get("$Label.c.orm_table_action_label"),
            type: 'button',
            typeAttributes: {
                label:  $A.get("$Label.c.orm_edit_button_title"),
                name:   $A.get("$Label.c.orm_edit_button_title"),
                title:  $A.get("$Label.c.orm_edit_button_title") 
            },
        }]);
        helper.fetchPicklist(component, event);
    },
    /*    
     * CreatedBy @David Diop
     *function that allows you to filter by category
     */

    filterByCategorieRisk: function(component, event, helper) {
        var categorieRisk = component.find("categorieRisk");
        var categorieRiskValue = categorieRisk.get("v.value");
        var assessment = component.get("v.idAssessment");
        var isItemValid = true;
        if ($A.util.isEmpty(categorieRiskValue)) {
            isItemValid = false;
            helper.fetchPicklist(component, event);
        }
        if (isItemValid) {
            var action = component.get('c.findAllAssessmentRisk');
            action.setParams({
                "item": categorieRiskValue,
                "assessment": assessment
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
                    if (rows.length == 0) {
                    
                        var toast = $A.get('e.force:showToast');
                        toast.setParams({
                            'message': $A.get("$Label.c.orm_risk_associated_category") + ' ' + categorieRiskValue,
                            'type': 'warning',
                            'mode': 'dismissible'
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
            var newAssessmentRisk = {};
            newAssessmentRisk.sobjectType = 'orm_assessmentRisk__c';
            newAssessmentRisk.orm_assessment__c = component.get("v.idAssessment");
            newAssessmentRisk.orm_Risk__c = selectedRow.Id;
            assessmentRisks.push(newAssessmentRisk);
        });
        // Display that fieldName of the selected rows
        component.set("v.relatedRisk", assessmentRisks);
    },

    openPopupDissociate: function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var assessmentRisks = [];
        selectedRows.forEach(function(selectedRow) {
            var newAssessmentRisk = {};
            newAssessmentRisk.sobjectType = 'orm_assessmentRisk__c';
            newAssessmentRisk.Id = selectedRow.Id;
            assessmentRisks.push(newAssessmentRisk);
        });
        if(assessmentRisks.length == 0)
        {
        component.set("v.isOpenButton", false);
      
        }
        else{
        component.set("v.isOpenButton", true);
        component.set("v.dissociateRisk", assessmentRisks);
        }
        
    },

    /*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
        var dataRisk = component.get('v.allRiskTemp');
    
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.fetchPicklist(component, event);
        } else {
            term = "^" + term;
        try {
            regex = new RegExp(term, "i");
        
            dataRisk = dataRisk.filter(row => regex.test(row.RiskName) || regex.test(row.RiskDescription));
            	
        } catch (e) {
            alert(e);
        }
        component.set("v.allRisk",dataRisk);
        }
    },
    relatedRiskfunction: function(component, event, helper) {
        var relatedassesmentRisk = component.get("v.relatedRisk");
        var riskCategory = component.get("v.categorieRisk");
        var  categorieRisk = component.find("categorieRiskList").get("v.value");
        	 if ($A.util.isEmpty(categorieRisk)) {
                component.find("categorieRisk").set("v.value",riskCategory);
            } else {
                component.set("v.categorieRisk", categorieRisk);
               component.find("categorieRisk").set("v.value",categorieRisk);
            }
        var action = component.get('c.addAssessmentRisks');
        action.setParams({
            "items": relatedassesmentRisk
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
                //notify that list AssessmentRisk Is Not Empty now
                var evt = $A.get("e.c:OrmListAssessmentRiskIsNotEmpty");
	            evt.fire();
	            
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get("$Label.c.orm_success_associated"),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toast.fire();
                component.set("v.isOpen", false);
                helper.fetchPicklist(component, event);
            } else {
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get("$Label.c.orm_failed_association"),
                    'type': 'warning',
                    'mode': 'dismissible'
                });
                toast.fire();
                component.set("v.isOpen", false);
            }
        });
        $A.enqueueAction(action);
    },

    dissociateRiskfunction: function(component, event, helper) {
        var deletedAssesmentRisk = component.get("v.dissociateRisk");
        var action = component.get('c.deleteAssessmentRisks');
        action.setParams({
            "items": deletedAssesmentRisk
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
            
                var evtnotify = $A.get("e.c:OrmNotifyAfterdeletingAssessmentRiskEvt");
                evtnotify.fire();
                
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get("$Label.c.orm_successful_dissociation"),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toast.fire();
                component.set("v.isOpenButton", false);
                helper.fetchPicklist(component, event);
            } else {
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get("$Label.c.orm_failed_dissociation"),
                    'type': 'warning',
                    'mode': 'dismissible'
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
    /*    
     * CreatedBy @David Diop
     *function that allows the creation of the datatable
     */
    openModalRisk: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"
        component.set("v.isOpen", true);
        // Set the columns of the Table
        component.set('v.columns2', [{
            label: $A.get("$Label.c.orm_name_risk"),
            fieldName: 'Name',
            type: 'text',
            iconName: 'standard:opportunity'
        }, {
            label: $A.get("$Label.c.orm_risk_category"),
            fieldName: 'orm_categorieRisk__c',
            type: 'text',
            iconName: 'standard:opportunity'
        }, {
            label: $A.get("$Label.c.orm_description_risk"),
            fieldName: 'Description',
            type: 'text',
            iconName: 'standard:opportunity'
        }]);
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
                    assessmentRisks.forEach(function(assessmentRisk) {
                    rows = rows.filter(row => row.Id !== assessmentRisk.orm_Risk__c);
                    });
                    component.set('v.allRiskList', rows);
                    if (rows.length == 0) {
                        var toast = $A.get('e.force:showToast');
                        toast.setParams({
                            'message': $A.get("$Label.c.orm_no_risk") + ' ' + categorieRiskValue,
                            'type': 'warning',
                            'mode': 'dismissible'
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
        var data = component.get("v.allRiskListTemp");
        var term = component.get("v.filterRisk");
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.fetchlistRiskModal(component, event);

        } else {
            term = "^" + term;
        }
        try {
            regex = new RegExp(term, "i");
            data = data.filter(row => regex.test(row.Name) || regex.test(row.Description));
        } catch (e) {
            alert(e);
        }
        component.set("v.allRiskList", data);
    },
    closeModal: function(component) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"
        component.set("v.isOpen", false);
    },
    handleRowAction: function(component, event, helper) {
        var row = event.getParam('row');
        var evt = $A.get("e.c:OrmActiveRiskAnalyeCmpEvt");
        evt.setParams({
            "idAssessmentRisk": row.Id
        });
        evt.fire();

    }
})