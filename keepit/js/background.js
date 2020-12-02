/************************************************************ 
                          By Meng
               E-mail: bluebelsmudi @ gmail.com
*************************************************************/



//chrome.tabs.executeScript(null, {file: 'scriptInjecting.js'}, scriptInjected);

const API_BASE_URL='https://api.keepit.site'   //API의 기본 앞 URL

// $(function() {
//   const myIFrame = `
//   <iframe src="chrome-extension://foifmkbelheoceeokeepnfgfpakcclae/html/login.html"></iframe>
//   `;
//   let div = document.createElement('div');
//   //div.style.zIndex = 9999999;
//   div.innerHTML = myIFrame;
//   //var x = doc.getElementsByTagName('script')[0];

//   document.body.insertBefore(div);



// });





/* 
   Chrome extension Button이 눌릴때 Token이 있는 지 없는지 검사하여 
   알맞은 html 띄우기 
*/
document.addEventListener('DOMContentLoaded',function(){

  // localStorage.clear();
  var token = localStorage.getItem("Token");

  //token이 있으면 popup.html을 띄우고 없으면 login.html을 띄운다.
  if(token==null){
    chrome.browserAction.setPopup({
      popup: "html/login.html"
    });
  }
  else{
    chrome.browserAction.setPopup({
      popup: "html/popup.html"
    });
  }


});
