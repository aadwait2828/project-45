var player,playerImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background,backgroundImage;
var healthyFoodImage;
var junkFoodImage;
var ground;
var healthyFoodGroup,junkFoodGroup;
var score = 0;

function preload(){
playerImage = loadAnimation("a.png","b.png","c.png");
backgroundImage = loadImage("jungle.jpg");
healthyFoodImage = loadImage("hf.png");
junkFoodImage = loadImage("jf.png");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
background = createSprite(50,150,windowWidth,600);
background.scale = 3.2;
background.addImage(backgroundImage);
background.velocityX= -3;
background.x = background.width/2;

player = createSprite(250,550,50,100);
player.scale = 1.5;
player.addAnimation("img",playerImage);
ground = createSprite(200,650,windowWidth,20);
ground.x = ground.width/2;
healthyFoodGroup = new Group();
junkFoodGroup = new Group();
}

function draw(){
	text("Score: "+score,500,50);
	if (gameState===PLAY){
if(background.x<0){
	background.x = background.width/2;
}
if (ground.x<0){
	ground.x = ground.width/2;
}
player.collide(ground);
if (keyDown("space") && player.y>=350){
	player.velocityY = -14;

}
player.velocityY = player.velocityY + 0.8;
spawnHealthyFood();
spawnJunkFood();
if (healthyFoodGroup.isTouching(player)){
	score = score +1;
}
if (junkFoodGroup.isTouching(player)){
	gameState = END;
}
	}
else if(gameState===END){
	player.velocityY=0;
	ground.velocityx=0;
	background.velocityX=0;
	healthyFoodGroup.setVelocityXEach(0);
	junkFoodGroup.setVelocityXEach(0);
	healthyFoodGroup.setLifetimeEach(-1);
	junkFoodGroup.setLifetimeEach(-1);
	player.y=545;
	}




drawSprites();
}

function spawnHealthyFood(){
	if (frameCount%120===0){
		var healthyFood = createSprite(1600,500,35,35);
		healthyFood.y = Math.round(random(200,400));
		healthyFood.scale = 0.4;
		healthyFood.addImage(healthyFoodImage);
		healthyFood.velocityX = -3;
		healthyFood.lifetime = 800;
		healthyFoodGroup.add(healthyFood);
		
	}


}
function spawnJunkFood(){
	if(frameCount%180===0){
		var junkFood = createSprite(1600,600,35,35);
		junkFood.debug=true;
		junkFood.y = Math.round(random(400,600));
		junkFood.scale = 0.4;
		junkFood.addImage(junkFoodImage);
		junkFood.velocityX = -4;
		junkFood.lifetime = 800;
		junkFoodGroup.add(junkFood);

		
	}

	

}