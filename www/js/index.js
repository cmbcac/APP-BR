
(function() {
  //body & trigger
  var $body = document.body;
  var $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

  if (typeof $menu_trigger !== 'undefined') {
    $menu_trigger.addEventListener("click", function() {
      $body.className = ($body.className == "menu-active") ? '' : 'menu-active'; 
    });
  }
}).call(this);
/*
var act = false;

(function() {
  //body & trigger



    $(".menu-trigger").click( function() {
	
	if(!act){
	  $("#parent").css("margin-left","130px");
	  $("#slide-menu").css("width", "130px");
	  act = true;
	}
	else{
	  $("#parent").css("margin-left","0px");
	  //$("#slide-menu").css("left", "-130px");
	  $("#slide-menu").css("width", "0px");
		act =false;
	}

    });
  
}).call(this);
*/