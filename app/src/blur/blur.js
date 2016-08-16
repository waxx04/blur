
var Kernal = $(window).ready(function(){ 

	var DOM; 
	var setDomFunction = function(){

		DOM = $('body');

		// b-href function


		var hrefObject = findElByAttr('b-href'); 
		 
		hrefObject.click(function(){
			var attrVal = $(this).attr('b-href');
			var anim = $(this).attr('animate'); 
			var anim_s = parseInt($(this).attr('anim-speed'));  
			var animate = {
				type:anim,
				speed:anim_s
			}
			setRoute({route:attrVal, animate:animate }); 
		});

		// OnClick function  
		
		var onClickEl = findElByAttr('b-click'); 
		onClickEl.click(function(){
			attrVal = $(this).attr('b-click');
			executeDOM(attrVal);
		});

		// OnMouseOver function  
		
		var onMouseOver = findElByAttr('b-mouseOver'); 
		onMouseOver.mouseover(function(){
			attrVal = $(this).attr('b-mouseOver');
			executeDOM(attrVal);
		});

		// OnMouseDown function  
		
		var onMouseOut = findElByAttr('b-mouseOut'); 
		onMouseOut.mouseout(function(){
			attrVal = $(this).attr('b-mouseOut');
			executeDOM(attrVal);
		});

		// DOM FUNCTIONS

		var b_elem_array = [];
		function addToBElement(key){
			if(b_elem_array.indexOf(key) == -1){
				b_elem_array.push(key);
			}
		}
		// b-hide


		var b_hide = findElByAttr('b-hide'); 
		var b_hide_arr = {}

		for (var i = 0; i < b_hide.length ; i++){
			var key = b_hide[i].getAttribute('b-hide');
			b_hide_arr[key] = {
					obj:b_hide[i],
					dis:b_hide[i].style.display,
				}
			addToBElement(key);
		}

		function bHideTriger(key){
			for(prop in b_hide_arr){
				if(prop == key){
					b_hide_arr[prop].obj.style.display='none';
				}else{
					b_hide_arr[prop].obj.style.display=b_hide_arr[key].dis;
				}
				console.log('executing : '+ b_hide_arr[key])
			}
		}

		// Executing DOM Element fuctions

		function executeDOM(attrVal){ // I donno how this function is working, It should not work.
			var ctrlName;
			if(blur.current.controllerAs){
				ctrlName = blur.current.controllerAs;
			}else{
				ctrlName = blur.current.controller;
			}
			if(attrVal.indexOf(ctrlName) == -1){
				eval(attrVal);
			}else{
				attrVal = attrVal.replace(ctrlName,'')
				eval(attrVal);
				//var obj = {};
				//blur.controllers['HomeCtrl'].apply(obj);
			}
			bHideTriger(attrVal);
		}
 
	} 
	Kernal.setDomFunction = setDomFunction;

	var onHoverEl,onMouseDownEl,onMouseUpEl;

 	function findElByAttr(attr){
 		var el = '';  
		if(DOM.find("["+attr+"]")){
			el = DOM.find("["+attr+"]");
		}
		return el;
 	}

});

// Initialization
 
var blur = (function() { 
	var routes,initData;
	var current = {url:''};  

    function blur(Data) {
        initData = Data;
		routes = initData.route;

        console.log('blur Initialized'); 
        if(Data.intiAnim == undefined)Data.intiAnim = {}
		setRoute({animate:Data.intiAnim});
    } 
  
	//This function sets the view 

	var baseLink = '';
	var v_timeO,v_timeO2,v_timeO3;

	setView = function(link,viewName,ctrl,animate){

		if(viewName == undefined) viewName = initData.defaultView; 
		if(animate == undefined) animate = {}; 
		if(animate.type == 'fade'){
			$('#'+viewName).fadeOut(animate.speed); 
			clearTimeout(v_timeO);
			clearTimeout(v_timeO2);
			clearTimeout(v_timeO3);
			v_timeO = setTimeout(function(){ $('#'+viewName).load(baseLink + link + '.html');},animate.speed);// should fix it by callback functions
			v_timeO2 = setTimeout(function(){  ctrl();  Kernal.setDomFunction();},animate.speed+70);// should fix it by callback functions
			v_timeO3 = setTimeout(function(){ $('#'+viewName).fadeIn(animate.speed); },animate.speed+100);// should fix it by callback functions
		}else{ 
			$('#'+viewName).load(baseLink + link + '.html').hide(); // should fix it by callback functions
			setTimeout(function(){ ctrl();   Kernal.setDomFunction();},70); // should fix it by callback functions
			setTimeout(function(){$('#'+viewName).show();},100); // should fix it by callback functions
		}
	}

    blur.setView = setView;

	var changeState, c_url, el;  

	setRoute = function(data){ 
		var url = data.route;   
		if(current.url != url){

			changeState = false; 

			if(url == undefined ){
				c_url = readRoute(); 
			}else{
				c_url = url;	
			}

			el = checkRoute(c_url,routes); 
			changeState = el.state;  

			if(changeState){
				setView(el.obj.template, el.obj.view,controllers[el.obj.controller], data.animate); 
				window.history.pushState("object or string", "Title", "/#/" + el.obj.url);   
				current = el.obj;
			}else{
				window.history.pushState("object or string", "Title", "/#/" + routes[0].url);
				setView(routes[0].template,routes[0].view, controllers[routes[0].controller], data.animate);  
				current = routes[0];
			} 
		} 
		blur.current = current;
	}

	function readRoute(){ 

		var cu_url = window.location.href.split("/");
		var cu_url_len = cu_url.length;
		var relUrl = ''; 
		var relCouter = 4; // initialized relCouter as 4 to skip absolute url
		var i = relCouter;
		for(i; i < cu_url_len; i++ ){

			var tempUrl = cu_url[i];
			if(tempUrl != ''){
				if(i == relCouter)
					relUrl += tempUrl;
				else
					relUrl += '/'+tempUrl; 
			} 
		} 
		return relUrl;
	}

	function checkRoute(url,routes){
		var c_state,
		 	obj,
		 	routeLen = routes.length;

		for(var i = 0;i < routeLen; i++){
			if(routes[i].url == url){
				c_state = true; 
				obj = routes[i];
				i = routeLen;
			}else{
				c_state = false;
			}
		}

		return {
			state:c_state,
			obj:obj,
		};
	}

    blur.setRoute = setRoute;
 
    var controllers = {};

    controller = function(ctrl,func){
    	controllers[ctrl] = func; 
    	blur.controllers = controllers;
    } 

    blur.controller = controller;



	//watching system --------------------- this section is disgusting || Very Bad performance


	var watchList = {}

	function watch(objName,obj,func){
		watchList[objName] = {oldVal: obj, func: func }
	}

	var ctrl;
	var watchSpace;
	var watcher;

	setWatch = function(controller){	
		ctrl = {};	
		try{
			clearInterval(watcher);
			controllers['HomeCtrl'].apply(ctrl);
			console.log('this is : ' + ctrl);
		}catch(e){/*console.log(e);*/}

		watchSpace = ctrl;
		watcher = setInterval(function(){
			for (var property in watchList) {
			    if(watchSpace[property] != watchList[property].oldVal){
			    	watchList[property].oldVal = watchSpace[property];
			    	watchList[property].func();
			    }
			}
		},100);

		$.each(ctrl,function(key,val){
			watch(key,val,function(){ console.log('its b'); })
		});
	}

    return blur;

})(); 
