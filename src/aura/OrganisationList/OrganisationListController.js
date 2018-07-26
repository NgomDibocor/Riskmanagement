({
	doInit: function (component, event, helper) {
       // Set the columns of the Table 
        var actions = [
            { iconName: 'utility:show',label: 'Show', name: 'show_details' },
            { iconName: 'utility:edit',label: 'Edit', name: 'edit' },
            { iconName: 'utility:delete',label: 'Delete', name: 'delete' }

        ];
        component.set('v.columns', [
            {label: 'Organisation Name', fieldName: 'Name', type: 'text', sortable : true},
            {label: 'Description', fieldName: 'Description', type: 'text', sortable : true},
            {label: 'Region', fieldName: 'orm_region__c', type: 'text', sortable : true},
            {label: 'TestOrg', fieldName: 'testOrganisationName', type: 'text', sortable : true},
            {label: 'Pays', fieldName: 'orm_pays__c', type: 'phone', sortable : true},
            {label: 'Actions',type:  'action',typeAttributes: { rowActions:actions } }
        ]);
        

            helper.doFetchContact(component);
    },
  
    getSelectedName: function (component, event) {
            var selectedRows = event.getParam('selectedRows');
            alert(JSON.stringify((selectedRows)))
            // Display that fieldName of the selected rows
            for (var i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].Name);
            }
    },
      handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details': 
                var evt = $A.get("e.c:navigateToOrganisationShow");
                evt.setParams({
                    "id" : row.Id
                });
                evt.fire();
                
                break;
            case 'edit':
                var evt = $A.get("e.c:navigateToOrganisationEdit");
                evt.setParams({
                    "id" : row.Id
                });
                evt.fire();
               
                break;
            case 'delete':
                var action = component.get('c.getOrganisation');    
                action.setParam('id', row.Id);
                action.setCallback(this, function(response){
                var state = response.getState();
                    if(state === 'SUCCESS'){
                        var item = response.getReturnValue();
                        alert(JSON.stringify(item));
                        helper.deleteOrg(component, item);
                    } else {
                        alert("l'Element n'a pas été retrouvé");
                    }
                });
                $A.enqueueAction(action);
            break;
           }
      }
})