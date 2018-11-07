({
    
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
    var today = new Date();
    var monthDigit = today.getMonth() + 1;
    if (monthDigit <= 9) {
        monthDigit = '0' + monthDigit;
    }
    var dateDuJour = today.getFullYear()+"-"+ monthDigit+"-"+ today.getDate();
    console.log(dateDuJour);
        // Set the columns of the Table
        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_name_risk"),
            fieldName: 'RiskName',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_description_risk"),
            fieldName: 'RiskDescription',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_risk_category"),
            fieldName: 'RiskcategorieRisk',
            type: 'picklist'
        }, {
            label: $A.get("$Label.c.orm_table_action_label"),
            type: 'button',
            initialWidth: 90,
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title")
            },
        }]);
        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.risk"),
            'fld': 'orm_categorieRisk__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allCategorieRisk', response.getReturnValue());
                component.set('v.categorieRisk', response.getReturnValue()[0]);
                component.set('v.categoriePopupOthersRisk', response.getReturnValue()[1]);

            } else {

                alert($A.get('$Label.c.orm_not_found'));
            }
        });

        $A.enqueueAction(action);
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

     dissociateRiskfunction: function(component, event, helper) {
//     openPopupDissociate
//        var selectedRows = event.getParam('selectedRows');
//        var assessmentRisks = [];
//        selectedRows.forEach(function(selectedRow) {
//            var newAssessmentRisk = {};
//            newAssessmentRisk.sobjectType = 'orm_assessmentRisk__c';
//            newAssessmentRisk.Id = selectedRow.Id;
//            assessmentRisks.push(newAssessmentRisk);
//        });
//        if (assessmentRisks.length == 0) {
//            component.set("v.isOpenButton", false);
//
//        } else {
//            component.set("v.isOpenButton", true);
//            component.set("v.dissociateRisk", assessmentRisks);
//        }

    	var pagination = component.get("v.PaginationList");
    	if($A.util.isEmpty(pagination)){
    		var toast = $A.get('e.force:showToast');
                        toast.setParams({
                            'message': $A.get("$Label.c.orm_no_risk") ,
                            'type': 'warning',
                            'mode': 'dismissible'
                        });
                        toast.fire();
    	}else{
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
         var myMap = component.get("v.SelectedItem");
           var idCauses = [];
           var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
            	var newAssessmentRisk = {};
                newAssessmentRisk.sobjectType = 'orm_assessmentRisk__c';
                newAssessmentRisk.orm_assessment__c = component.get("v.idAssessment");
                newAssessmentRisk.orm_Risk__c = myMap[page][j].Id;
                idCauses.push(newAssessmentRisk);
            }
        }
        console.log("id Cause",JSON.stringify( idCauses));
        
        var action = component.get('c.deleteAssessmentRisks');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "items": idCauses
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                helper.fetchPicklist(component, event);
            }
        });
        $A.enqueueAction(action);
        }
        }

    },

    /*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
        //        var dataRisk = component.get('v.allRiskTemp');
        var dataRisk = component.get('v.initialData');
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
            //        component.set("v.allRisk",dataRisk);
            component.set("v.filterPagination", dataRisk);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },
    relatedRiskfunction: function(component, event, helper) {
//        var relatedassesmentRisk = component.get("v.relatedRisk");
//        var riskCategory = component.get("v.categorieRisk");
//        var categorieRisk = component.find("categorieRiskList").get("v.value");
//        if ($A.util.isEmpty(categorieRisk)) {
//            component.find("categorieRisk").set("v.value", riskCategory);
//        } else {
//            component.set("v.categorieRisk", categorieRisk);
//            component.find("categorieRisk").set("v.value", categorieRisk);
//        }
//        var action = component.get('c.addAssessmentRisks');
//        action.setParams({
//            "items": relatedassesmentRisk
//        });
//        action.setCallback(this, function(response) {
//            var state = response.getState();
//            if (component.isValid() && state == "SUCCESS") {
//                //notify that list AssessmentRisk Is Not Empty now
//                var evt = $A.get("e.c:OrmListAssessmentRiskIsNotEmpty");
//                evt.fire();
//
//                var toast = $A.get('e.force:showToast');
//                toast.setParams({
//                    'message': $A.get("$Label.c.orm_success_associated"),
//                    'type': 'success',
//                    'mode': 'dismissible'
//                });
//                toast.fire();
//                component.set("v.isOpen", false);
//                helper.fetchPicklist(component, event);
//            } else {
//                var toast = $A.get('e.force:showToast');
//                toast.setParams({
//                    'message': $A.get("$Label.c.orm_failed_association"),
//                    'type': 'warning',
//                    'mode': 'dismissible'
//                });
//                toast.fire();
//                component.set("v.isOpen", false);
//            }
//        });
//        $A.enqueueAction(action);
    	var pagination = component.get("v.PaginationList");
    	if($A.util.isEmpty(pagination)){
    		var toast = $A.get('e.force:showToast');
                        toast.setParams({
                            'message': $A.get("$Label.c.orm_no_risk") ,
                            'type': 'warning',
                            'mode': 'dismissible'
                        });
                        toast.fire();
    	}else{
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
           var myMap = component.get("v.SelectedItem");
           var idCauses = [];
           var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
            	var newAssessmentRisk = {};
                newAssessmentRisk.sobjectType = 'orm_assessmentRisk__c';
                newAssessmentRisk.orm_assessment__c = component.get("v.idAssessment");
                newAssessmentRisk.orm_Risk__c = myMap[page][j].Id;
                idCauses.push(newAssessmentRisk);
            }
        }
        console.log("id Cause",JSON.stringify( idCauses));

        //		call apex class method
        var action = component.get('c.addAssessmentRisks');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "items": idCauses
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set("v.isOpen", false);
                helper.fetchPicklist(component, event);
            }
        });
        $A.enqueueAction(action);
        }
        }
    },

//    dissociateRiskfunction: function(component, event, helper) {
//        var deletedAssesmentRisk = component.get("v.dissociateRisk");
//        var action = component.get('c.deleteAssessmentRisks');
//        action.setParams({
//            "items": deletedAssesmentRisk
//        });
//        action.setCallback(this, function(response) {
//            var state = response.getState();
//            if (component.isValid() && state == "SUCCESS") {
//
//                var evtnotify = $A.get("e.c:OrmNotifyAfterdeletingAssessmentRiskEvt");
//                evtnotify.fire();
//
//                var toast = $A.get('e.force:showToast');
//                toast.setParams({
//                    'message': $A.get("$Label.c.orm_successful_dissociation"),
//                    'type': 'success',
//                    'mode': 'dismissible'
//                });
//                toast.fire();
//                component.set("v.isOpenButton", false);
//                helper.fetchPicklist(component, event);
//            } else {
//                var toast = $A.get('e.force:showToast');
//                toast.setParams({
//                    'message': $A.get("$Label.c.orm_failed_dissociation"),
//                    'type': 'warning',
//                    'mode': 'dismissible'
//                });
//                toast.fire();
//            }
//        });
//        $A.enqueueAction(action);
//    },
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
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_risk_category"),
            fieldName: 'orm_categorieRisk__c',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_description_risk"),
            fieldName: 'Description',
            type: 'text'
        }]);
        helper.fetchlistRisks(component, event);
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
            helper.fetchlistRisks(component, event);
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
                    component.set('v.initialData', rows);
                    component.set('v.items',rows);
//                   // start pagination
//                    var pageSize = component.get("v.pageSizeBis");
//	                // get size of all the records and then hold into an attribute "totalRecords"
//	                component.set("v.totalRecords", component.get("v.items").length);
//	                // set star as 0
//	                component.set("v.startPage",0);
//	                var totalRecords = component.get("v.items").length;
//				    //var div = Math.trunc(totalRecords / pageSize);
//	                if(totalRecords === pageSize){
//	                  component.set("v.hideNext", true);
//	                  component.set("v.endPage", pageSize - 1);
//	                }else{
//	                  component.set("v.hideNext", false);
//	                  component.set("v.endPage", pageSize - 1);
//	                }
//	                var PaginationList = [];
//	                for(var i=0; i< pageSize; i++){
//	                    if(component.get("v.items").length> i)
//	                        PaginationList.push(component.get("v.items")[i]);    
//	                }
//	                component.set('v.PaginationList', PaginationList);
                //end pagination
                var pageSize = component.get("v.pageSizeInlineEdit");
                component.set('v.ListData', rows);
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.ListData").length);
                //Set the current Page as 0
                component.set("v.currentPage", 0);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.ListData").length;
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.ListData").length > i) {
                        PaginationList.push(rows[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
                    
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
                    helper.fetchlistRisks(component, event);
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
        var data = component.get('v.ListData');
        var term = component.get("v.filterRisk");
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.fetchlistRisks(component, event);

        } else {
            term = "^" + term;
        }
        try {
            regex = new RegExp(term, "i");
            data = data.filter(row => regex.test(row.Name) || regex.test(row.Description));
        } catch (e) {
            alert(e);
        }

        component.set("v.filterPagination", data);
        component.set("v.items", component.get("v.filterPagination"));
        helper.paginationFilter(component, event);
    },
    closeModal: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"
        component.set("v.isOpen", false);
        helper.filterByCategorieRisk(component, event);
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