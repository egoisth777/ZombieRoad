// define some sprites and groups

// sprites
let car;
let aim;
let road;
let building1;
let fuelbar;


// groups
let zombie_type1_group;
let zombie_type2_group;
let zombie_type3_group;
let blocker_group;
let bullet_group;



// images array
let car_imgs;
let rank_imgs;
let fuelbar_imgs;
let background_imgs;
let roadsign_imgs;
let explosion_imgs;



// single image
let flying_dragon_img;
let spinning_moon_img;
let road_img;
let aim_img;
let bullet_img;
let blocker_img;

// some constant arrays
const CAR_ANI_ARR = ["carAnimation0", "carAnimation1", "carAnimation2", "carAnimation3", "carAnimation4"];
const EX_ANI_ARR = ["explode1", "explode2", "explode3", "explode4"];
const FUEL = ["fuel1", "fuel2", "fuel3", "fuel4", "fuel5", "fuel6", "fuel7", "fuel8", "fuel9", "fuel10"];


// some constant numbers
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH  = 800;
const MARGIN = 40;

// some tracking information
let score;
let currentFuel;



// reload the game resources
preload = function(){
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
  explosion_imgs[0] = loadAnimation("./assets/effects/explode1.png", {size: [64,64], frames: 9});
  explosion_imgs[1] = loadAnimation("./assets/effects/explode2.png", {size: [64,64], frames: 25});
  explosion_imgs[2] = loadAnimation("./assets/effects/explode3.png", {size: [64,64], frames: 25});
  explosion_imgs[3] = loadAnimation("./assets/effects/explode4.png", {size: [64,64], frames: 25});

  
  // preload the aim image
  aim_img = loadAnimation("./assets/props/aim.png", {size: [64,64], frames: 12});

  // preload the bullet image
   bullet_img = loadAnimation("./assets/car/bullet1.png", {size:[32, 32], frames:6});
  
  // preload the building image
  building_img = loadAnimation("./assets/props/building1.png",{size:[300, 800], frames:1});

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
}



function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // set up some tracking information
  score = 0;
  currentFuel = 5;



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
    console.log(currentFuel);
    fuelbar.changeAnimation(FUEL[currentFuel - 1]);
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

}

function collect(car, gem) {
	gem.remove();
}

function draw() {
  // deduct the fuel for the monster
  background(0);
  carControl();
  out_of_road();
  out_of_boundary();
  
  // place to have the colliders
  
  bullet_group.collides(blocker_group, bulletHit);
  // car.collides(blocker_group, carHit);
  car.collides(blocker_group, carHit);

  // create two blockers if situation satisfies
  if (blocker_group.size() < 2){
    createBlocker(random(300, 500), 0, 5, 120);
  }
}

function carHit(car, sprite){
  createExplosion(car.x, car.y, 3, 10, 1); 
  currentFuel --;
  sprite.remove();
  if(currentFuel == 0){
    car.remove();
  }
}

function bulletHit(bullet, sprite){
  bullet.remove();
  sprite.remove();
}



// create a blocker object
function createBlocker(x, y, speed = 5){
  let blocker = new Sprite();
  blocker.addAni("blockerani", blocker_img);
  blocker.x = x;
  blocker.y = y;
  // blocker.kinematic = true;
  blocker.speed = speed;
  blocker.direction = 90;

  blocker_group.add(blocker);
}

// control the movement of the car
function carControl(){ 


  if(!car.removed && kb.presses('q')){
    createBullet(12, 30, bullet_img);
    car.changeAni(CAR_ANI_ARR[1]);
    createExplosion(car.x, car.y, 3, 10, 1);
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

  if(kb.presses('k')){
    createExplosion(100, 100, 2, 75, 12);
  }
}

function out_of_boundary() {

  
  for (var i = 0; i < allSprites.length; i++) {
    let s = allSprites[i];
    if(blocker_group.includes(s)){
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
  if(car.position.x > 500 || car.position.x < 300){
    car.remove();
    
  }
}

function createExplosion(x, y, type, life, scale){
  let o = new Sprite();
  o.addAni(EX_ANI_ARR[type - 1], explosion_imgs[type - 1]);
  o.life = life;
  o.scale = 1;
  o.position.x = x;
  o.position.y = y;
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