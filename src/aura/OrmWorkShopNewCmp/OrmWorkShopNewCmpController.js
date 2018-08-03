({

    createWorkshop: function(component, event, helper) {
 
        var name = component.find("idtitre");
        var datestart = component.find('datestart');
        var dateend = component.find('dateend');
        var message =  component.find('message');
        var dateinvitation =  component.find('dateinvitation');
       
        var isItemValid = true;
        if ($A.util.isEmpty(name.get('v.value')) || $A.util.isEmpty(datestart.get('v.value')) || $A.util.isEmpty(dateend.get('v.value'))) {
            isItemValid = false;
            
        } 
       
        if (isItemValid) {
      
        // new item workshop
       
            var newItem = component.get("v.item");
           
           //newItem.orm_assessment__c = component.get('v.assessmentData').Id;
         newItem.orm_Assessment__c=  "a051H00000d94cDQAQ";
            newItem.Name=name.get('v.value');
            newItem.StartDate=datestart.get('v.value');
           newItem.orm_Contract_End_Date__c=dateend.get('v.value');
           newItem.CompanySignedDate=dateinvitation.get('v.value');
           newItem.Description=message.get('v.value');
           newItem.AccountId="0011H00001RnBahQAF";
           alert(JSON.stringify(newItem));
            var action = component.get('c.addWorkShop');
            action.setParams({
                "item": newItem
            });
               action
                .setCallback(
                    this,
                    function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS") {
                        alert('success');
                           // var evt = $A.get("e.c:OrmNewWorkShopEvt");
                         //   evt.fire();

                            component.set("v.item", {
                        'sobjectType' : 'Contract',
                        'Name': '',
                        'StartDate':'',
                        'orm_Contract_End_Date__c':'', 
                        'CompanySignedDate':'',
                        'orm_Assessment__c':'',
                        'AccountId':'',                               
						'Description':''
                            });
                        }else
                        {
                             alert('error');
                        }
                    });
            $A.enqueueAction(action);
           

        } else {
          //  alert("ajout échouée");
        }
       
    },
    openModalWorkshop : function(component, event){
        component.set("v.isOpen", true);
        component.set('v.assessmentData', event.getParam('Assessmentdata'));
	},
})