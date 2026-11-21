let bedImg, TVImg, openboxImg, closeboxImg, carImg
let items=[]
let toybox


async function setup() {
  createCanvas(1000, 600);
  bedImg=await loadImage("assets/carbed.jpeg")
  TVImg=await loadImage("assets/TV.jpeg")
  openboxImg=await loadImage("assets/toyboxopen.jpeg")
  closeboxImg=await loadImage("assets/toyboxclosed.jpeg")
  carImg=await loadImage("assets/yaoyaocar.jpeg")

  //push items to items list
  items.push(new Item(bedImg,520,250,480,350,"Car Bed"))
  items.push(new Item(TVImg, 0,320,100,200,"TV"))
  items.push(new Item(carImg,0,0,180,200,"Yaoyao"))
  //
}

function draw() {
  background(252,240,190);
  
  let hovering=false
  for (let item of items){
    item.display()
    if(item.isHovered()){
      hovering=true
    }
  }
  cursor(hovering ? HAND : ARROW)
}


class Item{
  constructor(x,y,w,h,img){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    this.img=img
  }

  isHovered(){
    return(
      mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h
    )
  }

  display(){
    push()
    translate(this.x+this.w/2, this.y+this.h/2)
    if (this.isHovered()){
      scale(1.1)
    }

    imageMode(CENTER)
    image(this.img,0,0,this.w,this.h)

    pop()
  }
}