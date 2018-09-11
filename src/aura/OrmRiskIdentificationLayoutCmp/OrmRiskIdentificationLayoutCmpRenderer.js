({
   
	afterRender: function (component, helper) {
      this.superAfterRender();
        
        var el = document.getElementsByClassName('descriptionToolTip');
        console.log(el)
    }
})