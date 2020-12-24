var monkey, running, collided
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = "play";

function preload() {


  running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //collided = loadImage("")   there was no image set for collided?

}



function setup() {

  createCanvas(450, 450);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("monkey_running", running);
  monkey.scale = 0.1


  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)

  FoodGroup = createGroup()
  obstacleGroup = createGroup()

}


function draw() {
  background(225);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (gameState === "play") {

    if (keyDown("space")) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    spawnBananas();

    spawnObstacles();

    if (monkey.isTouching(obstacleGroup) && gameState === "play") {
      gameState = "end";
    }

    if (gameState === "end") {
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);

      ground.velocityX = 0;
    }


    monkey.collide(ground);

    drawSprites();

    var survivalTime = 0;
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:", + score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time:" + survivalTime, 100, 50)    
  }

}


function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(450, 120, 40, 10);
    banana.y = Math.round(random(120, 200))
    banana.addImage(bananaImage, "banana.png")
    banana.scale = 0.1;
    banana.velocityX = -6
    FoodGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(450, 326, 50, 50);
    obstacle.addImage(obstacleImage, "obstacle.png")
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}