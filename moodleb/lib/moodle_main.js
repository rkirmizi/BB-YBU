// JavaScript Document
(function() {
		  
	function viewSiteInfo(data)
				{
					$('#site_info').empty();
					$('#site_info').append('<h2>'+data.sitename+'</h2>');
					$('#site_info').append('<h4>'+data.siteurl+'</h4>');
					
					$('#user_info').empty();
					$('#user_info').append('<p><b>Kimlik:</b>'+data.userid+'</p>');
					$('#user_info').append('<p><b>Login:</b>'+data.username+'</p>');
					$('#user_info').append('<p><b>Ad:</b>'+data.firstname+'</p>');
					$('#user_info').append('<p><b>Soyad:</b>'+data.lastname+'</p>');
					
					$('#funct_info').empty();
					$.each(data.functions, function(index, funct){            
						$('#funct_info').append('<p>'+funct.name+'</p>');          
										
        			});
					
					
					localStorage.setItem("user_id", data.userid);
					
					/*
					$.each(data, function(key, val) {
							$('#site_info').append('<p>Key:'+key+', Value:'+val+ '</p>');
					});	
					*/
				}
		  
		  
    
    $("#page_moodle").live('pageshow',function() {
										 
				$("#bcancel").click(function(){   
					// popErrorMessage("Error");
					window.close();
				});
												 
				
                     
        var token = localStorage.getItem("moodle_token");
                                
        if(token)
		{                
        	getSiteInfo(token, viewSiteInfo);
        }
        else
		{
			// Token is invalid, goto login page
            $.mobile.changePage("index.html");
        }
        
    });
    
})();