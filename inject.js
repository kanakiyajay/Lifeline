jQuery(document).ready(function  ($) {	
	var url = window.location.href;//get the url of the page
	var storage = chrome.storage.local;//Cache
	console.log('Inject Script Working');
	var storageObject = {};
	//Store the html text
                var imgArray = $('img');//get all the images in array
                imgArray.each(function  (i) {
                    var dataImage = getBase64Image($(this),$(this).attr('src'));//f(Replace with base 64 index)
                    $(this).attr('src',dataImage);
                })
	var theText = $('body').html().toString();
	//Also store in chrome storage
	storageObject[url]=theText;

	 storage.set(storageObject, function() {
	    // Notify that we saved.
	    console.log('saved the page');
	  });
	storage.get(url, function(items) {  
	  console.log(items);//Check whether stored
	});
            function getBase64Image(img,src) {
                // Create an empty canvas element
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                console.log(img[0]);

                // Copy the image contents to the canvas
                var ctx = canvas.getContext("2d");
                var image = Image.new();
                image.src = src;
                ctx.drawImage(image, 0, 0);


                // Get the data-URL formatted image
                // Firefox supports PNG and JPEG. You could check img.src to
                // guess the original format, but be aware the using "image/jpg"
                // will re-encode the image.

                //To avoid cross-domain errors
                try{
                	dataURL = canvas.toDataURL("image/png");
                } catch (error){
                	console.log(error);
                }
                $('canvas').remove();
                return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }
});
