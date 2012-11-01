//** Content script doesnt work Offline **
//First Find Out whether the user is Offline.
//yes! the inject script is working
console.log('Inject Script Working');
var storage = chrome.storage.local;
//If Online then Store it

var k = $('body').html().toString();
//Also store in chrome storage
 storage.set({'thetext': k}, function() {
    // Notify that we saved.

  });
storage.get('thetext', function(items) {
  
  console.log(items);
});
