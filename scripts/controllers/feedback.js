blur.controller('FeedbackCtrl', function() {
	var currState = blur.current.url;   
	$('body').css({background:'#fff'});
	App.setNavPointer(currState); 
});