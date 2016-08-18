blur({
	route:[
		{
			url:'',
			template:'views/home',
			controller:'HomeCtrl',
			controllerAs:'home',
			view:'b-view',
		},
		{
			url:'about',
			template:'views/about', 
			controller:'AboutCtrl',
			controllerAs:'about',
		},
		{
			url:'docs',
			template:'views/doc',  
			controller:'DocCtrl',
			controllerAs:'doc',
		},
		{
			url:'feedback',
			template:'views/feedback',  
			controller:'FeedbackCtrl',
			controllerAs:'feedback',
		},
	],
	defaultView : 'b-view',
	baseLink : 'blur/',
	intiAnim:{ 
		// type:'fade', // comment these two line if you dont want to initialize 
		// speed:200	// your landing page with a fadeIn animation 
	}
});
 

 var App = $(window).ready(function(){

 	$('.headNav').find('.b-button').click(function(){
 		var h_url = $(this).attr('b-href');
 		setNavPointer(h_url); 
 	});

 	var setNavPointer = function(url){ 
 		if(url==''){
 			el = $('.headNav').find("[b-href='']");
 		}else{
 			el = $('.headNav').find("[b-href="+url+"]");
 		}
 		elWidth = el.outerWidth()-20;
 		elPos = el.position().left + 10;
 		$('.navPointer').css({left:elPos,width:elWidth});
 	}

 	App.setNavPointer = setNavPointer;
 	App.homePageInit = false;
 });

