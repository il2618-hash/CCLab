let bedImg, TVImg, openboxImg, closeboxImg, carImg
let items=[]
let toybox

async function setup(){
  createCanvas(1000, 600);
  bedImg= await loadImage("assets/carbed.png")
  TVImg= await loadImage("assets/TV.png")
  openboxImg= await loadImage("assets/toyboxopen.png")
  closeboxImg= await loadImage("assets/toyboxclosed.png")
  carImg= await loadImage("assets/yaoyaocar.png")

  // Push items to items list
  items.push(new Item(bedImg, 520, 250, 480, 350))
  items.push(new Item(TVImg, 0, 320, 100, 200))
  items.push(new Item(carImg, 0, 0, 180, 200))

  // Separate list to open/close box when mouse hover
  toybox= new Item(closeboxImg, 240, 380, 160, 160)
  items.push(toybox);
}

function draw(){
  background(252, 240, 190);

  let hovering = false
  for (let item of items){
    item.display()
    if (item.isHovered()){
      hovering = true
    }
  }

  //Mouse hover to open/close box
  if (toybox.isHovered()){
    toybox.img=openboxImg
  } else {
    toybox.img=closeboxImg
  }

  cursor(hovering ? HAND : ARROW)
}

function isHovered(){
  if (toybox.isHovered()){
    toybox.img= (toybox.img === closeboxImg) ? openboxImg : closeboxImg
  }
}

class Item{
  constructor(img, x, y, w, h){
    this.img=img
    this.x=x
    this.y=y
    this.w=w
    this.h=h
  }

  isHovered(){
    return (
      mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h
    )
  }

  display(){
    push()
    translate(this.x+this.w/2, this.y+this.h/2)
    if (this.isHovered()){
      scale(1.3)
    }

    imageMode(CENTER)
    image(this.img,0,0, this.w, this.h)
    pop()
  }
}