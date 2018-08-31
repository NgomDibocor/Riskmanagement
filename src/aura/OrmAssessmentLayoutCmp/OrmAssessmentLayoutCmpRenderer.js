({
	afterRender: function (component, helper) {
      this.superAfterRender();
      
        window.onscroll = function() {
           helper.scrollFunction(component);
        };    
    }
})