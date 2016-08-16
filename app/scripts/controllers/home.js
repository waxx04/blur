blur.controller('HomeCtrl',function(){

	this.sh = function(){
		console.log('yeah this is shit');
	}
	this.test = 2;
	
	var currState = blur.current.url;
	App.setNavPointer(currState); 
	var vm = this;
	var winHeight = $(window).height() - 100;

	$('.homePage').css({height:winHeight});    
	if(!App.homePageInit){
		setTimeout(function(){ $('.jumboTroneFake').css({height:'0%'}); },200); 
		setTimeout(function(){ setHomePage(); },1400);
		App.homePageInit = true;
	}else{
		setHomePage();
	}
	function setHomePage(){
		$('.jumboTroneFake').css({height:'0%'});
		$('.jumboTrone').css({top:'20%'});
		$('.jumboTroneDet').css({top:'calc( 20% + 140px )', 'line-height':'150%',opacity:1});
		$('body').css({background:'#fff'});
	} 
	//console.log('DON '+_Dom);
	 
});