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
	$('.page').removeClass('active');	
	aboutTl.reverse();
});

var aboutTl = new TimelineMax({paused : true});
aboutTl.add( TweenLite.to('.left', 0.25, {width : '100%', ease : Quad.easeOut, onComplete : function(){ TweenLite.set('.right', {css : {display : 'none'}}) } } ) );
aboutTl.add( TweenLite.to('#page-home', 0.35, {xPercent : 50, ease : Linear.easeNone} ) );
aboutTl.add( TweenLite.to(['#page-home'], 0.35, {xPercent : 80, ease : Quint.easeOut} ) );
aboutTl.add( TweenLite.to(['#reactor'], 0.35, { css : {left : '80%'} , ease : Quint.easeOut} ), '-=0.35' );

function about(){
	$('.page').removeClass('active');
	$('#page-about').addClass('active');
	TweenLite.set('.left', {css : {'z-index' : 100}});
	
	aboutTl.restart();
}

function works(){
		$('.page').removeClass('active');
	$('#page-works').addClass('active');	
	console.log('works page');
}