require("jsdom/lib/old-api").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jQuery")(window);
    //------- Jquery Start -------

    $(document).readey(function(){
    	$("#test").text("Bug");
    })
});


