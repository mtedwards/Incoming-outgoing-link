$('document').ready(function(){
  var url = window.location.href;
  
  var substr = url.split('?');
  var utm = substr[1];
  
  if(utm) {
    var sub_utm = utm.split('&');
    
    for (var i = 0; i < sub_utm.length; i++) {
           
      if(sub_utm[i].search('source') > -1){
        var source = sub_utm[i];
      }
      
      if(sub_utm[i].search('campaign') > -1){
        var campaign = sub_utm[i];
      }
    }
    
    var source = source.split('=');
    var source = source[1];
    
    var campaign = campaign.split('=');
    var campaign = campaign[1];
    
    var cfc = '?camefrom=CFC_AU_NTS_BMG_' + source + '_' + campaign;
    
    $.cookie('cfc', cfc, { expires: 7, path: '/' });
  }

  var stored_cfc = $.cookie('cfc');

  if(stored_cfc) {  
      var tm_links = $('a[href*="ticketmaster"]');
      
      for (var j = 0; j < tm_links.length; j++) {
        link = tm_links[j];
        new_link = $(link).attr('href');
        new_link = new_link.split('?');
        new_link = new_link[0];
        new_link = new_link + stored_cfc;
        $(link).attr('href',new_link);
      }
    }
  
});

