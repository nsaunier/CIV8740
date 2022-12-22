let width = 1200; // px
let height = 800; // px
let step = 0.02; // s
let metersPerPixel = 1./100;
let nPedestrians = 20;
let pedRadius = 15; // px
let pedMaxSpeed = 1.5; // m/s
let pedMeanSpeed = 1.0; // m/s
let pedStdSpeed = 0.2; // m/s

let pedRepulsivePotential0 = 2.1; // m2/s2
let sigma = 0.3;
let deltaT = 2; // s for step length

let pedestrians = []; // x y positions (m)
let pedVelocities = []; // m/s
let pedDesiredSpeeds = []; // m/s
let tau = 0.5; // s
let pedDestinations = []; // x y positions (m)
let obstacles = []; // x y positions (m)

function setup() {
    createCanvas(width, height);
    background(220);
    for (let i = 0; i < nPedestrians; i++) {
	pedestrians[i] = createVector((pedRadius+1)*metersPerPixel, random(height)*metersPerPixel);
	pedDesiredSpeeds[i] = min(pedMaxSpeed, randomGaussian(pedMeanSpeed, pedStdSpeed));
	s = random(pedDesiredSpeeds[i])
	pedVelocities[i] = createVector(s, random([-1., 1.])*random(sqrt(pedDesiredSpeeds[i]*pedDesiredSpeeds[i]-s*s)));
	pedDestinations[i] = createVector((width-pedRadius-1)*metersPerPixel, random(height)*metersPerPixel);
	//print(pedestrians[i]);
	//print(pedVelocities[i]);
	if (random([true, false])) {
	    p = pedestrians[i].copy();
	    pedestrians[i] = pedDestinations[i];
	    pedDestinations[i] = p;
	    pedVelocities[i].x = -pedVelocities[i].x;
	}
	// add obstacles TODO
    }
    //reset();
}

function draw() {
    background(220);

    // update 
    for (let i = 0; i < nPedestrians; i++) {
	// destination force
	desiredDirection = createVector(0.,0.);
	// calculate desiredDirection TODO
	Fdest = p5.Vector.sub(desiredDirection,pedVelocities[i]);
	Fdest.div(tau);

	// pedestrian repulsivity
	Frepuls = createVector(0.,0.);
	for (let j = 0; j < nPedestrians; j++) {
	    // TODO
	}

	// obstacle repulsivity

	// update velocity
	sumForces = p5.Vector.add(Fdest, Frepuls);
	sumForces.mult(step);
	pedVelocities[i] = p5.Vector.add(pedVelocities[i], sumForces);
	if (pedVelocities[i].mag() > pedDesiredSpeeds[i]) { // not higher than max speed
	    pedVelocities[i].normalize();
	    pedVelocities[i].mult(pedDesiredSpeeds[i]);
	}
	
	// update positions
	velocity = pedVelocities[i].copy();
	velocity.mult(step);
	pedestrians[i] = p5.Vector.add(pedestrians[i], velocity);
    }
    
    // draw positions
    for (let i = 0; i < nPedestrians; i++) {
	fill(0);
	circle(pedDestinations[i].x/metersPerPixel,pedDestinations[i].y/metersPerPixel, pedRadius*2);
	fill(255);
	circle(pedestrians[i].x/metersPerPixel,pedestrians[i].y/metersPerPixel, pedRadius*2);
    }
}

function test() {
    ellipse(mouseX, mouseY, 80*random(), 80*random());  
}

function mousePressed() {
    reset();
}

function reset() {
}
