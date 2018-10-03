({


    getSelectedItem: function(component, event) {

        var index = event.target.dataset.index;
        var items = component.get("v.items");
        var selectedItem = items[index];

        return selectedItem;
    },



    /**
     * @author: Salimata NGOM
     * @date: Creation: 31/08/2018
     * @description: method for refresh the list file 
     *               
     */
    refreshList: function(component, event) {
        console.log('parentId' + component.get('v.parentId'));
        var action = component.get("c.findAllContentDocumentByParentId");
        action.setParams({
            'parentId': component.get('v.parentId')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                console.log(JSON.stringify(response.getReturnValue()))
                    // component.set("v.items", response.getReturnValue());
                    // component.set("v.itemsTemp", response.getReturnValue());

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
            } else if (state === "ERROR") {
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                // Display the message
                console.error(message);
            }
        });
        $A.enqueueAction(action);
    },
    deleteSelectedHelper: function(component, event, deleteRecordsIds) {
        //call apex class method
        var action = component.get('c.DeleteAttachment');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "att": deleteRecordsIds
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(state);
                if (response.getReturnValue() != '') {
                    // if getting any error while delete the records , then display a alert msg/
                    console.log('The following error has occurred. while Delete record-->' + response.getReturnValue());
                } else {
                    console.log('check it--> delete successful');
                }
                component.set("v.showConfirmRemoveAttachment", false);
                // call the onLoad function for refresh the List view    
                this.refreshList(component, event);
            }
        });
        $A.enqueueAction(action);
    },
})