({
	afterRender: function (component, helper) {
      this.superAfterRender();
         /*document.getElementById("MODERATE").style.display = "none";
         document.getElementById("SEVERE").style.display = "none";
         document.getElementById("MINOR").style.display = "none";
         document.getElementById("MAJOR").style.display = "none";*/ 
         document.getElementById("infoMatrice").style.display = "none";
         console.log('***in afterRender***')
         
    },
    
    rerender : function(component, helper){
	    this.superRerender();
	    console.log('ok reRender***')
	    if(component.get("v.hs11bool")){
	        console.log('***oups***');
	        
	        for (var i = 0; i < component.get("v.listIDHS11").length; i++) {
                var idSafety = component.get("v.listIDHS11")[i]+'HS';
                console.log('****idSafety*** : '+idSafety);
                //console.log(document.getElementById(idSafety));
                //document.getElementById( idSafety ).style.backgroundColor = component.get("v.colorHS11")[0].component.get("v.listIDHS11")[i];
            }
	   }
	   
	   
	},
	
	
})
