({
    fetchPicklist: function(component, event) {
        var categoryRisk = component.get("v.categorieRisk");
        console.log("categoryRisk" + categoryRisk);
        component.find("categorieRisk").set("v.value", categoryRisk);
        var nameCategorieRisk = component.find("categorieRisk");
        var item = nameCategorieRisk.get("v.value");
        console.log(nameCategorieRisk.get("v.value"));
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
               // component.set('v.allRisk', rows);
                //component.set('v.allRiskTemp', rows);
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
                //component.set('v.allRiskListTemp', rows);
                
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