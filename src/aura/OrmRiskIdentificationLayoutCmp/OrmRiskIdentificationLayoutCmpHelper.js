({
    fetchPicklist: function(component, event) {
        var assessment = component.get("v.idAssessment");
        var actionInit = component.get("c.findAllAssessmentRisk");
        actionInit.setParams({"assessment": assessment });
        actionInit.setCallback(this, function(response) {
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
                    component.set('v.initialData', response.getReturnValue());
                    component.set('v.items', response.getReturnValue());
                    // start pagination
                    var pageSize = component.get("v.pageSizeBis");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                // set star as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.PaginationList', PaginationList);
                    //end pagination
	                var risk = component.get('v.PaginationList');
	                if(risk == null) {
	                    var toast = $A.get('e.force:showToast');
	                    toast.setParams({
	                        'message': 'Check if you Have Created the Assessment',
	                        'type': 'warning',
	                        'mode': 'dismissible'
	                    });
	                    toast.fire();
	                }
	                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                    evtSpinner.fire();
                
            } else {
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(actionInit);

    },

    fetchlistRisks: function(component, event) {
        var categoryRisk = component.get("v.categoriePopupOthersRisk");
        var actionOthersRisks = component.get("c.findAll");
        actionOthersRisks.setParams({
            "item": categoryRisk,
        });
        // component.set("v.categorieRisk", item);
        actionOthersRisks.setCallback(this, function(response) {
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
                component.set('v.initialData', rows);
                component.set('v.items',rows);
                   // start pagination
                    var pageSize = component.get("v.pageSizeBis");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                // set star as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.PaginationList', PaginationList);
                //end pagination
                var action = component.get('c.getSelectOptions');
                action.setParams({
                    'objObject': component.get("v.risk"),
                    'fld': 'orm_categorieRisk__c'
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS' && component.isValid()) {
                    	var result = response.getReturnValue();
                    	var listCategoryRisk  = result.filter(category => category !== 'All'); 
                    	component.set('v.allCategorieRiskList', listCategoryRisk);
                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(action);
            } else {

                alert($A.get('$Label.c.orm_not_found'));
            }
        });

        $A.enqueueAction(actionOthersRisks);
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
    },
    
    filterByCategorieRisk: function(component, event) {
        var categorieRisk = component.find("categorieRisk");
        var categorieRiskValue = categorieRisk.get("v.value");
        var assessment = component.get("v.idAssessment");
        var isItemValid = true;
        if ($A.util.isEmpty(categorieRiskValue)) {
            isItemValid = false;
            this.fetchPicklist(component, event);
        }
        if (isItemValid) {
            var action = component.get('c.findAllAssessmentRiskCategory');
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
                    component.set('v.initialData', response.getReturnValue());
                    component.set('v.items', response.getReturnValue());
                    // start pagination
                    var pageSize = component.get("v.pageSizeBis");
                    // get size of all the records and then hold into an attribute "totalRecords"
                    component.set("v.totalRecords", component.get("v.items").length);
                    // set star as 0
                    component.set("v.startPage", 0);
                    var totalRecords = component.get("v.items").length;
                    //var div = Math.trunc(totalRecords / pageSize);
                    if (totalRecords === pageSize) {
                        component.set("v.hideNext", true);
                        component.set("v.endPage", pageSize - 1);
                    } else {
                        component.set("v.hideNext", false);
                        component.set("v.endPage", pageSize - 1);
                    }
                    var PaginationList = [];
                    for (var i = 0; i < pageSize; i++) {
                        if (component.get("v.items").length > i)
                            PaginationList.push(component.get("v.items")[i]);
                    }
                    component.set('v.PaginationList', PaginationList);
                    //end pagination
                } else {
                    this.fetchPicklist(component, event);
                }
            });
            $A.enqueueAction(action);
        }
    },
    
})