           
(function() {

    $("#p_course_content").live('pagebeforeshow', function() {
       
                
        var contents = "";
        var cm = sessionStorage.getItem('current_cmid');
        
        if(cm !== null){
            
            cm = JSON.parse(cm);
                                   
            $("#modulename").html(cm.name);
                        
            if(cm.contents.length > 0){
                $.each(cm.contents, function(index,content){
                    var status = (index == 0)? 'data-collapsed="false"' : ''
                    contents += '<div data-role="collapsible" '+status+'>';
                    contents += ' <h3>İçerik '+(index+1)+'</h3><p>';
                    
                    if(content.filename){
                        contents += ' <p><b>Dosya Adı:</b> </p>';
                        contents += ' <div class="whiteroundtable">'+content.filename+'</div>';
                        contents += ' </p>';
                    }
                    
                    if(content.author){
                        contents += ' <p><b>Sahibi:</b> '+content.author+'</p>';
                    }
                    
                    if(content.content){
                        contents += ' <p><b>İçerik Bilgisi:</b> </p>';
                        contents += ' <div class="whiteroundtable">'+content.content+'</div>';
                        contents += ' </p>';
                    }
                    
                    if(content.license){
                        contents += ' <p><b>Lisans Bilgisi:</b> '+content.license+'</p>';
                    }
                    
                    var token = '&token=' + localStorage.getItem("moodle_token");
					
                    
                    contents += '<a href="#" data-slow="'+content.fileurl+token+'" rel="external" target="_blank" data-role="button">İçerigi Görüntüle</a>';
                    contents += '</p></div>';
                    
                });
            }
            
            
            contents += '<a href="#" data-slow="'+cm.url+'" data-role="button" rel="external" target="_blank">Aktiviteyi Moodle İçinde Göster</a>';
            
            $("#mcontents").html(contents);
            
            // This is an uggly bug:
            // if an external link is open in a mobile browser when the link button effects ends the browser app is sent to background and umm is sent to foreground
            // This is (I suppose) because the mobile detects some activity in the umm app            
            
            // Putting a # in href prevents animations so we inter-change href with data-slow attr
            $("[data-slow]").click(function(event){
                $(this).attr('href',$(this).attr('data-slow'));
            });
            
            //$("#mcontents").page();
            //$('[data-role="content"]').page();
            $('[data-role="button"]').buttonMarkup();
            $('[data-role="collapsible"]').collapsible();
        }
        else{
            $.mobile.changePage("course_content.html");
        }
  
            
    });
    
})();