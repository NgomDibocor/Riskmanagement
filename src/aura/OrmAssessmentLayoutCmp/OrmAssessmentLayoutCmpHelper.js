({
    fetchPicklist : function(component, event) {        
        var actionTypeAssessment = component.get('c.getSelectOptions');
        actionTypeAssessment.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_typeAssessment__c'});
        var opts = [];
        actionTypeAssessment.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValues = response.getReturnValue();
 
                if (allValues != undefined && allValues.length > 0) {
                    var none="---None---";
                    opts.push(none);
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push(allValues[i]);
                }
                component.set('v.allTypeAssessment', opts);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionOrgs = component.get("c.getOrganisations");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisation', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionTypeProjet = component.get('c.getSelectOptions');
        actionTypeProjet.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_typeProjet__c'});
        var opts2 = [];
        actionTypeProjet.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesTP = response.getReturnValue();
 
                if (allValuesTP != undefined && allValuesTP.length > 0) {
                    var none="---None---";
                    opts2.push(none);
                }
                for (var i = 0; i < allValuesTP.length; i++) {
                    opts2.push(allValuesTP[i]);
                }
                component.set('v.allTypeProjet', opts2);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionStatus = component.get('c.getSelectOptions');
        actionStatus.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_statusAssessment__c'});
        var opts3 = [];
        actionStatus.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesStatus = response.getReturnValue();
 
                for (var i = 0; i < allValuesStatus.length; i++) {
                    opts3.push(allValuesStatus[i]);
                }
                component.set('v.allStatus', opts3);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionCurrency = component.get('c.getSelectOptions');
        actionCurrency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_currency__c'});
        var opts4 = [];
        actionCurrency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesCurrency = response.getReturnValue();
 
                
                for (var i = 0; i < allValuesCurrency.length; i++) {
                    opts4.push(allValuesCurrency[i]);
                }
                component.set('v.allCurrency', opts4);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionSchedule = component.get('c.getSelectOptions');
        actionSchedule.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_schedule__c'});
        var opts5 = [];
        actionSchedule.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesSchedule = response.getReturnValue();
 
                
                for (var i = 0; i < allValuesSchedule.length; i++) {
                    opts5.push(allValuesSchedule[i]);
                }
                component.set('v.allSchedule', opts5);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionSector = component.get("c.getSelectOptions");
        actionSector.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_clientIndustrySector__c'});
        actionSector.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allIndustrySector', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionUser = component.get("c.getUsers");
        actionUser.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allUser', response.getReturnValue());
                //Hide the Spinner
                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	            evtSpinner.fire();  
	    
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionTypeAssessment);
        $A.enqueueAction(actionOrgs);
        $A.enqueueAction(actionTypeProjet);
        $A.enqueueAction(actionStatus);
        $A.enqueueAction(actionCurrency);
        $A.enqueueAction(actionSchedule);
        $A.enqueueAction(actionSector);
        $A.enqueueAction(actionUser);
	},
   
    verifTypeAssessment  : function(component, event, helper, typeAssessment) {
    if(typeAssessment == 'Organisation'){
      component.set("v.typeOrganisation", true);
      component.set("v.typeProcessus", false);
      component.set("v.typeProjet", false);
    }
    if(typeAssessment == 'Processus'){
      component.set("v.typeOrganisation", false);
      component.set("v.typeProcessus", true);
      component.set("v.typeProjet", false);
    }
    if(typeAssessment == 'Projet'){
      component.set("v.typeOrganisation", false);
      component.set("v.typeProcessus", false);
      component.set("v.typeProjet", true);
    }
   },
    
    
})