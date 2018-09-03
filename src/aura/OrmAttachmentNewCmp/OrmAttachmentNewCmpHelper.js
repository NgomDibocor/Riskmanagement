({
//initialize value MAX_FILE_SIZE 
	MAX_FILE_SIZE : 750000,
	
	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for save the file
	 *               
	 */
	save : function(component, event) {
		// start/show the loading spinner
		component.set("v.showLoadingSpinner", true);
		// get the selected files using aura:id [return array of files]
		var fileInput = component.find("file").get("v.files");
		// get the first file using array index[0]
		var file = fileInput[0];
		var self = this;
		// check the selected file size, if select file size greter then
		// MAX_FILE_SIZE,
		// then show a alert msg to user,hide the loading spinner and return
		// from function
		if (file.size > self.MAX_FILE_SIZE) {
			component.set("v.showLoadingSpinner", false);
			component.set("v.fileName", 'Alert : File size cannot exceed '
					+ self.MAX_FILE_SIZE + ' bytes.\n'
					+ ' Selected file size: ' + file.size);
			return;
		}

		var fr = new FileReader();

		var self = this;
		fr.onload = function() {
			var fileContents = fr.result;
			var base64Mark = 'base64,';
			var dataStart = fileContents.indexOf(base64Mark)
					+ base64Mark.length;

			fileContents = fileContents.substring(dataStart);

			self.upload(component, file, fileContents, event);

		};

		fr.readAsDataURL(file);
	},
	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for upload the file in server
	 *               
	 */
	upload : function(component, file, fileContents, event) {
		var action = component.get("c.saveTheFiles");
		action.setParams({
			parentId : component.get("v.parentId"),
			fileName : file.name,
			base64Data : fileContents,
			contentType : file.type
		});

		action.setCallback(this, function(response) {
			attachId = response.getReturnValue();
			console.log(attachId);
			if (response.getState() == 'SUCCESS') {
				var evt = $A.get("e.c:OrmNewFileUploadCreatedEvent");
				evt.fire();
				component.set("v.isOpenfileUploadNewCmp", false);

			} else if(state ==="ERROR") {
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

		$A.run(function() {
			$A.enqueueAction(action);
		});

	}
})