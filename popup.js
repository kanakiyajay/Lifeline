var storage = chrome.storage.local;
var theHtml;

console.log('Working Offline');
storage.get('thetext', function(items) {

  theHtml = items.thetext;
  var str = sanitize(theHtml).xss();
    //console.log(items);
  var injectDetails = {
    'code':'document.write(escape("'+str+'"));'
  }
  var tabID;
//var ghost = $(theHtml);
  chrome.tabs.executeScript(injectDetails, function (){
    console.log(theHtml);
    console.log('Working');
  });
  var thepath = chrome.extension.getURL('redirect.html')
  var updateProperties = {
    'url' : thepath,
    'active':true
  }
chrome.tabs.update(updateProperties, function (tab){      
      tabID = tab.id;
    chrome.tabs.onUpdated.addListener(function(tabID,changeInfo, tab) {
        $('body').html(theHtml);
        console.log(tabID);
        console.log(changeInfo);
        console.log(tab);
    });
  });
});
