

$(function() {

    // Use setTimeout to close the modal in 5 seconds (5000 milliseconds).
    chrome.storage.sync.get(["collect_title"],function(item){
        $("#collection_info").text(item.collect_title);
    }); 
  
});

$(function(){

    $("#close_button_created").click(function(){
        window.close(); //Popup.html로 이동
    });
  
});


$(document).on('keypress', function(e){
    if(e.keyCode == '13'){
      $('#open-keepit').click();
    }
});
  


$(document).on('keypress', function(e){
    if(e.keyCode == '27'){
      $('#close_button_created').click();
    }
});
  


$(function(){
    $("#open-keepit").click(function(){

        chrome.storage.sync.get(["collection_uuid"],function(item){
            chrome.tabs.create({url: "https://www.keepit.site/collections/"+item.collection_uuid});      
        }); 

    });

});


