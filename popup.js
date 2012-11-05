var storage = chrome.storage.local;
var theHtml;

console.log('Working Offline');
var queryobject = {
  'active' : true
}
//Query Tabs for the active tabs
chrome.tabs.query(queryobject, function (tabArray){
  console.log(tabArray);//Returns a array of Tab Object
  var tab = tabArray[0];
  var url = tab.url;
  //Store the url in toAccessPage
  storage.set({'toAccessPage':url}, function() {
    // Notify that we saved.
    //Now objects to redirect page
    var thepath = chrome.extension.getURL('redirect.html');
    var updateProperties = {
      'url' : thepath,
      'active':true
    }
    //Redirect the page
    chrome.tabs.update(updateProperties, function (){      
//          tabID = tab.id;
    });
  });
});

