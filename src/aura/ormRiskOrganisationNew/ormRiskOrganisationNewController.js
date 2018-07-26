({
 /**
 * Create new Risk in the Unit
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description Create new Risk in the Unit
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */
	    saveRisk:function(component, event, helper) {
        var nomfield=component.find("riskid");
       var nom =nomfield.get("v.value");
           var isItemValid = true;
        if ($A.util.isEmpty(nom)) {
            isItemValid = false;
         
        } 
        if (isItemValid) {
            //var idAssessment=component.get("v.assessmentData").Id;
          var  idAssessment="a051H00000aQvjWQAS";
            var newRisk = component.get("v.item");
				      newRisk.Name=nom;
            			newRisk.orm_assessment__c= idAssessment;
            var action = component.get('c.add');
            action.setParams({
                "item": newRisk
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state == "SUCCESS") {
                    // publier evenement creation
                    var evt = $A.get("e.c:evntAddRiskOrg");
                            evt.fire();
                    component.set("v.item",{
                        'sobjectType':'Macro',
                        'Name':'',
                        'orm_assessment__c':''
                    });
                }
            });
            $A.enqueueAction(action);
	alert("ajout réussie");
        } else {
            alert("ajout échouée");
        }
        },
})