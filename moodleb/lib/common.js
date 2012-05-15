
var connectionOn = true;

$(document).bind("mobileinit", function () {    
    $.mobile.allowCrossDomainPages = true;            
    $.support.cors = true; 
});


// Convert Ajax Data to Html Data
function xml2json(xml){

    var xmlDOM = $.parseXML(xml);
    
    function processMultiple($node){
        var jsondata = [];
        $node.children().each(function(index,el){
            jsondata.push(processSingle($(this)));
        });
        return jsondata;
    }

    function processSingle($node){
        var jsonnode = {};
        
        $node.children().each(function(index,el){            
            if($(this).children()[0].nodeName == 'VALUE'){
                jsonnode[$(this).attr('name')] = $($(this).children()[0]).text();
            }
            else{
                jsonnode[$(this).attr('name')] = processMultiple($($(this).children()[0]));
            }
        });
        return jsonnode;
    }
    
    var json;
    
    $xml = $(xmlDOM);
    $xml.find('RESPONSE').children().each(function(index, el){
        if(el.nodeName == 'MULTIPLE'){
            json = processMultiple($(this));
            return;
        }
        else if(el.nodeName == 'SINGLE'){
            json = processSingle($(this));
            return;            
        }
    });
    
    if($xml.find('EXCEPTION').children().length > 0){
	json = {};
        
	$xml.find('EXCEPTION').children().each(function(index, el){
	    if(el.nodeName == 'MESSAGE'){
		json.exception = 1;
		json.message = $(this).text();
		return;
	    }
	});
    }
    
    return json;
}

// Check Internet connection
function checkConnection(){
    
    var connected = true;
    
    if(typeof(navigator.network) != 'undefined'){
        networkState = navigator.network.connection.type;
        connected = (networkState != Connection.NONE && networkState != Connection.UNKNOWN);
        // logInfo("Internet connection checked "+connected);
    }
    else
	{
        // For logging info
    }
    
    return connected;
}

// Custom error popup
function popErrorMessage(errorMessage){
     $.mobile.hidePageLoadingMsg();
	 
	 
     $("<div class='ui-splash ui-overlay-shadow ui-body-e ui-corner-all'><h4>" + errorMessage  + "</h4></div>")
     .css({ "display": "block", "opacity": '0.96', "top": $(window).scrollTop() + 100 })
     .appendTo( $.mobile.pageContainer )
     .delay( 1100 )
     .fadeOut( 600, function(){
        $(this).remove();
     });
    // Logging code
}
 
function popMessage(Message){
     $.mobile.hidePageLoadingMsg();
     $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h4>" + Message  + "</h4></div>")
     .css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
     .appendTo( $.mobile.pageContainer )
     .delay( 1100 )
     .fadeOut( 600, function(){
        $(this).remove();
     }); 
	  // Logging code
 }
 
 function getSiteInfo(token, callback)
		{
			
			var ajaxData = {};
			var url = localStorage.getItem("site_url") + '/webservice/rest/server.php?wstoken=' + token;
				
			ajaxData.wsfunction = 'moodle_webservice_get_siteinfo';
					
			
			$.ajax({
			  type: "POST",
			  url: url,
			  data: ajaxData,
			  dataType: 'text',
			  xhrFields: {
				withCredentials: false
			  },
			  dataFilter: function(data, dataType){
				// XML returned by Moodle is not well parsed
				data = data.replace(/\<VALUE\>/gi,'<VALUE><![CDATA[').replace(/\<\/VALUE\>/gi,']]></VALUE>');
				data = data.replace(/\<MESSAGE\>/gi,'<MESSAGE><![CDATA[').replace(/\<\/MESSAGE\>/gi,']]></MESSAGE>');
				return data;
			  },
			  success: function(data){
				 data = xml2json(data);
				 // Test Data
				if(typeof(data.debuginfo) != "undefined"){
					 popErrorMessage('Unexpected error. Please close and open again the application');
					return;
				}
				if(typeof(data.exception) != "undefined"){
					 popErrorMessage('Error. '+ data.message);
					return;
			   }	
			   		// Return data to callback function
					callback(data);
			  }	
			});		
		}	  

function getCourses(token, userid, callback)
		{
			
			$.mobile.showPageLoadingMsg();
			
			var ajaxData = {};
			var url = localStorage.getItem("site_url") + '/webservice/rest/server.php?wstoken=' + token;
				
			ajaxData.wsfunction = 'moodle_enrol_get_users_courses';
			ajaxData.userid = userid;
					
			
			$.ajax({
			  type: "POST",
			  url: url,
			  data: ajaxData,
			  dataType: 'text',
			  xhrFields: {
				withCredentials: false
			  },
			  dataFilter: function(data, dataType){
				// XML returned by Moodle is not well parsed
				data = data.replace(/\<VALUE\>/gi,'<VALUE><![CDATA[').replace(/\<\/VALUE\>/gi,']]></VALUE>');
				data = data.replace(/\<MESSAGE\>/gi,'<MESSAGE><![CDATA[').replace(/\<\/MESSAGE\>/gi,']]></MESSAGE>');
				return data;
			  },
			  success: function(data){
				 data = xml2json(data);
				 // Test Data
				if(typeof(data.debuginfo) != "undefined"){
					 popErrorMessage('Unexpected error. Please close and open again the application');
					return;
				}
				if(typeof(data.exception) != "undefined"){
					 popErrorMessage('Error. '+ data.message);
					return;
			   }	
			   		// Return data to callback function
					callback(data);
					
					$.mobile.hidePageLoadingMsg();
			  }	
			});		
}

function getCourseContents(token, courseid, callback)
{
			
			$.mobile.showPageLoadingMsg();
			 
			var url = localStorage.getItem("site_url") + '/webservice/rest/server.php?wstoken=' + token;
			
			var ajaxData =     
        	 {
            	"options[0][name]" : "",
            	"options[0][value]" : ""
        	};
				
			ajaxData.wsfunction = 'core_course_get_contents';
			ajaxData.courseid = courseid;
						
			
			$.ajax({
			  type: "POST",
			  url: url,
			  data: ajaxData,
			  dataType: 'text',
			  xhrFields: {
				withCredentials: false
			  },
			  dataFilter: function(data, dataType){
				// XML returned by Moodle is not well parsed
				data = data.replace(/\<VALUE\>/gi,'<VALUE><![CDATA[').replace(/\<\/VALUE\>/gi,']]></VALUE>');
				data = data.replace(/\<MESSAGE\>/gi,'<MESSAGE><![CDATA[').replace(/\<\/MESSAGE\>/gi,']]></MESSAGE>');
				return data;
			  },
			  success: function(data){
				 data = xml2json(data);
				 // Test Data
				if(typeof(data.debuginfo) != "undefined"){
					 popErrorMessage('Unexpected error. Please close and open again the application');
					return;
				}
				if(typeof(data.exception) != "undefined"){
					 popErrorMessage('Error. '+ data.message);
					return;
			   }	
			   		// Return data to callback function
					callback(data);
					
					$.mobile.hidePageLoadingMsg();
					
			  }	
			});		
}
 
 

