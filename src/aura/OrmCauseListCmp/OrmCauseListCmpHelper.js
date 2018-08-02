({
<<<<<<< HEAD
	requiredValidation : function(component,event) {
        // get all accounts.. 	
        var allRecords = component.get("v.causes");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length; i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
=======
	helperMethod : function() {
		
	}
>>>>>>> 9412e3e6064d1d71f5ef21e4484e4cbba4a7fd8e
})