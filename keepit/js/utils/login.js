/************************************************************ 
                          By Meng
               E-mail: bluebelsmudi @ gmail.com
*************************************************************/



const API_LOGIN_URL= API_BASE_URL + '/api/auth/login'  //Login API 요청 URL



$(function(){

  $("#close_button_l").click(function(){
    self.close();
  });

});


$(document).on('keypress', function(e){
  if(e.keyCode == '13'){
    $('#signin').click();
  }
});


  
$(document).on('keypress', function(e){
  if(e.keyCode == '27'){
    $('#close_button_l').click();
  }
});




/*
  Sign in 버튼을 클릭하면 User가 적은 이메일와 비밀번호로 
  Keepit 사이트에 API 요청으로 Token을 받아 Local Storage에 넣는다.
*/
$(function(){

  $('#signin').click(function(){
    $(this).html('Loading...');
    $(this).prop('disabled', true);
    var emailstr = $('#user-email').val();


    //POST API 요청
    axios.post(API_LOGIN_URL,{     
      email :emailstr,
      password :$('#user-password').val(),
    })
    //POST가 정상적으로 받아졌을 때
    .then(function(response){             
      localStorage.setItem("Token" , response.data.key); //localStorage저장
      var user_uuid=response.data.user.uuid; 
      chrome.storage.sync.set({"uuid" : user_uuid},function(){}); //User의 uuid Chrome Storage에 저장
      chrome.storage.sync.set({"emailid" : emailstr},function(){}); //User의 uuid Chrome Storage에 저장
      window.location.href="../html/popup.html"; //Popup.html로 이동

    })
    //POST가 Error가 났을 때
    .catch(function(error){
      var obj = error.response.data;
      var message="";
      for (let key of Object.keys(obj)) {
        message += "[" + key + "] : "+obj[key]+"\n"; 
      }
      $('#user-email').val("");
      $('#user-password').val("");
      alert(message);
      
      $('#signin').html('sign in');
      $('#signin').removeAttr('disabled');
    })
  
  
  })
  
});

