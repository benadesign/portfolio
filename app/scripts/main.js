var currentPage = 'home';

$('.js-link').on('click', function(e){
	e.preventDefault();
	switch(e.target.href.split('/').pop()){
		case 'about' :
			about();
			break;
		case 'works' :			
			works();
			break;
		default :
			return;
	}
});

$('.left .back').on('click', function(){
	currentPage = 'home';	
	$('.page').removeClass('active');	
	aboutTl.reverse();
});

$('.right .back').on('click', function(){
	currentPage = 'home';	
	$('.page').removeClass('active');	
	worksTL.reverse();
});



var aboutTl = new TimelineMax({paused : true});
aboutTl.add( TweenLite.to(['.left nav', '.left h1'], 0.2, {opacity : 0}));
aboutTl.add( TweenLite.to('.left', 0.25, {width : '100%', ease : Quad.easeOut}));
aboutTl.add( TweenLite.to('#page-home', 0.35, {xPercent : 50, ease : Linear.easeNone} ) );
aboutTl.add( TweenLite.to(['#page-home'], 0.25, {xPercent : 80, ease : Linear.easeNone} ) );
aboutTl.add( TweenLite.to(['#reactor'], 0.25, { css : {left : '80%'} , ease : Linear.easeNone} ), '-=0.25' );
aboutTl.add( TweenLite.to('.left .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.25' );

function about(){
	currentPage = 'about';
	$('.page').removeClass('active');
	$('#page-about').addClass('active');	
	
	aboutTl.restart();
}


var worksTL = new TimelineMax({paused : true});
worksTL.add( TweenLite.to(['.right nav', '.right h1'], 0.2, {opacity : 0}));
worksTL.add( TweenLite.to('.right', 0.25, {width : '100%', ease : Quad.easeOut}));
worksTL.add( TweenLite.to('#page-home', 0.35, {xPercent : -50, ease : Linear.easeNone} ) );
worksTL.add( TweenLite.to(['#page-home'], 0.25, {xPercent : -80, ease : Linear.easeNone} ) );
worksTL.add( TweenLite.to(['#reactor'], 0.25, { css : {left : '20%'} , ease : Linear.easeNone} ), '-=0.25' );
worksTL.add( TweenLite.to('.right .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.25' );

function works(){
	currentPage = 'works';
	$('.page').removeClass('active');
	$('#page-works').addClass('active');		
	
	worksTL.restart();
}