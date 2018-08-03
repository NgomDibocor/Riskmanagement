({
	 requiredValidation : function(component,event) {
        // get all workshop	
        var allRecords = component.get("v.WorkshopList");
        var isValid = true;
        // play a for loop on all workshop list and check that workshop title is not null,   
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
})