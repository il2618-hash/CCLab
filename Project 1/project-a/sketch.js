// Brush variables (random walkers)
let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;

// Moving Bamboo particle variables
let bambooYSpeed;
let yFreq, yAmp, yWidth;
let frameInterval = 50;
let bambooX, bambooY;
let dia = 20;

// Creature movement variables
let xPos = 400;
let yPos = 100;
let creatureXSpeed = 2;
let creatureYSpeed = 2;
let edge = 35;

// Offscreen graphics layers
let bgCanvas;  //Background bamboo forest
let inkCanvas; // Ink painting

function setup() {
  createCanvas(800, 500);

  //Background setup
  bgCanvas = createGraphics(800, 500);
  generateBambooLandscape(bgCanvas);

  // Layer for ink painting
  inkCanvas = createGraphics(800, 500);

  // Initial brush positions
  x1 = random(30, 700); y1 = random(30, 400);
  x2 = random(60, 700); y2 = random(50, 400);
  x3 = random(50, 700); y3 = random(40, 400);
  x4 = random(80, 700); y4 = random(20, 400);
  x5 = random(120, 700); y5 = random(90, 400);

  // Bamboo particle movement setup
  bambooY = height + 20;
  bambooYSpeed = random(3, 5);
  yFreq = random(0.01, 0.02);
  yAmp = random(20, 60);
  yWidth = random(100, width - 100);
}

function draw() {
  // 1. Draw static background landscape first
  image(bgCanvas, 0, 0);

  // 2. Fade ink trails toward transparent without obscuring the background
  inkCanvas.erase(12);
  inkCanvas.rect(0, 0, width, height);
  inkCanvas.noErase();

  // 3. Mouse brush on ink canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    inkCanvas.noStroke();
    inkCanvas.fill(0);
    inkCanvas.circle(mouseX, mouseY, dia);
    inkCanvas.circle(mouseX + random(-6, 6), mouseY + random(-6, 6), dia * 0.6);
  }

  // 4. Random walker brush strokes
  x1 += random(-5, 5); y1 += random(-5, 5);
  x2 += random(-5, 5); y2 += random(-5, 5);
  x3 += random(-5, 5); y3 += random(-5, 5);
  x4 += random(-5, 5); y4 += random(-5, 5);
  x5 += random(-5, 5); y5 += random(-5, 5);

  inkCanvas.noStroke();
  inkCanvas.fill(0);
  inkCanvas.circle(x1, y1, dia);
  inkCanvas.circle(x2, y2, dia);
  inkCanvas.circle(x3, y3, dia);
  inkCanvas.circle(x4, y4, dia);
  inkCanvas.circle(x5, y5, dia);

  // 5. Moving bamboo particle
  bambooY -= bambooYSpeed;
  bambooX = yWidth + cos(frameCount * yFreq) * yAmp;

  if (bambooY < -30) {
    bambooY = height + 10;
    yWidth = random(100, width - 100);
    bambooYSpeed = random(3, 5);
  }

  inkCanvas.fill(0);
  inkCanvas.ellipse(bambooX, bambooY, 20, 10);

  // 6. Draw animated ink layer over background
  image(inkCanvas, 0, 0);

  // 7. Render interactive creature on top
  Creature();
}

// Generate static procedural bamboo background once in setup
function generateBambooLandscape(pg) {
  pg.background(245, 242, 235);

  // Bamboo background
  for (let x = 0; x < pg.width; x += 15) {
    for (let y = 0; y < pg.height; y += 45) {
      let bambooWidth = map(noise(x * 0.15, y * 0.3), 0, 1, 10, 8);
      let bambooHeight = map(noise(x * 0.2, y * 0.5), 0, 1, 40, 55);

      pg.noStroke();
      pg.fill(180, 195, 175, 180);
      pg.rect(x, y, bambooWidth, bambooHeight);
    }
  }

  // Bamboo leaves
  let numberOfLeaves = 12;
  for (let i = 0; i < numberOfLeaves; i++) {
    let x = random(pg.width);
    let y = random(pg.height);
    let angle = random(-PI, PI / 2);
    let leafWidth = random(8, 10);
    let leafLength = random(40, 90);

    pg.push();
    pg.translate(x, y);
    pg.rotate(angle);

    pg.fill(200);
    pg.noStroke();
    pg.ellipse(0, 0, leafWidth, leafLength);

    pg.stroke(120);
    pg.strokeWeight(1);
    pg.pop();
  }
}

//Creature functions

function Creature() {
  xPos += creatureXSpeed;
  yPos += creatureYSpeed;

  // Bounce off edges
  if (xPos <= edge) {
    xPos = edge;
    creatureXSpeed *= -1;
  } else if (xPos >= width - edge) {
    xPos = width - edge;
    creatureXSpeed *= -1;
  }

  if (yPos <= edge) {
    yPos = edge;
    creatureYSpeed *= -1;
  } else if (yPos >= height - edge) {
    yPos = height - edge;
    creatureYSpeed *= -1;
  }

  // Avoid mouse
  let dMouse = dist(xPos, yPos, mouseX, mouseY);
  let safeDistance = 120;

  if (dMouse < safeDistance && dMouse > 0) {
    let pushForce = map(dMouse, 0, safeDistance, 5, 0);
    xPos += ((xPos - mouseX) / dMouse) * pushForce;
    yPos += ((yPos - mouseY) / dMouse) * pushForce;
  }

  drawCreature(xPos, yPos);
}

function drawCreature(x, y) {
  push();
  translate(x, y);
  scale(0.25);

  drawBody(0, 0, 50);

  drawLimps(-10, 20, 30, PI * 0.9);  // top left
  drawLimps(10, 20, 25, PI * 0.1);   // top right
  drawLimps(-10, 60, 40, PI * 0.7);  // middle left
  drawLimps(40, 50, 30, PI * 0.9);   // middle right
  drawLimps(-10, 110, 40, PI * 0.6); // bottom left
  drawLimps(10, 95, 45, PI * 0.35);  // bottom right
  drawBody(0, 0, 50);
  drawEyes(-15, -15, 15, PI * 0.2);  // left eye
  drawEyes(15, -15, 15, PI * 0.8);   // right eye
  drawPupil(-15, -15, 10);           // left
  drawPupil(15, -15, 10);            // right
  drawNose(0, -30, 20);

  // Wings
  let wingSwing = sin(frameCount * 0.18) * 0.35;
  drawWings(-20, 35, 40, PI + wingSwing);        // top left
  drawWings(20, 35, 40, 0 - wingSwing);          // top right
  drawWings(-15, 85, 35, PI * 1.05 + wingSwing); // bottom left
  drawWings(15, 85, 35, -PI * 0.05 - wingSwing); // bottom right

  pop();
}

function drawBody(x, y, size) {
  push();
  noStroke();
  translate(x, y);
  fill(0, 128, 0);
  ellipse(0, y, size, size);
  ellipse(0, y + size * 1.1, size * 0.6, size * 3);
  ellipse(0, y + size * 2.5, size * 0.2, size * 2);
  pop();
}

function drawLimps(x, y, len, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(41, 11, 6);
  strokeWeight(5);
  line(0, 0, len, 0);
  pop();
}

function drawEyes(x, y, size, angle) {
  push();
  translate(x, y);
  noStroke();
  rotate(angle);
  fill(0);
  ellipse(0, 0, size, size * 1.3);
  pop();
}

function drawPupil(x, y, size) {
  push();
  translate(x, y);
  noStroke();
  fill(255);
  rotate(frameCount * 0.01);
  ellipse(0, 0, size, size * 1.5);
  pop();
}

function drawNose(x, y, size) {
  push();
  translate(x, y);
  noStroke();
  fill(0);
  ellipse(0, 0, size * 0.1, size * 0.8);
  pop();
}

function drawWings(x, y, size, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(159, 195, 233);
  fill(159, 195, 233, 80);
  ellipse(size * 1, 0, size * 3, size * 1.5);
  pop();
}