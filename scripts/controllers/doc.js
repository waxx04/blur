blur.controller('DocCtrl', function() {  

	var currState = blur.current.url;   
	$('body').css({background:'#fff'});
	App.setNavPointer(currState); 

	this.shaji = 'shaji';

	this.shiti2 = function(){
		console.log('yeah this is shit 2 = '+ shaji);
	}
	
});