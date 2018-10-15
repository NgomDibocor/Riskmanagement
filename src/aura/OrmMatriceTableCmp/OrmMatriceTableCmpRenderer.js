({
	afterRender: function (component, helper) {
      this.superAfterRender();
         document.getElementById("MODERATE").style.display = "none";
         document.getElementById("SEVERE").style.display = "none";
         document.getElementById("MINOR").style.display = "none";
         document.getElementById("MAJOR").style.display = "none"; 
         document.getElementById("infoMatrice").style.display = "none";
    }
	
})
