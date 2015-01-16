(function(){

	var aboutTl = new TimelineMax({paused : true});
	aboutTl.add( TweenLite.to(['.left nav', '.left h1'], 0.2, {opacity : 0}));
	aboutTl.add( TweenLite.to('.left', 0.25, {width : '100%', ease : Quad.easeOut}));
	aboutTl.add( TweenLite.to('#page-home', 0.20, {xPercent : 50, ease : Linear.easeNone} ) );
	aboutTl.add( TweenLite.to(['#page-home'], 0.20, {xPercent : 80, ease : Linear.easeNone} ) );
	aboutTl.add( TweenLite.to(['#reactor'], 0.20, { css : {left : '80%'} , ease : Linear.easeNone} ), '-=0.20' );
	aboutTl.add( TweenLite.to('.left .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.20' );


	var worksTL = new TimelineMax({paused : true});
	worksTL.add( TweenLite.to(['.right nav', '.right h1'], 0.2, {opacity : 0}));
	worksTL.add( TweenLite.to('.right', 0.25, {width : '100%', ease : Quad.easeOut}));
	worksTL.add( TweenLite.to('#page-home', 0.35, {xPercent : -50, ease : Linear.easeNone} ) );
	worksTL.add( TweenLite.to(['#page-home'], 0.25, {xPercent : -80, ease : Linear.easeNone} ) );
	worksTL.add( TweenLite.to(['#reactor'], 0.25, { css : {left : '20%'} , ease : Linear.easeNone} ), '-=0.25' );
	worksTL.add( TweenLite.to('.right .back', 0.5, {opacity: 1, ease : Quint.easeOut} ), '-=0.25' );

	var currentPage = 'home';

	// configuration
	Router.config({ mode: 'hash'});

	// adding routes
	Router
		.add(/about/, about)

		.add(/works/, works)

		.add(home).check('').listen();



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



	function home(){	
		if(currentPage == 'about'){
			aboutTl.reverse();
		}else if(currentPage == 'works'){
			worksTL.reverse();
		}

		currentPage = 'home';
	}

	function about(){
		currentPage = 'about';
		$('.page').removeClass('active');
		$('#page-about').addClass('active');	
		
		aboutTl.restart();
	}


	function works(){
		currentPage = 'works';
		$('.page').removeClass('active');
		$('#page-works').addClass('active');		
		
		worksTL.restart();
	}

})();