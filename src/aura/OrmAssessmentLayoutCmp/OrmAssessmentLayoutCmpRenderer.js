({
   /**
	 * @author: Dibocor NGOM
	 * @date: Creation: 31/08/2018
	 * @description: This method allows user to back to top page without scrolling
	 *               
	*/
	afterRender: function (component, helper) {
      this.superAfterRender();
      
        window.onscroll = function() {
         if(component.get("v.showContext")){
	           if (document.documentElement.scrollTop > 20) {
		          document.getElementById("myBtn").style.display = "block";
			    } else {
			        document.getElementById("myBtn").style.display = "none";
			    }
          }
            
        };    
    }
})