({
    fetchPicklist: function(component, event) {
        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.risk"),
            'fld': 'orm_categorieRisk__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allCategorieRisk', response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtSpinner.fire();
                var categoryRisk = component.get("v.categorieRisk");
                var nameCategorieRisk = component.find("categorieRisk");
                var item = nameCategorieRisk.get("v.value");
                console.log(categoryRisk);
                var assessment = component.get("v.idAssessment");
                var actionOrgs = component.get("c.findAllAssessmentRisk");
                actionOrgs.setParams({
                    "item": categoryRisk,
                    "assessment": assessment
                });
                actionOrgs.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
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
                        component.set('v.allRiskTemp', rows);

                        var risk = component.get('v.allRisk');
                        if (risk == null) {
                            var toast = $A.get('e.force:showToast');
                            toast.setParams({
                                'message': 'Check if you Have Created the Assessment',
                                'type': 'warning',
                                'mode': 'dismissible'
                            });
                            toast.fire();
                        }
                        var action = component.get('c.getSelectOptions');
                        action.setParams({
                            'objObject': component.get("v.risk"),
                            'fld': 'orm_categorieRisk__c'
                        });

                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(actionOrgs);
            } else {

                alert($A.get('$Label.c.orm_not_found'));
            }
        });

        $A.enqueueAction(action);
    },

    fetchlistRiskModal: function(component, event) {
        var categoryRisk = component.get("v.categorieRisk");
        var nameCategorieRisk = component.find("categorieRiskList");
        var item = nameCategorieRisk.get("v.value");
        var actionOrgs = component.get("c.findAll");
        actionOrgs.setParams({
            "item": categoryRisk,
        });
        // component.set("v.categorieRisk", item);
        actionOrgs.setCallback(this, function(response) {

            var state = response.getState();
            if (state === 'SUCCESS') {

                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                }

                var assessmentRisks = component.get('v.allRisk');

                assessmentRisks.forEach(function(assessmentRisk) {
                    rows = rows.filter(row => row.Id !== assessmentRisk.orm_Risk__c);
                });

                component.set('v.allRiskList', rows);
                component.set('v.allRiskListTemp', rows);
                var action = component.get('c.getSelectOptions');
                action.setParams({
                    'objObject': component.get("v.risk"),
                    'fld': 'orm_categorieRisk__c'
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS' && component.isValid()) {
                        component.set('v.allCategorieRiskList', response.getReturnValue());
                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(action);
            } else {

                alert($A.get('$Label.c.orm_not_found'));
            }
        });

        $A.enqueueAction(actionOrgs);
    },
    sendValuesToFieldDescription: function(component, event, helper, field, description) {
        component.set("v.closeFieldDescription", false);
        var closeFieldDescription = component.get("v.closeFieldDescription");
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "closeFieldDescription": closeFieldDescription,
            "nomField": field,
            "descriptionField": description
        });
        evt.fire();
    }
})