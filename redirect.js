var storage = chrome.storage.local;
storage.get('thetext', function(items) {
	var theHtml = items.thetext;
	$('body').html(theHtml);
});
