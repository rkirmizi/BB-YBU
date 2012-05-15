// JavaScript Document
(function() {
		  
	function listCourses(data)
		{
					$('#lmycourses li').remove();
           			$.each(data, function(index,course)
					{
                		$("#lmycourses").append('<li><a id="course'+course.id+'" data-courseid="'+course.id+'">'+course.fullname+'<p>'+course.shortname+'</p></a></li>');
                		$("#course"+course.id).click(function()
						{                        
                    		localStorage.setItem("current_course",$(this).attr('data-courseid'));
                    		$.mobile.changePage("course_contents.html");
                		});
            	});            
            $('#lmycourses').listview('refresh'); 	
		}
		  
		    
    $("#p_course_list").live('pageshow',function() {
		
		
		         
        var token = localStorage.getItem("moodle_token");
		var userid =  localStorage.getItem("user_id");
		
                                
        if(token)
		{                
        	getCourses(token, userid, listCourses);
        }
        else
		{
			// Token is invalid, goto login page
            $.mobile.changePage("index.html", { reload: "true"});
        }
		
		
        
    });
    
})();