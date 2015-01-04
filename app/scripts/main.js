var Utils = {
	extend : function(destination, source) {   
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
	},

	range : function(min, max){
		return  Math.random() * max  + min	;
	}
}


/*
		PARTICLE
	 */
var Particle = (function(){

	function Particle(stage, radius , options){
		this.stage = stage;
		//this.angle = 0;
		this.counter = 0;
		this.radius = radius;	
		this.amplitude = Math.floor(Utils.range(1,15)); 

		this.config = {				
			friction : 150,			
			sineWavePeriod : 100,
			size: 1,
			angle : 0,
		}

		if (options) Utils.extend(this.config, options) ;

		this.circle = new createjs.Shape();
		this.circle.graphics
			//.beginFill( this.getColor() )
			.beginFill( "rgba(255,255,255,"+Utils.range(0.3,0.5)+")" )
			//.beginFill( "rgba(246,235,120,"+Utils.range(0.5,1)+")" )
			.drawCircle(0, 0, this.config.size);
	}

	Particle.prototype.draw = function (){		
    this.circle.x = (this.radius - 20 + (this.sine() * this.amplitude )) * Math.cos( this.config.angle ) + this.radius;
	  this.circle.y = (this.radius - 20 + (this.sine() * this.amplitude )) * Math.sin( this.config.angle ) + this.radius;
	  
	  this.config.angle += Math.PI * 2 / this.config.friction;

	  this.stage.addChild(this.circle);
	}

	Particle.prototype.sine = function(){		
		var s = Math.sin( this.counter ) + 0.05;		
		this.counter += Math.PI * 2 / this.config.sineWavePeriod;
		return s;
	}

	Particle.prototype.getColor = function(){
		var colors = [
		"rgba(0,216,255,"+Utils.range(0.3,1)+")",
		"rgba(255,0,246,"+Utils.range(0.3,1)+")",
		"rgba(0,255,54,"+Utils.range(0.3,1)+")"
		];
		return colors[Math.floor(Math.random()*colors.length)];
	}

	return Particle;

})();



/*
	Arc Reactor
 */
var ArcReactor = (function(Particle){

	function ArcReactor(canvasSelector){
		this.canvas = document.getElementById(canvasSelector);
		
		var ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'lighter';

		this.stage = new createjs.Stage(this.canvas);
		this.numParticles = 1000;
		this.radius = this.stage.canvas.width / 2;
		this.particles = [];

		this.setup();
	}

	ArcReactor.prototype.setup = function(){
		//Update stage will render next frame
		var _this = this;

		for(var i=0; i < this.numParticles; i++){
			this.particles.push(new Particle(this.stage, this.radius, {
				size :           Utils.range(1, 3) ,
				friction :       Utils.range(200, 300),
				sineWavePeriod : Utils.range(100, 150),
				angle : Math.PI * 2 / Math.random()			
			}));
		}
    
    //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		//createjs.Ticker.setFPS(40);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", function(){ _this.tick() } );
	}


	ArcReactor.prototype.tick = function(){
		this.stage.removeAllChildren();
		
		//for reference
    g = new createjs.Shape();	g.graphics.setStrokeStyle(1).beginStroke("#8fd0cc").drawCircle(this.radius, this.radius, this.radius-20); this.stage.addChild(g);		
		//*************
		
   	for(var i=0; i < this.numParticles; i++){
   		this.particles[i].draw();
   	}

    this.stage.update();
	}

	return ArcReactor;

})(Particle);

var arc = new ArcReactor('arcReactor');

