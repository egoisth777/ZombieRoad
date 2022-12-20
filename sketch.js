

// define the background music
let background_music;
let sound_effect_1;
let sound_effect_2;


// define the title images
let title_img;

// define some sprites and groups
let buttonStart;
let buttonEnd;
         

// sprites
let car;
let aim;
let road;
let building1;
let fuelbar;
let rankcount;
let rank;


// groups
let zombie_type1_group; // walking dead straight
let zombie_type2_group; // walking dead left
let zombie_type3_group; // walking dead right
let zombie_type4_group; // greasy ball
let zombie_type5_group; // nacromen_1
let blocker_group;      // asteroid blocker
let bullet_group;
let fuel_group;
let death_bullet_group; // create a group of death bullet
let rank_count_group;



// images array
let car_imgs;
let rank_imgs;
let fuelbar_imgs;
let background_imgs;
let explosion_imgs;
let zombie_imgs;
let building_img2;


// single image
let flying_dragon_img;
let spinning_moon_img;
let road_img;
let aim_img;
let bullet_img;
let blocker_img;
let fuel_img;
let death_bullet_img;
let building2;
let rankcount_img;
let ending_img;

// some constant arrays
const CAR_ANI_ARR = ["carAnimation0", "carAnimation1", "carAnimation2", "carAnimation3", "carAnimation4"];
const EX_ANI_ARR = ["explode1", "explode2", "explode3", "explode4"];
const FUEL = ["fuel1", "fuel2", "fuel3", "fuel4", "fuel5", "fuel6", "fuel7", "fuel8", "fuel9", "fuel10"];
const ZOM_ANI_ARR = ["zombie1", "zombie2", "zombie3", "zombie4", "zombie5"];
const RANKS = ["rank1", "rank2", "rank3"];
  

// some constant numbers
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH  = 800;
const MARGIN = 40;
const GLOBAL_TIME_MAX = 100;



// some tracking information
let score;
let currentFuel;
let currentKill;
let death_shooting_counter;
let rank_count;
let super_rank_count;
let state = 0;
let music = 0;


// reload the game resources
preload = function(){
  // load the title and ending images
  title_img = loadImage("./assets/title.png");
  ending_img = loadImage("./assets/ending.png");
  background_music = loadSound("./assets/music/in_game.mp3");
  sound_effect_1 = loadSound("./assets/music/shooting.wav"); 


  // preload car animation
  car_imgs = new Array();
  car_imgs.length = 5;
  car_imgs[0] = loadAnimation("./assets/car/car_move.png", {size: [64, 64], frames: 7});
  car_imgs[1] = loadAnimation("./assets/car/car_shoot.png", {size: [64, 64], frames: 8});
  car_imgs[2] = loadAnimation("./assets/car/car_fire.png", {size: [64, 64], frames: 10});
  for(let i = 0; i < car_imgs.size; i++){
    car_imgs[i].frameDelay = 0.1;
  }

  // preload the road animation
  road_img = loadAnimation("./assets/props/road.png", {size:[200, 800], frames:16});
  
  // preload the explosion animation
  explosion_imgs = new Array();
  explosion_imgs.length = 4;
  explosion_imgs[0] = loadAnimation("./assets/effects/explode1.png", {size: [32,32], frames: 9});
  explosion_imgs[1] = loadAnimation("./assets/effects/explode2.png", {size: [64,64], frames: 25});
  explosion_imgs[2] = loadAnimation("./assets/effects/explode3.png", {size: [64,64], frames: 25});
  explosion_imgs[3] = loadAnimation("./assets/effects/explode4.png", {size: [64,64], frames: 25});

  
  // preload the aim image
  aim_img = loadAnimation("./assets/props/aim.png", {size: [64,64], frames: 12});

  // preload the bullet image
   bullet_img = loadAnimation("./assets/car/bullet1.png", {size:[32, 32], frames:6});
  
  
  building_img = loadAnimation("./assets/props/building1.png",{size:[300, 800], frames:1});
  building_img2 = loadAnimation("./assets/props/building2.png", {size:[300, 800], frames: 1});
  // preload the blockers
  blocker_img = loadAnimation("./assets/props/blocker.png", {size:[64, 64], frames:1});

  // preload the fuel_bar
  fuelbar_imgs = new Array();
  fuelbar_imgs[0] = loadAni("./assets/props/fueltanks/fueltank_00.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[1] = loadAni("./assets/props/fueltanks/fueltank_01.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[2] = loadAni("./assets/props/fueltanks/fueltank_02.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[3] = loadAni("./assets/props/fueltanks/fueltank_03.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[4] = loadAni("./assets/props/fueltanks/fueltank_04.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[5] = loadAni("./assets/props/fueltanks/fueltank_05.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[6] = loadAni("./assets/props/fueltanks/fueltank_06.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[7] = loadAni("./assets/props/fueltanks/fueltank_07.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[8] = loadAni("./assets/props/fueltanks/fueltank_08.png", { size: [64, 64], frames: 1 });
  fuelbar_imgs[9] = loadAni("./assets/props/fueltanks/fueltank_09.png", { size: [64, 64], frames: 1 });

  // preload the zombies
  zombie_imgs = new Array();
  zombie_imgs[0] = loadAni("./assets/zombies/walking_dead_straight.png", {size:[64, 64], frames: 4});
  zombie_imgs[1] = loadAni("./assets/zombies/walking_dead_left.png", {size: [64, 64], frames: 5});
  zombie_imgs[2] = loadAni("./assets/zombies/walking_dead_right.png", {size: [64, 64], frames: 5});
  zombie_imgs[3] = loadAni("./assets/zombies/nacromen_1.png", {size: [64, 64], frames: 5});
  zombie_imgs[4] = loadAni("./assets/zombies/greasy_ball_1.png", {size: [32, 32], frames: 10});
  
  // load the fuel
  fuel_img = loadAni("./assets/props/fuel.png", {size: [32, 32], frames: 4});
  
  // load the death_bullet animation
  death_bullet_img = loadAni("./assets/effects/death_bullet.png", {size: [48, 64], frames: 12}); 


  // load the ranks images
  rank_imgs = new Array();
  rank_imgs[0] = loadAni("./assets/props/rank1.png", {size:[64,64], frames: 2});
  rank_imgs[1] = loadAni("./assets/props/rank2.png", {size:[64,64], frames: 1});
  rank_imgs[2] = loadAni("./assets/props/rank3.png", {size:[64,64], frames: 1});


  // load the rank count images
  rankcount_img = loadAni("./assets/props/ranks_count.png", {size: [32,32], frames:15});
  

  


  // load the background music and other staff
}

function mousePress1(){
  state = 1;
  setup();
}

function mousePress2(){
  state = 1;
  setup();
}


let created = 0;

function setup() {
  console.log(state);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  if(state === 0){
    buttonStart = createButton("HangIn");
    buttonStart.position(350, 700);
    buttonStart.style('font-size', '30px');
    buttonStart.style('color', 'white');
    buttonStart.style('font-family', 'helvetica');
    buttonStart.style('background-color', 'red');
    buttonStart.size(150, 100);
    buttonStart.mousePressed(mousePress1);
    return;
  }
  if(state === 1){
    startMainGame();
    buttonStart.hide();
    buttonEnd.hide();
    return;
  }
}

function buttonLogic(){
      buttonEnd = createButton("HashBack");
      buttonEnd.position(100, 700);
      buttonEnd.style('font-size', '30px');
      buttonEnd.style('color', 'white');
      buttonEnd.style('font-family', 'helvetica');
      buttonEnd.style('background-color', 'red');
      buttonEnd.size(150, 100);
      buttonEnd.mousePressed(mousePress2);
      created = 1;
}
function startMainGame(){
  death_shooting_counter = 0;
  rank_count = 0;
  super_rank_count = 0;
  // play the background music
  if(music === 0){
  background_music.play();
  background_music.loop();
  background_music.setVolume(0.3);
  userStartAudio(); 
  music++;
  }

  // set up some tracking information
  score = 0;
  currentFuel = 5;
  currentKill = 0;



  // set up the car sprite
  car = new Sprite();
  car.addAni(CAR_ANI_ARR[2], car_imgs[2]); // car fire missle animation
  car.addAni(CAR_ANI_ARR[1], car_imgs[1]); // car fire bullets animation
  car.addAni(CAR_ANI_ARR[0], car_imgs[0]); // car move animation
   
  
  // car.addAni(CAR_ANI_ARR[3], car_imgs[3]); // car upgraded move animation
  // car.addAni(CAR_ANI_ARR[4], car_imgs[4]); // car upgraded move animation
  car.position.y = CANVAS_HEIGHT/ 4 * 3;
  car.position.x = CANVAS_WIDTH / 2;
  car.kinematic = true;
  car.layer = 2;
  car.update = function(){
    if(currentFuel > 0 && currentFuel <= 10){
      fuelbar.changeAnimation(FUEL[currentFuel - 1]);
    }
  }
  
  // set the road
  road = new Sprite();
  road.addAni("road", road_img);
  road.position.y = CANVAS_HEIGHT/ 2;
  road.position.x = CANVAS_WIDTH / 2;
  road.removeColliders();
  road.layer = 1;

  aim = new Sprite();
  aim.addAni("aim", aim_img);
  aim.removeColliders();
  aim.layer = 3;
  aim.update = function(){
    aim.position.x = mouse.x;
    aim.position.y = mouse.y;
  }

  // set up the building
  building1 = new Sprite();
  building1.addAni("building", building_img);
  building1.x = CANVAS_WIDTH / 16 * 3;
  building1.y = CANVAS_HEIGHT / 2;
  building1.removeColliders();
  building1.layer = 0;

  building2 = new Sprite();
  building2.addAni("building", building_img2);
  building2.x = CANVAS_WIDTH / 16 * 13;
  building2.y = CANVAS_HEIGHT / 2;
  building2.removeColliders();
  building2.layer = 0;

  
  

  // set up the blocker
  // remove everything in the group
  blocker_group = new Group();
  blocker_group.removeAll();
  bullet_group = new Group();
  bullet_group.removeAll(); 
  // set up the fuel bar
  fuelbar = new Sprite();
  fuelbar.removeColliders();
  for(let i = 0; i < fuelbar_imgs.length; i++){
   fuelbar.addAni(FUEL[i], fuelbar_imgs[i]);
  }
  fuelbar.changeAnimation(FUEL[currentFuel - 1]);
  fuelbar.x = width / 2;
  fuelbar.y = 15 * height / 16;
  
  death_bullet_group = new Group();
  death_bullet_group.removeAll();  


  // set up the zombies
  zombie_type1_group = new Group();
  zombie_type2_group = new Group();
  zombie_type3_group = new Group();
  zombie_type4_group = new Group();
  zombie_type5_group = new Group();
  fuel_group = new Group();

  // set up the rank and rank counts
  rank = new Sprite()
  rank.x = fuelbar.x - 100;
  rank.y = fuelbar.y;
  rank.removeColliders();
  rank.addAni(RANKS[2], rank_imgs[2]); 
  rank.addAni(RANKS[1], rank_imgs[1]); 
  rank.addAni(RANKS[0], rank_imgs[0]);
  rank.update = function(){
    if(rank_count > 10 && rank_count_group.size() <= 15){
      rank_count = 0;
      createRankCount();
    }

    if(rank_count_group.size() > 0 && rank_count_group.size() <= 5){
      super_rank_count = 0;
    }else if(rank_count_group.size() > 5 && rank_count_group.size() <= 10){
      super_rank_count = 1;
    }else{
      super_rank_count = 2; 
    }
    rank.changeAnimation(RANKS[super_rank_count]);
  } 
  // create rank count group
  rank_count_group = new Group();  
  // create Necromen
  createZombie(100, 100, 4, 2);
  // test
  createZombie(100, 100, 1, 1, 120);
  createRankCount();
}

function collectFuel(car, sprite) {
	sprite.remove();
  currentFuel++; 
}

function draw() {
  // deduct the fuel for the monster
  if(state === 0){
    background(title_img);
  }else if(state === 1){
    drawMainGame();
  }else{
    created = 0;
    allSprites.removeAll();
    ending_Screen();
  }
}

function ending_Screen(){
      background(ending_img);
      console.log(created);
      if(created != 1){
        buttonLogic();
      }
}

function drawMainGame(){

  background(0);

  if(car.removed){
    state = 2;
  }
  carControl();
  out_of_road();
  out_of_boundary();
 
  // place to have the colliders
  
  bullet_group.collides(zombie_type1_group, bulletHit);
  car.collides(death_bullet_group, carHit2);
  // death_bullet_group.collides(car, carHit);
  car.collides(zombie_type1_group, carHit);
  car.collides(fuel_group, collectFuel);
  car.collides(zombie_type5_group, carHit3);
  // create two blockers if situation satisfies
  if (zombie_type1_group.size() < 5){
    createZombie(random(300, 500), 0, 1, 1, 300);
  }
  if (zombie_type5_group.size() < 1){
    createZombie(random(100, 700), random(100, 700), 5, 1, 300);
  }
  if(currentKill >= 15){
    currentKill = 0;
    createFuel(car.x, car.y);
  }
}


function carHit(car, sprite){
  createExplosion(car.x, car.y, 3, 10, 1); 
  if(currentFuel - 1 > 0){
      currentFuel--;
  } else{
    car.remove();
  }
  sprite.remove();
}

function carHit2(car, sprite){
  createExplosion(car.x, car.y, 4, 20, 3); 
  if (currentFuel - 1 > 0){
    currentFuel --;
  }else{
    car.remove()
  }
  sprite.remove();
}

function carHit3(car, sprite){
  createExplosion(car.x, car.y, 1, 20, 3); 
  if (currentFuel - 2 > 0){
    currentFuel -=2;
  }else{
    car.remove();
  }
  sprite.remove();
}

function bulletHit(bullet, sprite){
  createExplosion(sprite.x, sprite.y, 1, 20, 3); 
  sprite.remove();
  bullet.remove();
  score ++;
  currentKill++;
  rank_count++;
}




// control the movement of the car
function carControl(){ 

  if(!car.removed && kb.presses('q')){
    createBullet(12, 30, bullet_img);
    car.changeAni(CAR_ANI_ARR[1]);
    createExplosion(car.x, car.y, 3, 10, 1);
    sound_effect_1.play();
    sound_effect_1.setVolume(0.1);
  }else{
    car.changeAni(CAR_ANI_ARR[0]);
  }

  if (kb.presses('down') || kb.presses('S') || kb.pressing('down') || kb.pressing('S')) {
      car.move(50, 'down', 3);
  }
  if (kb.presses('up') || kb.presses('W') || kb.pressing('up') || kb.pressing('W')) {
      car.move(50, 'up', 3);
  }

  if (kb.presses('left') || kb.presses('A') || kb.pressing('left') || kb.pressing('A')) {
      car.move(50, 'left', 3);
  }

  if (kb.presses('right') || kb.presses('D') || kb.pressing('right') || kb.pressing('D')) {
   car.move(50, 'right', 3);
  }

  if(kb.presses('e')){
    if(rank_count_group.size() >= 5){
      rank_count_group.removeAll();
      zombie_type1_group.removeAll();
      createExplosion(mouse.x, mouse.y, 2, 75, 12);
    }
  }
}

function out_of_boundary() {

  
  for (var i = 0; i < allSprites.length; i++) {
    let s = allSprites[i];
    if(zombie_type1_group.includes(s)){
      if (s.position.x < -MARGIN) {
        s.remove();
      } else if (s.position.x > width + MARGIN) {
        s.remove();
      }
      if (s.position.y < -MARGIN) {
        s.remove();
      } else if (s.position.y > height + MARGIN) {
        s.remove();
      }
    }
    
    if (s.position.x < -MARGIN) {
      s.position.x = width + MARGIN;
    } else if (s.position.x > width + MARGIN) {
      s.position.x = -MARGIN;
    }
    if (s.position.y < -MARGIN) {
      s.position.y = height + MARGIN;
    } else if (s.position.y > height + MARGIN) {
      s.position.y = -MARGIN;
    }
  }
}

// what happens if the car is placed of the the road

function out_of_road(){
  if(car.position.x > 550 || car.position.x < 250){
    car.remove();
    createExplosion(car.x, car.y, 4, 10, 2)    
  }
}

function createExplosion(x, y, type, life, scale){
  let o = new Sprite();
  o.addAni(EX_ANI_ARR[type - 1], explosion_imgs[type - 1]);
  o.ani.scale = scale;
  o.life = life;
  o.position.x = x;
  o.position.y = y;
  o.layer = 5;
  o.removeColliders();
}

/**
 * Create a single Bullet
 * @param { } speed 
 * @param { } life 
 * @param {*} animation 
 */
function createBullet(speed = 13, life, animation){
  // find angle between two points
  
  let bullet = new Sprite();
  bullet.addAni("animation", animation);
  bullet.life = life;
  // bullet.changeAnimation(animation);
  bullet.x = car.x;
  bullet.y = car.y;

  // setting the angle between
  bullet.layer = 3;
  let v0 = createVector(car.x, car.y);
  let v1 = createVector(50,0);
  let v2 = createVector(mouse.x- v0.x, mouse.y - v0.y);
  bullet.direction = v1.angleBetween(v2);
  
  bullet.speed = speed;
  bullet.kinematic = true;
  bullet_group.add(bullet);
}

// create zombies according to their types
function createZombie(x, y, type, scale = 0.7, life){
   let zombie = new Sprite();
   for(let i = 0; i < zombie_imgs.length; i++){
    zombie.addAni(ZOM_ANI_ARR[i], zombie_imgs[i]);
   }
    zombie.changeAnimation(ZOM_ANI_ARR[type - 1]); 
    zombie.life = life;
    zombie.x = x;
    zombie.y = y;
   if(type === 1){ // create the straight walking dead
    zombie.speed = 5;
    zombie.direction = 90; 
    zombie.bounciness = 0;
    zombie_type1_group.add(zombie);   
   }else if(type === 2){
    zombie_type2_group.add(zombie);
   }else if(type === 3){
    zombie_type3_group.add(zombie); 
   }else if(type === 4){ // create nacromen
    zombie.kinematic = true;
    zombie.ani.scale = 2;
    zombie.update = function(){
        death_shooting_counter ++;
        if(death_shooting_counter >= GLOBAL_TIME_MAX){
          death_shooting_counter = 0;
          createDeathBullet(zombie.x, zombie.y, 100, 6, death_bullet_img, 1);
        }
    }
    zombie_type4_group.add(zombie); 
   }else{
    zombie.speed = random(1,3);
    zombie.direction = random(0, 360);
    zombie.ani.scale = 3;
    zombie.scale = 3;
    zombie_type5_group.add(zombie);
   }
}




// the bullet of necromen
function createDeathBullet(x, y, life, speed, animation, scale = 1){
  let bullet = new Sprite();
  bullet.addAni("animation", animation);
  bullet.life = life;
  // bullet.changeAnimation(animation);
  bullet.x = x;
  bullet.y = y;

  // setting the angle between
  bullet.layer = 3;
  let v0 = createVector(x, y);
  let v1 = createVector(50,0);
  let v2 = createVector(car.x- v0.x, car.y - v0.y);
  bullet.direction = v1.angleBetween(v2);
  bullet.speed = speed;
  death_bullet_group.add(bullet);
  bullet.scale = scale;  
}

function createFuel(x, y){
  let fuel = new Sprite();
  fuel.x = x;
  fuel.y = y;
  fuel.addAni("fuel", fuel_img);
  fuel_group.add(fuel);
}

function near(sprite1, sprite2){
  function dist(x1,x2,y1,y2){
    Math.pow((x1-x2), 2)- Math.pow((y1-y2), 2);
  }
  if(dist(sprite1.x, sprite2.x, sprite1.y, sprite2.y) < 10){
    return true;
  }
  return false;
}

function createRankCount(){
  let rankcount = new Sprite();
  rankcount.removeColliders();
  rankcount.addAni( "rankcountimg", rankcount_img);
  rank_count_group.add(rankcount);  
  let size = rank_count_group.size();
  rankcount.position.x = fuelbar.position.x + 80 + 30 * (size % 6);
  rankcount.position.y = fuelbar.position.y + 30 * floor((size/6));
}