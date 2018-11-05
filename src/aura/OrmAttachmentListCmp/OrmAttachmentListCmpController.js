({
    doInit: function(component, event, helper) {
    	
    	component.set('v.columns', [{
            label: $A.get("$Label.c.orm_title_file"),
            fieldName: 'orm_title_document__c',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_author_file"),
            fieldName: 'orm_auteur__c',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_reference_number"),
            fieldName: 'orm_numeroDeReference__c',
            type: 'text'
        }, {
            type: 'button',
            initialWidth: 90,
            typeAttributes: {
                label: $A.get("$Label.c.orm_details_title"),
                name: $A.get("$Label.c.orm_details_title"),
                title: $A.get("$Label.c.orm_details_title")
            }
        }, {
            type: 'button',
            initialWidth: 90,
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title"),
                class: 'widthBtn'
            }
        }]);
        
        helper.refreshList(component, event);


    },
    /**
     * @author: Salimata NGOM
     * @date: Creation: 31/08/2018
     * @description: method for fire event and open form upload file attachment
     *               
     */
    showformfileUploadNew: function(component, event, helper) {
        //fire event OrmOpenAttachmentNewEvent
        var evt = $A.get("e.c:OrmOpenAttachmentNewEvent");
        evt.setParams({
            "parentId": component.get('v.parentId'),
            "isOpenfileUploadNewCmp": true
        });
        evt.fire();
    },
    /**
     * @author: Salimata NGOM
     * @date: Creation: 31/08/2018
     * @description: method for open attachment
     *               
     */
    openSingleFile: function(component, event, helper) {
        var eltselected = helper.getSelectedItem(component, event);

        var fireEvent = $A.get("e.lightning:openFiles");
        fireEvent.fire({
            recordIds: [eltselected.Id]
        });
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description search filter
     * @history 2018-09-07: Salimata NGOM - Implementation
     */
    filter: function(component, event, helper) {
        //var ListAttachment= component.get('v.itemsTemp');
        var ListAttachment = component.get('v.initialData');
        var data = ListAttachment;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refreshList(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");

                // filter checks each row, constructs new array where
                // function returns true
                data = ListAttachment.filter(row => regex.test(row.ContentVersions[0].orm_title_document__c)
                || regex.test(row.ContentVersions[0].orm_auteur__c) 
                || regex.test(row.ContentVersions[0].orm_auteur__c) 
                || regex.test(row.ContentVersions[0].orm_numeroDeReference__c)
                || regex.test(row.Title)  );
               
            } catch (e) {
                alert(e)
            }

            //component.set("v.items", data);
            component.set("v.filterPagination", data);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },

    sendDescriptionSearchToFD: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Attachment",
            "descriptionField": "Description"
        });
        evt.fire();
    },

    // For count the selected checkboxes. 
    checkboxSelect: function(component, event, helper) {
        // get the selected checkbox value  
        var selectedRec = event.getSource().get("v.value");
        // get the selectedCount attrbute value(default is 0) for add/less numbers. 
        var getSelectedNumber = component.get("v.selectedCount");
        // check, if selected checkbox value is true then increment getSelectedNumber with 1 
        // else Decrement the getSelectedNumber with 1     
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
        }
        // set the actual value on selectedCount attribute to show on header part. 
        component.set("v.selectedCount", getSelectedNumber);
    },

    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");
          console.log('selectedHeaderCheck'+selectedHeaderCheck);
        // get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
        // return the List of all checkboxs element 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array   
        if (!Array.isArray(getAllId)) {
            if (selectedHeaderCheck == true) {
                component.find("boxPack").set("v.value", true);
                component.set("v.selectedCount", 1);
            } else {
                component.find("boxPack").set("v.value", false);
                component.set("v.selectedCount", 0);
            }
        } else {
            // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
            // and set the all selected checkbox length in selectedCount attribute.
            // if value is false then make all checkboxes false in else part with play for loop 
            // and select count as 0 
            if (selectedHeaderCheck == true) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", true);
                    component.set("v.selectedCount", getAllId.length);
                }
            } else {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", false);
                    component.set("v.selectedCount", 0);
                }
            }
        }

    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-09-24 : Salimata NGOM - Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.showConfirmRemoveAttachment", false);
    },
    //For Delete selected records 
    removeAttachmentSelected: function(component, event, helper) {
        // create var for store record id's for selected checkboxes  
        var delId = [];
        // get all checkboxes 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if (!Array.isArray(getAllId)) {
            if (getAllId.get("v.value") == true) {
                delId.push(getAllId.get("v.text"));
            }
        } else {
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    delId.push(getAllId[i].get("v.text"));
                }
            }
        }

        // call the helper function and pass all selected record id's.    
        helper.deleteSelectedHelper(component, event, delId);

    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for show modal confirm delete attachment
     * @history 2018-09-24 : Salimata NGOM - Implementation
     */
    removeAttachment: function(component, event, helper) {
        // is checked delete assumption show popup message confirmation
        // get all checkboxes 
        //if not checked show toast warning
        var getSelectedNumber = component.get("v.selectedCount");
        if (getSelectedNumber == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {
            component.set("v.showConfirmRemoveAttachment", true);
        }
    }
})