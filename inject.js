jQuery(document).ready(function  ($) {  
    var url = window.location.href;//get the url of the page
    var storage = chrome.storage.local;//Cache
    var check = $.Deferred();
     storage.get(url, function(items) {  
        if (url!==null) {
            check.resolve();
        };
      });
    //console.log('Inject Script Working');
    check.done(function  () {
      
    var storageObject = {};
    //Store the html text
    var styleSheet ;
    var deffered = $.Deferred();
    var imgArray = $('img');//get all the images in array
     var storeImgArray = []; 
        for (var i = 0; i < imgArray.length; i++) {
//if () {}; //If image is from another domain
            var dataUrl = getBase64Image(imgArray[i],i);//Get the base64 string of the image
            $(imgArray[i]).attr('src',dataUrl);
            //console.log($(imgArray[i]));
        };
    //Also store in chrome storage
    var theText = $('body').html().toString();
    var stylesheetArray = $('link[rel="stylesheet"]');
    var numberOfStyles = stylesheetArray.length;
    var number = 0;
        //Get all the styles in text
        for (var i = 0; i < stylesheetArray.length; i++) {

            var href = $(stylesheetArray[i]).attr('href');
            $.when($.get(href)).done(function(response) {
                styleSheet = styleSheet + response.toString();
                //$('<style />').text(response).appendTo($('head'));
                //$('div').html(response);
                number = number+1;
                if (numberOfStyles===number) {
                    //console.log(styleSheet);
                    deffered.resolve();
                };
            });        
        };
deffered.done(function  () {
      theText = '<style'+' type="text/css">'+styleSheet+'</style>'+theText;
      var itemStorage = {
                  'html' : theText,
                  'img' : storeImgArray
              };          
      storageObject[url]=JSON.stringify(itemStorage);;//Mapping
  
       storage.set(storageObject, function() {
          // Notify that we saved.
          console.log('saved the page');
        });
     
      saved();
});
    });
function saved () {
    $('body').append('<div id="offline-save-icon">Saved</div>');
}
 function getBase64Image(img,number) {
                // Create an empty canvas element
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
               // console.log(canvas);

                // Copy the image contents to the canvas
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                //To avoid cross-domain errors
                try{
                    storeImgArray[i] = canvas.toDataURL("image/png");
                } catch (error){
                    //console.log(error);
                }
                $('canvas').remove();
                try{
                    return storeImgArray[i];//.replace(/^data:image\/(png|jpg);base64,/, "");
                }catch(error){
                    //console.log(error);
                }
            }
});