jQuery(document).ready(function( $ ) {
  /*******************
  
  UTM - CFC System
  
  ******************/
  
  checkforUtm();
  
  if(document.getElementById("ticketsPage")) {
    checkforCookie();  
  }

  /* 
   *  Check for the UTM
   *
   *  if it exists, store it in a cookie called utm. 
   *  The cookie lasts for 1 week.
   */

  function checkforUtm() {
      var source = null;
          source = getParameterByName('utm_source');

      if(source != null) {
        url = window.location;
        $.cookie('utm', url, { expires: 7, path: '/' });
      }
  };
  
  
  /* 
   *  Check for the UTM Cookie
   *
   *  if the Cookie exists we will do some things with it.
   *  Including call the updateTicketLinks function
   */
   
   function checkforCookie() {
     var utmCookie = null;
         utmCookie = $.cookie('utm');
         if(utmCookie != null) {
          var source = new RegExp('[\?&]utm_source=([^&#]*)').exec(utmCookie);
          source = source[1];
          
          var campaign = new RegExp('[\?&]utm_campaign=([^&#]*)').exec(utmCookie);
          campaign = campaign[1];
          
          updateTicketsLinks(source, campaign);
          
          
      };
   };
   
   
   /*
    * Get Ticket links and run through them 
    */

    function updateTicketsLinks(source, campaign) {
      $('a.ticketsLink').each(function(){
      
        var newUTM = 'utm_source='+source+'&utm_medium=acmn&utm_campaign='+campaign;
        
        baseUrl = this.href;
        
        if(baseUrl.indexOf("?") > -1) {
                
            if(baseUrl.indexOf("ticketmaster") > -1) {
              
              /* ticketmaster */
              url = baseUrl+'_'+source+'_'+campaign;
            
            } else {
              
              /* Not Ticketmaster */
            
              if(baseUrl.indexOf("?utm") > -1) {
                
                var url = baseUrl.split("?");
                url = url[0];
                url = url + '?' + newUTM;
                
              } else {
                
                var url = baseUrl.split("&utm_source");
                url = url[0];
                url = url + '&' + newUTM;
              };
              
            };
            
          } else {
  
          var url = baseUrl.split("?");
          url = url[0];
          url = url + '?' + newUTM;
                
        };
        
        $(this).attr('href',url);
        
      });
    };
   
    
  /*
   * Helper Function - to get the parameter from the URL 
   */
  
  function getParameterByName(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
      return null;
    } else {
      return results[1] || 0;
    }	
  };

	
});
