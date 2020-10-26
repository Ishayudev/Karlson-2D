let karlson;
let sadkarlsonimg, happykarlsonimg;
let gamestate = "start";
let lava, gamebackground, bcimg, lavaimg;
var gem, gemimg, collectgroup, start, startimg;
let score,gems,milks;
let milk, milkimg,milkgroup,gemgroup;
let heading,headimg;

function preload() {
  sadkarlsonimg = loadImage("sad karlson.png");
  happykarlsonimg = loadImage("happy karlson.png");
  bcimg = loadImage("background-karlson.jpg");
  lavaimg = loadImage("ground img karl.png");
  gemimg = loadImage("gem.png");
  startimg = loadImage("start buuton.png");
  milkimg = loadImage("milk!.png");
  headimg=loadImage("karlson head.png");
}

function setup() {
  createCanvas(400, 400);

  // background
  gamebackground = createSprite(200, 200);
  gamebackground.scale = 3;
  gamebackground.addImage("bc", bcimg);
  //player
  karlson = createSprite(50, 200);
  karlson.scale = 0.030;
  karlson.addImage("karlson", sadkarlsonimg);
  //ground
  lava = createSprite(200, 220);
  lava.addImage("lava", lavaimg);
  collectgroup = new Group();
  start = createSprite(200, 240);
  start.addImage("st", startimg);
  start.scale = 0.20;

  gemgroup=new Group();
  milkgroup=new Group();
  
  heading=createSprite(200,140);
  heading.addImage("h",headimg);
  
  score=0;
  milks=0;
  gems=0;
}

function draw() {
  background("black");
  lava.setCollider("rectangle", 0, 130, 400, 60);
  karlson.setCollider("circle", -600, -500, 400);
  if (gamestate == "start") {
    start.visible = true;
    karlson.visible = false;
    if (mousePressedOver(start)) {
      gamestate = "play";
    }
    heading.visible=true;
  }


  if (gamestate == "play") {
    karlson.visible = true;
    //horizontal movement
    if (keyDown("RIGHT_ARROW")) {
      karlson.x = karlson.x + 4;
    } else if (keyDown("LEFT_ARROW")) {
      karlson.x = karlson.x - 4;
    } //jump
    if (keyDown("UP_ARROW")) {
      karlson.velocityY = -10;
    }
    start.visible = false;
    spawngem();
    
    if(karlson.isTouching(collectgroup)){
      if(karlson.isTouching(milkgroup)){milkgroup.destroyEach(); milks+=1; } 
      if(karlson.isTouching(gemgroup)){gemgroup.destroyEach(); gems+=1; }
    }
    
    if(karlson.isTouching(lava)){
      gamestate="end";
    }
    
      heading.visible=false;
    //gravity
    karlson.velocityY = karlson.velocityY + 0.8;
    
    if(frameCount%25==0){
      score+=1;
    }

  }//play

  
  
  drawSprites();
  fill("red");
  text("milks collected:"+milks,300,30);
  text("gems collected:"+gems,300,50);
  text("survival time:"+score,320,70);
  
  if(gamestate=="end"){
    karlson.visible=false;
    collectgroup.destroyEach();
    textSize(20);
    stroke("black");
    strokeWeight(4);
    text("YOU ARE DEAD",150,200);
  }

}

function spawngem() {
  if (frameCount % 110 == 0) {
    gem = createSprite(420, Math.round(random(20, 250)));
    gem.addImage("gem", gemimg);
    gem.scale = 0.25;
    gem.velocityX = -8;
    collectgroup.add(gem);
    gemgroup.add(gem);
  }

  if (frameCount % 80 == 0) {
    milk = createSprite(420, Math.round(random(20,250)));
    milk.scale = 0.5;
    milk.velocityX = -8;
    milk.addImage("ml", milkimg);
    collectgroup.add(milk);
    milkgroup.add(milk);
  }
}