
BLUR
=
Blur is simple Light Weight 2kb MVC SPA framework. Designed for small HTML5 Websites, But it is in Beta version now. using this Blur you can set

 - Routes
 - Controllers
 - Veiws
 
and i'm working on some of the extra DOM functions. May be it will be available on next version.

Blur supports multiple views and nested views. Its Simple to use

Dependancy
-
jQuery ^ 2.0

Implementation
-------------
Blur is simple to use.

First include jQuery and Blur.js,  Then declare Blur App and Routes.

    
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
		],
		defaultView : 'b-view'
	});

In route you can set Five properties,

 - **ulr** : value[ url of the view ]
 - **template**: value[ url of the template ]
 - **controller**: value[ name of controller ]
 - **controllerAs**: value[ name of the controller you wish to call in DOM functions ] 
 - **view**: value[id of the view element]
 
 Eg:-

		<div id="blurView"></div>
	And  now you can set value of **view** property in routes as "**blurView**"

You can also set **defaultView** to the App. So all the routes without view property will load in the defaultView, and routes with view property will load in the assigned view. 

**controllerAs** property is may only be useful in the next version, Because in this version i'm not introducing DOM functions.

Setting Controller :

Setting controller is very simple

		blur.controller('AboutCtrl', function() {
						
		});

Your controller is ready.

Dependency injection will added in next version.

