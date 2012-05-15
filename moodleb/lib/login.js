(function() {


// Get and save token for sessioning
function getToken(address, username, password, service)
{
	var token;
	
	$.mobile.showPageLoadingMsg();
	$.getJSON(address+'/login/token.php?username='+username+'&password='+password+'&service='+service, 
			  function(JSON){
				
					if(typeof(JSON.token) != 'undefined'){   
						
						// Get Token
						token = JSON.token;
						
						// Token is OK, save token and call moodle.html
						if (typeof(localStorage) == 'undefined' ) {
								popErrorMessage('Token save error');
						} 
						else 
						{
							// Save token for future use
							localStorage.setItem("moodle_token", token);
							localStorage.setItem("site_url", address);
							
							$.mobile.changePage( "moodle.html", { transition: "slideup"} );
							$.mobile.hidePageLoadingMsg();
						}	
					}				
					else
					{   
						// Get Token Error
						$.mobile.hidePageLoadingMsg();
                    	popErrorMessage("Login Error");
                	}

			}).error( 
				function() 
				{  	
					// Moodle host is not accessible
					$.mobile.hidePageLoadingMsg();
					popErrorMessage("Problem connecting to the Moodle site");
				}
			);

}

$("#pmain").live('pageshow',function() {  
    
    $("#bcancel").click(function(){   
		// popErrorMessage("Error");
		window.close();
    });
    
    $("#ipassword").keypress(function(e) {
        var c = e.which ? e.which : e.keyCode;
        if(c == 13) 
		{                    
            jQuery('#login').focus().click();
        }
    });
    
    // Saving new site configuration
    $("#login").click(function(){
        
        // Check if we are connected to Internet
        if(! connectionOn){
            popErrorMessage("Internet baðlantýsý aktif deðil");
            return;    
        }
        
        // Check for a correct URL
        var siteurl =  $.trim($("#isiteurl").val());
        var username = $.trim($("#iusername").val());
        var password = $.trim($("#ipassword").val());
      	var service = 'moodle_mobile_app';
        
        // Delete the last / if present
        if(siteurl.charAt(siteurl.length-1) == '/'){
            siteurl = siteurl.substring(0,siteurl.length-1);
        }
        
        var stop = false;
        var msg = "";
        
        if(siteurl.indexOf("http://localhost") == -1 && ! /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(siteurl)){                    
            msg += "Bad URL<br/>";
            stop = true;
        }

        if(!username){                    
            // TODO
            msg += "Missing username<br/>";
            stop = true;
        }
        if(!password){
            // TODO
            msg += "Missing password<br/>";
            stop = true;
        }
        
        if(stop){
            popErrorMessage(msg);
            return;
        }
		
		getToken(siteurl, username, password, service);							
          
    });
});    
    
})();
	