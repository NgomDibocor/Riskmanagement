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
            type: 'text',iconName: 'standard:opportunity'
        }, {
            label: 'Description',
            fieldName: 'RiskDescription',
            type: 'text',iconName: 'standard:opportunity'
        }, {
            label: 'Risk category',
            fieldName: 'RiskcategorieRisk',
            type: 'text',iconName: 'standard:opportunity'
        }
        ,
        {label: 'association', type: 'button',
         typeAttributes: { label: 'association', name: 'association', title: 'association'},
         iconName: 'standard:opportunity'
         },
        {label: 'configuration', type: 'button', initialWidth: 135,
         typeAttributes: { label: 'configure', name: 'configure', title: 'Click to configure this risk'},
         iconName: 'standard:opportunity'
         }
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
            /*var nomfield = component.find("categorieRisk");
            var item = nomfield.get("v.value");
            component.set("v.categorieRisk", item);
            component.find("categorieRisk").set("v.value", event.getSource().get("v.value"));*/
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
       /* var idRelatedRisks = [];
        var relatedRisks = component.get("v.relatedRisk");
        var assessmentRisks = [];
        relatedRisks.forEach(function(relatedRisk) {
            var newAssessmentRisk = component.get("v.assessmentRisk");
            newAssessmentRisk.orm_assessment__c = component.get("v.idAssessment");
            newAssessmentRisk.orm_Risk__c = relatedRisk.Id;
            assessmentRisks.push(newAssessmentRisk);
        });*/
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
                alert("successful association");
            } else {
                alert("failed association");
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
    listeAssessmentRisk:function (component,event,helper){
   var assessment= component.get("v.idAssessment");
    var action = component.get('c.liste');
        action.setParams({
            "item": assessment
        });
         action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
                alert(JSON.stringify(response.getReturnValue()));
            } 
            else {
                alert("failed association");
            }
        });
        $A.enqueueAction(action);
    }
})