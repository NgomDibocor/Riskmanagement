({
    fetchPicklist: function(component, event, idAsssessmentRisk) {
        this.getHsseImpacts(component, event);
        console.log(component.get("v.assessmentData").Id);
        var actionFrequency = component.get("c.getSelectOptions");
        actionFrequency.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_frequency__c'
        });
        actionFrequency.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.frequency', response.getReturnValue());
                //manageAbility
                var actionmanageAbility = component.get("c.getSelectOptions");
                actionmanageAbility.setParams({
                    "objObject": component.get("v.objInfo"),
                    "fld": 'orm_manageability__c'
                });
                actionmanageAbility.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        component.set('v.manageAbility', response.getReturnValue());
                        //productionLoss
                        var actionproductionLoss = component.get("c.getSelectOptions");
                        actionproductionLoss.setParams({
                            "objObject": component.get("v.objInfo"),
                            "fld": 'orm_productionLoss__c'
                        });
                        actionproductionLoss.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === 'SUCCESS') {
                                component.set('v.productionLoss', response.getReturnValue());

                                //schedule
                                var actionschedule = component.get("c.getSelectOptions");
                                actionschedule.setParams({
                                    "objObject": component.get("v.objInfo"),
                                    "fld": 'orm_schedule__c'
                                });
                                actionschedule.setCallback(this, function(response) {
                                    var state = response.getState();
                                    if (state === 'SUCCESS') {
                                        component.set('v.schedule', response.getReturnValue());

                                        //status
                                        var actionstatus = component.get("c.getSelectOptions");
                                        actionstatus.setParams({
                                            "objObject": component.get("v.objInfo"),
                                            "fld": 'orm_status__c'
                                        });
                                        actionstatus.setCallback(this, function(response) {
                                            var state = response.getState();
                                            if (state === 'SUCCESS') {
                                                component.set('v.status', response.getReturnValue());

                                                //vulnerability
                                                var actionvulnerability = component.get("c.getSelectOptions");
                                                actionvulnerability.setParams({
                                                    "objObject": component.get("v.objInfo"),
                                                    "fld": 'orm_vulnerability__c'
                                                });
                                                actionvulnerability.setCallback(this, function(response) {
                                                    var state = response.getState();
                                                    if (state === 'SUCCESS') {
                                                        component.set('v.vulnerability', response.getReturnValue());
                                                        //
                                                        var actionOrgs = component.get("c.findAssessmentRisk");
                                                        actionOrgs.setParams({
                                                            "item": idAsssessmentRisk
                                                        });
                                                        // component.set("v.categorieRisk", item);
                                                        actionOrgs.setCallback(this, function(response) {
                                                            var state = response.getState();
                                                            if (state === 'SUCCESS') {
                                                                component.set('v.assessmentRiskData', response.getReturnValue());
                                                                component.find("manageAbility").set("v.value", component.get('v.assessmentRiskData').orm_manageability__c);
                                                                component.find("frequency").set("v.value", component.get('v.assessmentRiskData').orm_frequency__c);
                                                                component.find("slider1").set("v.value", component.get('v.assessmentRiskData').orm_probability__c);
                                                                component.find("productionLoss").set("v.value", component.get('v.assessmentRiskData').orm_productionLoss__c);
                                                                component.find("schedule").set("v.value", component.get('v.assessmentRiskData').orm_schedule__c);
                                                                component.find("status").set("v.value", component.get('v.assessmentRiskData').orm_status__c);
                                                                component.find("vulnerability").set("v.value", component.get('v.assessmentRiskData').orm_vulnerability__c);
                                                                var sliderValue = component.get("v.assessmentRiskData").orm_probability__c;
                                                                if (sliderValue >= component.get("v.RareData.orm_pourcentageMin__c") && sliderValue <= component.get("v.RareData.orm_pourcentageMax__c")) {
                                                                    document.getElementById("divColor").style.backgroundColor = "green";
                                                                    document.getElementById("divColor").innerHTML = component.get("v.RareData.orm_probability__c") + '(' + sliderValue +')';
                                                                } else if (sliderValue > component.get("v.unlikelyData.orm_pourcentageMin__c") && sliderValue <= component.get("v.unlikelyData.orm_pourcentageMax__c")) {
                                                                    document.getElementById("divColor").style.backgroundColor = "yellow";
                                                                    document.getElementById("divColor").innerHTML = component.get("v.unlikelyData.orm_probability__c")+ '(' + sliderValue +')';
                                                                } else if (sliderValue > component.get("v.possibleData.orm_pourcentageMin__c") && sliderValue <= component.get("v.possibleData.orm_pourcentageMax__c")) {
                                                                    document.getElementById("divColor").style.backgroundColor = "orange";
                                                                    document.getElementById("divColor").innerHTML = component.get("v.possibleData.orm_probability__c")+ '(' + sliderValue +')';
                                                                } else {
                                                                    document.getElementById("divColor").style.backgroundColor = "red";
                                                                    document.getElementById("divColor").innerHTML = component.get("v.probableData.orm_probability__c")+ '(' + sliderValue +')';
                                                                }

                                                                	this.getSliderDefault(component, event);
                                                                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                                                                evtSpinner.fire();
                                                            } else {

                                                                alert($A.get("$Label.c.orm_not_found"));
                                                            }
                                                        });
                                                        $A.enqueueAction(actionOrgs);

                                                    } else {
                                                        alert($A.get("$Label.c.orm_not_found"));
                                                    }
                                                });
                                                $A.enqueueAction(actionvulnerability);

                                            } else {
                                                alert($A.get("$Label.c.orm_not_found"));
                                            }
                                        });
                                        $A.enqueueAction(actionstatus);

                                    } else {
                                        alert($A.get("$Label.c.orm_not_found"));
                                    }
                                });
                                $A.enqueueAction(actionschedule);
                            } else {
                                alert($A.get("$Label.c.orm_not_found"));
                            }
                        });
                        $A.enqueueAction(actionproductionLoss);

                    } else {
                        alert($A.get("$Label.c.orm_not_found"));
                    }
                });
                $A.enqueueAction(actionmanageAbility);

            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionFrequency);
    },

    getProbality: function(component, event) {
        var action = component.get('c.findAllProbabilitiesByAssessment');
        action.setParams({
            "assessment": component.get("v.assessmentData").Id
        });
        action.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS') {

                component.set("v.probabilities", response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
                if (component.get("v.probabilities").length > 0) {

                    for (var i = 0; i < component.get("v.probabilities").length; i++) {
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Probable') {
                            component.set("v.probableData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Possible') {
                            component.set("v.possibleData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Unlikely') {
                            component.set("v.unlikelyData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Rare') {
                            component.set("v.RareData", component.get("v.probabilities")[i]);
                        }
                    }
                }
            } else {
                alert("ERROR")
            }
        });
        $A.enqueueAction(action);
    },
    getHsseImpacts: function(component, event, helper) {
        var action = component.get('c.findHsseImpactsByAssessment');
        action.setParams({
            "assessment": component.get("v.assessmentData").Id
        });
        action.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS') {

                component.set("v.hsseImpacts", response.getReturnValue());
                if (component.get("v.hsseImpacts").length > 0) {

                    for (var i = 0; i < component.get("v.hsseImpacts").length; i++) {
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'VeryHigh') {
                            component.set("v.hsseVeryHighData", component.get("v.hsseImpacts")[i]);

                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'High') {
                            component.set("v.hsseHighData", component.get("v.hsseImpacts")[i]);
                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'Medium') {
                            component.set("v.hsseMediumData", component.get("v.hsseImpacts")[i]);
                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'Low') {
                            component.set("v.hsseLowData", component.get("v.hsseImpacts")[i]);
                        }
                    }
                }
            } else {
                alert("ERROR getHsseImpacts")
            }
        });
        $A.enqueueAction(action);
    },
    getSliderDefault: function(component, event, helper) {

        var r0 = component.find("r0").get("v.value");
        var r1 = component.find("r1").get("v.value");
        var r2 = component.find("r2").get("v.value");
        var r3 = component.find("r3").get("v.value");
        
        var rr0 = component.find("rr0").get("v.value");
        var rr1 = component.find("rr1").get("v.value");
        var rr2 = component.find("rr2").get("v.value");
        var rr3 = component.find("rr3").get("v.value");
        
        var rrr0 = component.find("rrr0").get("v.value");
        var rrr1 = component.find("rrr1").get("v.value");
        var rrr2 = component.find("rrr2").get("v.value");
        var rrr3 = component.find("rrr3").get("v.value");
        
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r0) {
            document.getElementById('healthAndSafety').style.backgroundColor = "red";
            document.getElementById('healthAndSafety').innerHTML = 'very high'; 
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r1) {
            document.getElementById('healthAndSafety').style.backgroundColor = "orange";
            document.getElementById("healthAndSafety").innerHTML = 'high';
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r2) {
            document.getElementById('healthAndSafety').style.backgroundColor = "yellow";
            document.getElementById("healthAndSafety").innerHTML = 'Medium';
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r3) {
            document.getElementById('healthAndSafety').style.backgroundColor = "green";
            document.getElementById("healthAndSafety").innerHTML = 'Low';
        }
         if(component.get('v.assessmentRiskData').orm_security__c  == rr0){
			 document.getElementById('security').style.backgroundColor = "red";
			 document.getElementById("security").innerHTML= 'very high';
		 } 
		 
		 if (component.get('v.assessmentRiskData').orm_security__c == rr1){
			 document.getElementById('security').style.backgroundColor = "orange";
			 document.getElementById("security").innerHTML= 'high';
		 }
		 
		  if (component.get('v.assessmentRiskData').orm_security__c == rr2 ){
			  document.getElementById('security').style.backgroundColor = "yellow";
			  document.getElementById("security").innerHTML= 'Medium';
		 }
		 
		 if(component.get('v.assessmentRiskData').orm_security__c == rr3 ){
			  document.getElementById('security').style.backgroundColor = "green";
			  document.getElementById("security").innerHTML= 'Low';
		 }
		 
		 if(component.get('v.assessmentRiskData').orm_environmentAndCommunity__c  == rrr0){
			 document.getElementById('environment').style.backgroundColor = "red";
			 document.getElementById("environment").innerHTML= 'very high';
		 } 
		 
		 if (component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr1 ){
			 document.getElementById('environment').style.backgroundColor = "orange";
			 document.getElementById("environment").innerHTML= 'high';
		 }
		 
		 if (component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr2){
			 document.getElementById('environment').style.backgroundColor = "yellow";
			 document.getElementById("environment").innerHTML= 'Medium';
		 }
		 if(component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr3){
			  document.getElementById('environment').style.backgroundColor = "green";
			  document.getElementById("environment").innerHTML= 'Low';
		 }
    }

})