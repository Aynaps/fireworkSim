function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, random(-8, -4));
  this.acc = createVector(0, 0.07);
  this.blownUp = false;


    this.update = function() {
      if (!this.blownUp) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        if (this.vel.y >= 0) { //check if at max height
          this.blownUp = true;
        }
    }


  }


  this.show = function() {
    if (!this.blownUp) {
      point(this.pos.x, this.pos.y);
    }

  }


  this.explode = function() {
    var r = random(200,255);
    var g = random(150,255);
    var b = random(255);
    for (var i = 0; i < 500; i++) {
      var v1 = p5.Vector.random2D();
      var v2 = p5.Vector.random2D();
      v1.mult(random(1, 100));
      v2.mult(random(1, 100));
      fill(r, g, b);
      noStroke();
      circle(this.pos.x + v1.x, this.pos.y + v1.y, 2);
      fill(b,g,r);
      noStroke();
      circle(this.pos.x + v2.x, this.pos.y + v2.y, 2);
    }

  }

}


var fireworks = [];
function setup() {

  createCanvas(600, 600); //window
  background(0);
  stroke(255);
  strokeWeight(4);
}

function draw() {
  background(0,25); //trails
  stroke(255);
  strokeWeight(4);

  //create a firework 10% of the time
  if(random(1) < 0.1){
    fireworks.push(new Particle(random(width), height));
  }


  //loop through fireworks and let em fly
  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].update(); //update
    fireworks[i].show(); //show
    if (fireworks[i].blownUp) {
      fireworks[i].explode();
      fireworks.splice(i,1);//remove first element
    }
  }


}