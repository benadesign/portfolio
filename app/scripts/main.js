var Utils = {
	extend : function(destination, source) {   
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
	}
}


var ArcReactor = (function(){

	function ArcReactor(canvasSelector){
		this.canvas = document.getElementById(canvasSelector);
		this.stage = new createjs.Stage(this.canvas);
		this.numParticles = 200;
		this.radius = this.stage.canvas.width / 2;
		this.particles = [];
		this.setup();
	}

	ArcReactor.prototype.setup = function(){
		//Update stage will render next frame
		var _this = this;

		for(var i=0; i < this.numParticles; i++){
			this.particles.push(new Particle(this.stage, this.radius, {
				friction : (Math.random() * 150) + 1,
				sineWavePeriod : (Math.random() * 100) + 1
			}));
		}
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", function(){ _this.tick() } );
	}

	ArcReactor.prototype.tick = function(){
		this.stage.removeAllChildren();
		
		//for reference
    //g = new createjs.Shape();	g.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,0.1)").drawCircle(this.radius, this.radius, this.radius/2); this.stage.addChild(g);		
		//*************
		
   	for(var i=0; i < this.numParticles; i++){
   		this.particles[i].draw();
   	}

    this.stage.update();
	}



	/*
		PARTICLE
	 */
	function Particle(stage, radius , options){
		this.stage = stage;
		this.angle = 0;
		this.counter = 0;
		this.radius = radius;	
		this.amplitude = Math.floor((Math.random() * 15) + 1); 

		this.config = {				
			friction : 150,			
			sineWavePeriod : 100
		}

		if (options) Utils.extend(this.config, options) ;

		this.circle = new createjs.Shape();
		this.circle.graphics
			.beginFill( "rgba(255,255,255, "+Math.random()+")" )
			.drawCircle(0, 0, Math.floor(Math.random() * 2) + 0.5 );
	}

	Particle.prototype.draw = function (){		
    this.circle.x = (this.radius - 20 + (this.sine() * this.amplitude )) * Math.cos( this.angle ) + this.radius;
	  this.circle.y = (this.radius - 20 + (this.sine() * this.amplitude )) * Math.sin( this.angle ) + this.radius;
	  
	  this.angle += Math.PI * 2 / this.config.friction;

	  this.stage.addChild(this.circle);
	}

	Particle.prototype.sine = function(){		
		var s = Math.sin( this.counter ) + 0.05;		
		this.counter += Math.PI * 2 / this.config.sineWavePeriod;
		return s;
	}

	Particle.prototype.getColor = function(){
		var colors = ['#ffd17c','#00d3ff', '#ffffff', '#ff005e'];
		return colors[Math.floor(Math.random()*colors.length)];
	}



	return ArcReactor;
})();

var arc = new ArcReactor('arcReactor');



