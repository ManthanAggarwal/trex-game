var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImg;
var CloudsGroup,ObstaclesGroup;
var o1,o2,o3,o4,o5,o6;
var restart, restartImg;
var gameover, gameoverImg;
var count = 0;
var jump,check,die;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  check = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(800, 300);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided);
  trex.scale = 0.5;
  
  gameover = createSprite(300,150,10,10);
  gameover.addImage(gameoverImg);
  gameover.visible = false
  
  restart = createSprite(300,180,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false

  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background(0);
  text("Score: "+ count, 250, 100);
  
  console.log(trex.y)
  
  if(gameState === PLAY){
     if(keyDown("space") && trex.y > 258) {
    trex.velocityY = -14;
    jump.play()   
  }
  count = count + Math.round(getFrameRate()/60);
  trex.velocityY = trex.velocityY + 0.8
    
   ground.velocityX = -(6 + 3*count/100);
    if (count>0 && count%100 === 0)
    { checkPointSound.play(); }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  } 
    spawnClouds();
    spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("die.mp3")
      gameState = END; 
      die.play()
    }
  }
   else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
     
    gameover.visible = true
    restart.visible = true
    
     
if(mousePressedOver(restart)){
reset()
 }  
    //change the trex animation
    //trex.setAnimation("trex_collided");
    trex.changeAnimation("collide",trex_collided);
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   }
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,320,40,10);
    cloud.y = random(80,180);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,265,10,40);
    obstacle.velocityX = -(6 + 3*count/100);
  
    //generate random obstacles
    var rand = Math.round(random(1,6));
   // console.log(rand);
    switch(rand){
      case 1:obstacle.addImage(o1);
        break;
             case 2:obstacle.addImage(o2);
        break;
             case 3:obstacle.addImage(o3);
        break;
             case 4:obstacle.addImage(o4);
        break;
             case 5:obstacle.addImage(o5);
        break;
             case 6:obstacle.addImage(o6);
        break;
        
        
    }   
  

    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 134;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
gameState = PLAY;
ObstaclesGroup.destroyEach();
CloudsGroup.destroyEach();
gameover.visible = false;
restart.visible = false;
trex.changeAnimation("running", trex_running);
count = 0  
}






