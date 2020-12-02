/************************************************************ 
                          By Meng
               E-mail: bluebelsmudi @ gmail.com
*************************************************************/




var API_GET_URL ; //USER UUID를 가지고 Collection 정보를 API요청 할 URL



const token = localStorage.getItem("Token"); //localStorage에서 token 꺼내오기
//axios.defaults.headers.common = {'Access-Control-Allow-Headers': "Authorization,User-Agent"}; 
axios.defaults.headers.common = {'Authorization': `Token ${token}`}; //API 요청시 자동으로 HEADER Authorization에 Token 추가
axios.defaults.headers.common['x-keepit-extension-version'] = '2.9';
//Chrome storage에서 User uuid 를 가져와 API요청 할 URL 조합
chrome.storage.sync.get(["uuid"],function(item){
  API_GET_URL =  API_BASE_URL + '/api/users/' + item.uuid + '/collections';
}); 




$(function(){

  $("#close_button").click(function(){
    self.close();
  });

});


$(function(){

  $("#sign_out").click(function(){
    localStorage.removeItem("Token"); //localStorage에 Token지우기
    window.location.href="../html/login.html"; //Popup.html로 이동
  });

});




/*
  Popup.html을 틀었을 때, Login한 User의 Collection정보와 
  현재 Chrome Tab의 Url 과 Title 정보 자동 띄우기.
*/
$(function(){


    getCollection(API_GET_URL); //Collection 정보 가져오기
  
    getCurrentTabUrl(function(statusText){   //현재 Tab의 Url 가져오기
        (document.getElementById('keep-user-url') || {}).value = statusText.url;
    });

    chrome.storage.sync.get(["emailid"],function(item){
      $("#sign_out_e").text(" ("+item.emailid+")");
    }); 

});




/*
    지금 사용하는 Chrome의 Tab의 정보를 가져올 Callback함수
*/
function getCurrentTabUrl(callback){

  var queryInfo = {
      active: true,
      currentWindow: true
  };

  chrome.tabs.query(
      {active: true, currentWindow: true} , function(tabs){
      tab = tabs[0];
      callback(tab);
  });
  
}




/*
   Keeper의 UUID를 이용하여 API GET 호출로 
   Collection 목록 가져오기
*/
function getCollection(API_GET_URL){

  axios.get( API_GET_URL,{  //API GET 호출하여 Collection Data 가져오기
    })
    .then(function(response){   // response에는 HEADER , STATUS, DATA가 포함되어있다. 필요한 것은 DATA
        console.log(response);
        var collection_list= JSON.parse(JSON.stringify(response.data.results)); //Collection DATA 저장할 List 생성
        changeCollectionSelectbox(collection_list); // Seclection Box에 추가할 함수 실행

        //Collection 목록 List가 길경우.즉, Next가 null이아니면 Next Url로 API GET호출.
        if(response.data.next != null){
          API_GET_URL = response.data.next;
          getCollection(API_GET_URL);
        }


    })
    .catch(function (error){
        console.log(error.response);
    });
}





/*
   Collection Select box 생성하고 추가하는 함수
*/
function changeCollectionSelectbox(state){


  //Keeper가 생성한 모든 Collection Title 가져오기
  for(var i in state){

      // Selection box에 추가할 객체 생성
      var collection_title = document.createElement("option");
      collection_title.text=state[i].title;    
      collection_title.value=state[i].uuid; //Collection의 UUID도 저장해준다 (POST요청시 필요)

      // Selection box에 객체 추가
      (document.getElementById('collection_name') || {}).options.add(collection_title); 
    }
}




$(function(){

  $('#keep-user-tag').focus(function(){
    if(this.value=='tag,tag,tag'){
      this.value="";
    }
  });

  $('#keep-user-tag').on("keydown",function(event){
    
    $('#tagInfo').text("");
    if(event.keyCode == 32){
      event.preventDefault();
    }

    var tagString = $('#keep-user-tag').val() ; //입력된 TAGS를 가져와 Sring에 저장
    var keeperTags = tagString=="" ? [] : tagString.split(','); //,를 기준으로 구분하여 list 저장

    if(keeperTags.length==3 && event.keyCode==188){
      event.preventDefault();
      $('#tagInfo').text("tag is maximum of 3");
    }

  });
});


/*
   Create 버튼을 User가 클릭시 url,title,tags를 
   Collection uuid 기반 API호출로 POST 요청한다.
*/
$(function(){

  $('#mark-button').click(function(){ //Create 클릭시
    $(this).html('keeping...');
    $(this).prop('disabled', true);

    //Collection uuid를 이용하여 API POST요청할 URL 생성
    var collections_uuid=$('#collection_name').val();
    var collect_title=$('#collection_name option:checked').text();
    chrome.storage.sync.set({"collect_title" : collect_title},function(){});
    var API_POST_URL = API_BASE_URL + '/api/collections/'+collections_uuid+'/keeps' 

    var tagString = $('#keep-user-tag').val() ; //입력된 TAGS를 가져와 Sring에 저장
    var keeperTags = tagString=="" ? [] : tagString.split(','); //,를 기준으로 구분하여 list 저장

    //API POST요청 전송.
    axios.post(API_POST_URL,
      {  
        url : $('#keep-user-url').val(),
        keeper_title :$('#keep-user-title').val(),
        keeper_note : $('#keep-user-note').val(),
        tags : keeperTags 
      }
      // {
      //   headers: { 'Authorization': `Token ${token}`,'user-agent': "keepit-extension/2.7"}
      // }
      )
      //POST 요청이 정상적으로 전송된 경우
      .then(function(response){
        chrome.storage.sync.set({"collection_uuid" : collections_uuid},function(){});
        window.location.href="../html/notice.html"; //notice.html로 이동 
        $('#mark-button').html('create');  
        $('#mark-button').prop('disabled',false) ;

      })
      //POST 요청 ERROR가 난 경우
      .catch(function(error){
        var obj = error.response.data;
        var message="";
        for (let key of Object.keys(obj)) {
          message += "[" + key + "] : "+obj[key]+"\n"; 
        }
        $('#tagInfo').text(message);
        $('#mark-button').html('create');  
        $('#mark-button').prop('disabled',false) ;
      })

   
  })

});





/*
function postCollection(){
  var a= $('#keep-user-tag').val();
  console.log(a);
  getCurrentTabUrl(function(status){
    var tagString = (document.getElementById('keep-user-tag') || {}).value ;
    var keeperTags = tagString.split(',');
    console.log(keeperTags);
    axios.post(api_post_url,{
      url : status.url,
      keeper_title : status.title ,
      tags : keeperTags 
    })
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error.response.request._response);
    })

  });
}



function generateSuccessHTMLOutput (response){
  return '<h4> Result: </h4>' +
          '<h4> Status:</h4>'+
          '<pre>'+response.status+ ' ' + response.statusText+'</pre>'+
          '<h4>Header: </h4>'+
          '<pre>'+JSON.stringify(response.headers,null,'\t')+'</pre>'+
          '<h4>Data:</h4>'+
          '<pre>'+JSON.stringify(response.data,null,'\t')+'</pre>';
}






const tokenKey = 'token'
const MIN_VISIT_TIME = 5



const setAPIToken = (token) => {
    const tokenStr = token ? decodeURIComponent(token) : null
    chrome.storage.local.set({ token: tokenStr })
}

function redirectTo(popupName = 'index'){
    chrome.browserAction.setPopup({ popup: `html/${popupName}.html` })
    window.location.href = `${popupName}.html`
}


document.addEventListener('DOMContentLoaded', () => {
    chromeStorage.get('token').then((authToken) => {
      authToken && redirectTo('logged_in')
    })
  
    setLinkUrls()
})
  


chrome.browserAction.onClicked.addListener((tab) => {
    chrome.storage.local.get([tokenKey], (result) => {
      const token = result[tokenKey] ? result[tokenKey] : null
      const activePopup = token ? 'logged_in.html' : 'popup.html'
      chrome.browserAction.setPopup({ popup: `html/${activePopup}` })
    })
})



chrome.cookies.onChanged.addListener((changeInfo) => {
    if (!changeInfo.cookie || changeInfo.cookie.domain !== DOMAIN) {
      return
    }
  
    if (changeInfo.cookie.name == tokenKey) {
      const activePopup = changeInfo.removed ? 'popup.html' : 'logged_in.html'
      chrome.browserAction.setPopup({ popup: `html/${activePopup}` })
  
      // console.log(changeInfo.removed)
      changeInfo.removed
        ? chrome.storage.local.remove([
            'token',
            'user_info',
            'multiple_history',
            'data_link',
            'bookmark_imported',
            'user_lang'
          ])
        : setAPIToken(changeInfo.cookie.value)
    } else if (changeInfo.cookie.name == 'user_lang') {
      updateUserLang(changeInfo.cookie.value)
    }
})
  
*/