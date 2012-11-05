var storage = chrome.storage.local;//Cache

//Get the url of the accessed page
storage.get('toAccessPage', function(items) {
	var url = items.toAccessPage;//the Url content to fetch
	storage.get(url,function  (items2) {
		var content = items2[url];
		try{
			content = JSON.parse(content);
		var theText = content.html;
		var storeImgArray = content.img;
		try{
			$('body').html(theText);
		}
		catch(error){
			console.log(error);
		}
		}
		catch(error){
			$('body').append('<p>Oops ! some problem <br>Make Sure that <ul><li>you have visited the page once </li><li>you are entering the correct url</li><li>Try to visit the page from history ( Ctrl + H )</li></ul>');
		};
		
	});
});
