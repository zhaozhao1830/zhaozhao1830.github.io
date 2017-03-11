var defaults={};
defaults.init=function(){
	var h=$(document.body).height();
	$("#lightboxOverlay").css({
		"height":h,
		"z-index":10
	})
	
	
}
$(document).ready(function(){
	defaults.init()
})

