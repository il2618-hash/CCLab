function setup() {
  createCanvas(1000, 600);

  //
}

function draw() {
  background(252,240,190);
  drawBed(520,250)
  drawTV(0,320)
  drawCar(0,0)
  //
}

function drawBed(x,y){
  push()
  noStroke()
  fill(190,220,252)
  rect(x,y,480,350)
  pop()
}

function drawTV(x,y){
  push()
  rect(x,y,100,200)
  pop()

}

function drawCar(x,y){
  push()
  rect(x,y,180,200)
  pop()
}

class TV{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  checkMouse(){
    let distance=dist(this.x,this.y,mouseX,mouseY)
    if (distance<0){
      push()
      translate(1.5)
      pop()
    }
  }
}