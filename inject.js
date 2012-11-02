//** Content script doesnt work Offline ** , therefor use content Script
console.log('Inject Script Working');
var storage = chrome.storage.local;
//If Online then Store it

var theText = $('body').html().toString();
//Also store in chrome storage
var storageObject = {}
var url = window.location.href;//get the url of the page

storageObject[url]=theText;//Mapping

 storage.set(storageObject, function() {
    // Notify that we saved.
    console.log('saved the page');
  });
storage.get(url, function(items) {  
  console.log(items);//Check whether stored
});
