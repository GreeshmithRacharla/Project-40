var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var tiger,tigerimage,ground,groundimage,invisibleground;
var gameover,restart,gameoverimg,restartimg;
var jumpSound,checkPointSound,dieSound;

function preload() {

tigerimage = loadImage("Tiger.png"); 
groundimage = loadImage("ground2.png");
gameoverimg = loadImage("gameOver.png");
restartimg = loadImage("restart.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png"); 
obstacle3 = loadImage("obstacle3.png");
  
jumpSound = loadSound("jump.mp3")            
dieSound = loadSound("die.mp3")
checkPointSound = loadSound("checkPoint.mp3")
  
}

function setup(){
createCanvas(600,200);

tiger = createSprite(65,110,10,10);
tiger.addImage(tigerimage);
tiger.scale = 0.2;
  
  ground = createSprite(0,190,1200,5);
  ground.addImage(groundimage);
  ground.x = ground.width /2;
  
  invisibleground = createSprite(0,195,1200,5);
  invisibleground.visible = false;
  
  gameover = createSprite(300,100,5,5);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.4
  
  restart = createSprite(300,130,5,5);
  restart.addImage(restartimg);
  restart.scale = 0.4

  tiger.setCollider("rectangle",5,5,400,650); 
  tiger.debug = true;

obstaclesGroup = createGroup();
  score = 0;
}

function draw(){
  
  background("lightgreen");
  text("Score: "+score,500,50)
  
  tiger.collide(invisibleground);
  
  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    
     ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& tiger.y >= 100) {
        tiger.velocityY = -12;
        jumpSound.play();
    }
     tiger.velocityY = tiger.velocityY + 0.8;
    
    SpawnObstacles();
    
    if(obstaclesGroup.isTouching(tiger)){
        gameState = END;
        dieSound.play();
   }
 }
  else if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
  
      ground.velocityX = 0;
      tiger.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0); 
     
  if(mousePressedOver(restart)) {
      reset();
    }
   }
  
  
 drawSprites();
}

function reset(){
  
gameState = PLAY;
  
gameover.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
 score = 0;
}


function SpawnObstacles(){
  
  if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
    }
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
}
}