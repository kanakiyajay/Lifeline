// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
      null, {code:"document.body.style.background='red !important'"});
});


/*var i = 0;
window.setInterval(function() {
  chrome.browserAction.setBadgeText({text:String(i)});
  i++;
}, 10);*/
