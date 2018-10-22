({
    getAssessmentRiskId: function(component, event, helper) {
        component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        }]);
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.getCauses(component, component.get("v.idAssessmentRisk"));
    },
    onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    nexttt: function(component, event, helper) {
        helper.nexttt(component, event);
    },
    previoustt: function(component, event, helper) {
        helper.previoustt(component, event);
    },

    selectCauses: function(component, event, helper) {
    	var current = component.get("v.currentPage");
        var dTable = component.find("accountTable");
        var selectedRows = dTable.getSelectedRows();
        var pgName = "page" + current;
        component.get("v.SelectedAccount")[pgName] = selectedRows;
  
     },
    deleteCausesfunction: function(component, event, helper) {
       var myMap  = component.get("v.SelectedAccount");
        var idCauses = [];
        var lengthMap = Object.keys(myMap).length;
        	if(lengthMap== 0)
        	{
        		var toast = $A.get('e.force:showToast');
        		toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        	}
        	else{
        for(var i=0; i< lengthMap; i++){
            var page = 'page'+i;
            for(var j=0;j<myMap[page].length; j++){
                idCauses.push(myMap[page][j].Id);
            }
        }
       console.log("id Cause", idCauses);
       
		//call apex class method
		var action = component.get('c.deleteCauses');
		// pass the all selected record's Id's to apex method 
		action.setParams({
			"causeIds": idCauses
		});
		action.setCallback(this, function(response) {
			//store state of response
			var state = response.getState();
			if (state === "SUCCESS") {
				
				helper.getCauses(component, component.get("v.idAssessmentRisk"));
			}
		});
		$A.enqueueAction(action);
		}
	},
	
})
