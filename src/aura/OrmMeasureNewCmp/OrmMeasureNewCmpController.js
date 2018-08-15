({
	openOrmMeasureNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
	},
	
	createItem : function(component, event, helper) {
	   component.set('v.measure', 
             { 'sobjectType' : 'Assessment__c',
               'Name' : '',
               'orm_description__c' : '',
              });
	},
	
	closeModal : function(component, event, helper) {
	    component.set("v.isOpen", false);
	},
})