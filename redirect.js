var storage = chrome.storage.local;//Cache

//Get the url of the accessed page
storage.get('toAccessPage', function(items) {
	var url = items.toAccessPage;//the Url content to fetch
	storage.get(url,function  (items2) {
		var content = items2[url];
		content = JSON.parse(content);
		//console.log(content);
		var theText = content.html;
		var storeImgArray = content.img;
		for (var i = 0; i < storeImgArray.length; i++) {
			theText = theText +'<img src="'+storeImgArray[i]+'"></img>';
		};
		$('body').html(theText);
	});
});
