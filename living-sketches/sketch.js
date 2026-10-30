let melonImgs=[]
let currentImage=0

async function setup() {
  createCanvas(650, 650);
  let promises=[]
  let img

  for (let i=1;i<=5;i++){
    let filename="asset/melon"+i+".jpg"
    //frameRate(4)

    promises.push(loadImage(filename))
  }
  
  melonImgs=await Promise.all(promises)
}

function draw() {
  //background(220);
  clear()
  imageMode(CENTER)
  image(melonImgs[currentImage],width/2,height/2)

  //if (currentImage<4){
    //currentImage++
  //} else{
    //currentImage=0
  //}
}

function keyPressed(){
  if (key ==="c"){
    currentImage = (currentImage + 1) % melonImgs.length
  }
}