({
	doInit : function(component, event, helper) {
		
	},
	
	openMODERATE : function(component, event, helper) {
	  document.getElementById("MODERATE").style.display = "block";
	},
	
	closeMODERATE : function(component, event, helper) {
	  document.getElementById("MODERATE").style.display = "none";
	},
	
	openSEVERE : function(component, event, helper) {
	  document.getElementById("SEVERE").style.display = "block";
	},
	
	closeSEVERE : function(component, event, helper) {
	  document.getElementById("SEVERE").style.display = "none";
	},
	
	openMINOR : function(component, event, helper) {
	  document.getElementById("MINOR").style.display = "block";
	},
	
	closeMINOR : function(component, event, helper) {
	  document.getElementById("MINOR").style.display = "none";
	},
	
	openMAJOR : function(component, event, helper) {
	  document.getElementById("MAJOR").style.display = "block";
	},
	
	closeMAJOR : function(component, event, helper) {
	  document.getElementById("MAJOR").style.display = "none";
	},
})