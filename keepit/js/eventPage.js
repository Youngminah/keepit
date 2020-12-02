var contextMenuItem = {
    "id": "keepThis",
    "title" : "KeepThis",
    "contexts": ["image","video","page"]

};

chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "keepThis" ){
        var naverUrl = chrome.windows.location.href;
        var createData ={
            "url": naverUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth,
            "height": screen.availHeight
        };
        chrome.windows.create(createData,function(){});

    }
})