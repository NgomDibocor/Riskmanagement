({
	afterRender: function (component, helper) {
      this.superAfterRender();
        
        // this is done in renderer because we don't get
        // access to the window element in the helper js.

        // per John Resig, we should not take action on every scroll event
        // as that has poor performance but rather we should take action periodically.
        // http://ejohn.org/blog/learning-from-twitter/

       
        window.onscroll = function() {
           helper.scrollFunction(component);
        };    
    }
})