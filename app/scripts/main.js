
var aboutTl = new TimelineMax({paused : true});
aboutTl.add( TweenLite.to(['.left nav', '.left h1'], 0.2, {opacity : 0}));
aboutTl.add( TweenLite.to('.left', 0.25, {width : '100%', ease : Quad.easeOut}));
aboutTl.add( TweenLite.to('#page-home', 0.15, {xPercent : 50, ease : Linear.easeNone} ) );
aboutTl.add( TweenLite.to(['#page-home'], 0.15, {xPercent : 80, ease : Linear.easeNone} ) );
aboutTl.add( TweenLite.to(['#reactor'], 0.15, { css : {left : '80%'} , ease : Linear.easeNone} ), '-=0.15' );
aboutTl.add( TweenLite.to('.left .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.15' );


var worksTL = new TimelineMax({paused : true});
worksTL.add( TweenLite.to(['.right nav', '.right h1'], 0.2, {opacity : 0}));
worksTL.add( TweenLite.to('.right', 0.25, {width : '100%', ease : Quad.easeOut}));
worksTL.add( TweenLite.to('#page-home', 0.35, {xPercent : -50, ease : Linear.easeNone} ) );
worksTL.add( TweenLite.to(['#page-home'], 0.25, {xPercent : -80, ease : Linear.easeNone} ) );
worksTL.add( TweenLite.to(['#reactor'], 0.25, { css : {left : '20%'} , ease : Linear.easeNone} ), '-=0.25' );
worksTL.add( TweenLite.to('.right .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.25' );


// configuration
Router.config({ mode: 'history'});

// adding routes
Router
	.add(/about/, function() {
	    console.log('about');
	    about();
	})

	.add(/works/, function() {
	    console.log('works');
	    works();
	})

	.add(function() {
	    console.log('default');
	}).check('').listen();




$('.left .back').on('click', function(){	
	$('.page').removeClass('active');	
	aboutTl.reverse();
	Router.navigate();
});

$('.right .back').on('click', function(){	
	$('.page').removeClass('active');	
	worksTL.reverse();
	Router.navigate();
});


function about(){
	$('.page').removeClass('active');
	$('#page-about').addClass('active');	
	
	aboutTl.restart();
}


function works(){
	$('.page').removeClass('active');
	$('#page-works').addClass('active');		
	
	worksTL.restart();
}