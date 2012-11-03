jQuery(document).ready(function  ($) {	
	var url = window.location.href;//get the url of the page
	var storage = chrome.storage.local;//Cache
	console.log('Inject Script Working');
	var storageObject = {};
	//Store the html text
	var theText = $('body').html().toString();
	var imgArray = $('img');//get all the images in array
                              var storeImgArray = []; 
                                for (var i = 0; i < imgArray.length; i++) {
                		//if () {}; //If image is from another domain
                                    getBase64Image(imgArray[i],i);//Get the base64 string of the image
                                    console.log(storeImgArray);
                                };
	//Also store in chrome storage
	var itemStorage = {
	            'html' : theText,
	            'img' : storeImgArray
	        };

	storageObject[url]=JSON.stringify(itemStorage);;//Mapping

	 storage.set(storageObject, function() {
	    // Notify that we saved.
	    console.log('saved the page');
	  });
	storage.get(url, function(items) {  
	  console.log(items);//Check whether stored
	});
            function getBase64Image(img,number) {
                // Create an empty canvas element
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                console.log(canvas);

                // Copy the image contents to the canvas
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);


                // Get the data-URL formatted image
                // Firefox supports PNG and JPEG. You could check img.src to
                // guess the original format, but be aware the using "image/jpg"
                // will re-encode the image.

                //To avoid cross-domain errors
                try{
                	storeImgArray[i] = canvas.toDataURL("image/png");
                } catch (error){
                	console.log(error);
                }
                $('canvas').remove();
                //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }
});
