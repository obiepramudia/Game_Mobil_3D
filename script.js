import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// =====================================
// SCENE
// =====================================

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x6eb5ff);

// =====================================
// CAMERA
// =====================================

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

camera.position.set(
0,
8,
15
);

// =====================================
// RENDERER
// =====================================

const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.shadowMap.enabled =
true;

document.body.appendChild(
renderer.domElement
);

// =====================================
// LIGHTING
// =====================================

const hemiLight =
new THREE.HemisphereLight(
0xffffff,
0x4d6f33,
2
);

scene.add(
hemiLight
);

const sunLight =
new THREE.DirectionalLight(
0xffffff,
3
);

sunLight.position.set(
30,
40,
20
);

sunLight.castShadow =
true;

sunLight.shadow.mapSize.width =
2048;

sunLight.shadow.mapSize.height =
2048;

scene.add(
sunLight
);

// =====================================
// SUN
// =====================================

const sun =
new THREE.Mesh(

new THREE.SphereGeometry(
3,
32,
32
),

new THREE.MeshBasicMaterial({
color:0xffff00
})

);

sun.position.set(
30,
25,
-80
);

scene.add(
sun
);

// =====================================
// GROUND
// =====================================

const ground =
new THREE.Mesh(

new THREE.PlaneGeometry(
100,
300
),

new THREE.MeshStandardMaterial({
color:0x4CAF50
})

);

ground.rotation.x =
-Math.PI/2;

ground.receiveShadow =
true;

scene.add(
ground
);

// =====================================
// ROAD
// =====================================

const road =
new THREE.Mesh(

new THREE.BoxGeometry(
15,
0.1,
300
),

new THREE.MeshStandardMaterial({

color:0x222222,

roughness:1,

metalness:0

})

);

road.receiveShadow =
true;

scene.add(
road
);

// =====================================
// ROAD STRIPES
// =====================================

for(
let i=-140;
i<140;
i+=8
){

const stripe =
new THREE.Mesh(

new THREE.BoxGeometry(
0.3,
0.02,
4
),

new THREE.MeshStandardMaterial({
color:0xffffff
})

);

stripe.position.y =
0.06;

stripe.position.z =
i;

scene.add(
stripe
);

}

// =====================================
// TREES
// =====================================

function createTree(x,z){

const tree =
new THREE.Group();

const trunk =
new THREE.Mesh(

new THREE.CylinderGeometry(
0.4,
0.4,
2
),

new THREE.MeshStandardMaterial({
color:0x8B4513
})

);

const leaf =
new THREE.Mesh(

new THREE.SphereGeometry(
1.8,
20,
20
),

new THREE.MeshStandardMaterial({
color:0x228B22
})

);

leaf.position.y = 2;

tree.add(trunk);
tree.add(leaf);

tree.position.set(
x,
1,
z
);

scene.add(tree);

}

for(
let i=-140;
i<140;
i+=20
){

createTree(-20,i);
createTree(20,i);

}

// =====================================
// REALISTIC CLOUDS
// =====================================

function createCloud(x,z){

const cloud =
new THREE.Group();

for(
let i=0;
i<10;
i++
){

const puff =
new THREE.Mesh(

new THREE.SphereGeometry(
1 + Math.random(),
24,
24
),

new THREE.MeshStandardMaterial({
color:0xffffff
})

);

puff.position.set(

(Math.random()*6)-3,

Math.random()*2,

(Math.random()*3)-1.5

);

cloud.add(
puff
);

}

cloud.position.set(
x,
15 + Math.random()*4,
z
);

cloud.scale.set(
1.7,
1,
1
);

scene.add(
cloud
);

return cloud;

}

const cloud1 =
createCloud(-25,-40);

const cloud2 =
createCloud(15,-100);

const cloud3 =
createCloud(-10,-180);

//part 2
// =====================================
// CAR
// =====================================

const car =
new THREE.Group();

// BODY

const body =
new THREE.Mesh(

new THREE.BoxGeometry(
2.8,
0.8,
5
),

new THREE.MeshStandardMaterial({

color:0xcc0000,

metalness:0.7,

roughness:0.25

})

);

body.castShadow = true;

car.add(body);

// CABIN

const cabin =
new THREE.Mesh(

new THREE.BoxGeometry(
1.8,
0.9,
2.3
),

new THREE.MeshStandardMaterial({

color:0x222222,

metalness:0.5,

roughness:0.15

})

);

cabin.position.set(
0,
0.85,
-0.2
);

cabin.castShadow = true;

car.add(cabin);

// FRONT GLASS

const glass =
new THREE.Mesh(

new THREE.BoxGeometry(
1.75,
0.55,
0.08
),

new THREE.MeshStandardMaterial({

color:0x88ccff,

transparent:true,

opacity:0.7

})

);

glass.position.set(
0,
0.95,
1
);

glass.rotation.x =
Math.PI/7;

car.add(glass);

// HEADLIGHTS

const lampMaterial =
new THREE.MeshBasicMaterial({
color:0xffffaa
});

const lamp1 =
new THREE.Mesh(

new THREE.SphereGeometry(
0.15,
16,
16
),

lampMaterial
);

lamp1.position.set(
-0.8,
0,
2.45
);

car.add(lamp1);

const lamp2 =
lamp1.clone();

lamp2.position.x = 0.8;

car.add(lamp2);

// WHEELS

function createWheel(x,z){

const wheel =
new THREE.Mesh(

new THREE.CylinderGeometry(
0.45,
0.45,
0.55,
24
),

new THREE.MeshStandardMaterial({
color:0x111111
})

);

wheel.rotation.z =
Math.PI/2;

wheel.position.set(
x,
-0.5,
z
);

wheel.castShadow = true;

car.add(wheel);

}

createWheel(-1.15,-1.7);
createWheel(1.15,-1.7);

createWheel(-1.15,1.7);
createWheel(1.15,1.7);

car.position.y = 1;

scene.add(car);

// =====================================
// COINS
// =====================================

const coins = [];

function createCoin(){

const coin =
new THREE.Mesh(

new THREE.CylinderGeometry(
0.5,
0.5,
0.2,
32
),

new THREE.MeshStandardMaterial({
color:0xffd700
})

);

coin.rotation.x =
Math.PI/2;

coin.castShadow = true;

coin.position.set(

[-4,0,4][
Math.floor(
Math.random()*3
)
],

1,

-50 -
Math.random()*200

);

scene.add(coin);

coins.push(coin);

}

for(
let i=0;
i<10;
i++
){

createCoin();

}

// =====================================
// TRAFFIC CONE
// =====================================

const obstacles = [];

function createTrafficCone(){

const cone =
new THREE.Group();

const body =
new THREE.Mesh(

new THREE.ConeGeometry(
0.8,
2,
20
),

new THREE.MeshStandardMaterial({
color:0xff6600
})

);

body.position.y = 1;

cone.add(body);

const base =
new THREE.Mesh(

new THREE.BoxGeometry(
1.5,
0.2,
1.5
),

new THREE.MeshStandardMaterial({
color:0x222222
})

);

cone.add(base);

cone.position.set(

[-4,0,4][
Math.floor(
Math.random()*3
)
],

0,

-120 -
Math.random()*250

);

scene.add(cone);

obstacles.push(cone);

}

for(
let i=0;
i<4;
i++
){

createTrafficCone();

}

// =====================================
// UI
// =====================================

const scoreText =
document.getElementById(
"score"
);

const levelText =
document.getElementById(
"level"
);

const livesText =
document.getElementById(
"lives"
);

// =====================================
// GAME VARIABLES
// =====================================

let score = 0;

let level = 1;

let lives = 3;

let speed = 0.35;

let running = true;

// =====================================
// CONTROLS
// =====================================

let moveLeft = false;
let moveRight = false;

// KEYBOARD

window.addEventListener(
"keydown",
(e)=>{

if(e.key==="ArrowLeft")
moveLeft=true;

if(e.key==="ArrowRight")
moveRight=true;

}
);

window.addEventListener(
"keyup",
(e)=>{

if(e.key==="ArrowLeft")
moveLeft=false;

if(e.key==="ArrowRight")
moveRight=false;

}
);

// MOBILE

const leftBtn =
document.getElementById(
"leftBtn"
);

const rightBtn =
document.getElementById(
"rightBtn"
);

leftBtn.addEventListener(
"mousedown",
()=> moveLeft=true
);

leftBtn.addEventListener(
"mouseup",
()=> moveLeft=false
);

leftBtn.addEventListener(
"mouseleave",
()=> moveLeft=false
);

leftBtn.addEventListener(
"touchstart",
()=> moveLeft=true
);

leftBtn.addEventListener(
"touchend",
()=> moveLeft=false
);

rightBtn.addEventListener(
"mousedown",
()=> moveRight=true
);

rightBtn.addEventListener(
"mouseup",
()=> moveRight=false
);

rightBtn.addEventListener(
"mouseleave",
()=> moveRight=false
);

rightBtn.addEventListener(
"touchstart",
()=> moveRight=true
);

rightBtn.addEventListener(
"touchend",
()=> moveRight=false
);

// =====================================
// BUTTONS
// =====================================

const startBtn =
document.getElementById(
"startBtn"
);

const resetBtn =
document.getElementById(
"resetBtn"
);

startBtn.onclick = ()=>{

running = !running;

startBtn.innerText =
running
?
"Pause"
:
"Start";

};

resetBtn.onclick = ()=>{

location.reload();

};

//part 3

// =====================================
// UPDATE LIVES
// =====================================

function updateLives(){

    let text = "";

    for(let i=0;i<lives;i++){
        text += "❤️";
    }

    for(let i=lives;i<3;i++){
        text += "🤍";
    }

    livesText.innerText = text;

}

// =====================================
// RANDOM LANE
// =====================================

function randomLane(){

    const lanes = [-4,0,4];

    return lanes[
        Math.floor(
            Math.random()*3
        )
    ];

}

// =====================================
// RESPAWN
// =====================================

function respawnObject(obj){

    obj.position.z =
    -150 -
    Math.random()*250;

    obj.position.x =
    randomLane();

}

// =====================================
// COLLISION
// =====================================

function checkCollision(a,b){

    const dx =
    a.position.x -
    b.position.x;

    const dz =
    a.position.z -
    b.position.z;

    const distance =
    Math.sqrt(
        dx*dx +
        dz*dz
    );

    return distance < 2;

}

// =====================================
// GAME OVER
// =====================================

function gameOver(){

    running = false;

    document
    .getElementById("gameOver")
    .style.display = "flex";

}

// =====================================
// ANIMATION LOOP
// =====================================

function animate(){

    requestAnimationFrame(
        animate
    );

    // =========================
    // CLOUD ANIMATION
    // =========================

    cloud1.position.x += 0.01;

    cloud2.position.x += 0.015;

    cloud3.position.x += 0.008;

    if(cloud1.position.x > 40)
    cloud1.position.x = -40;

    if(cloud2.position.x > 40)
    cloud2.position.x = -40;

    if(cloud3.position.x > 40)
    cloud3.position.x = -40;

    // =========================
    // GAME LOGIC
    // =========================

    if(running){

        // =====================
        // CAR MOVEMENT
        // =====================

        if(moveLeft){

            car.position.x -= 0.30;

        }

        if(moveRight){

            car.position.x += 0.30;

        }

        car.position.x = Math.max(
            -5,
            Math.min(
                5,
                car.position.x
            )
        );

        // =====================
        // COINS
        // =====================

        coins.forEach(
            coin=>{

                coin.rotation.z +=
                0.10;

                coin.position.z +=
                speed;

                if(
                    coin.position.z > 15
                ){

                    respawnObject(
                        coin
                    );

                }

                if(
                    checkCollision(
                        car,
                        coin
                    )
                ){

                    score++;

                    scoreText.innerText =
                    score;

                    // LEVEL UP

                    if(
                        score % 10 === 0
                    ){

                        level++;

                        speed += 0.05;

                        levelText.innerText =
                        level;

                    }

                    respawnObject(
                        coin
                    );

                }

            }
        );

        // =====================
        // OBSTACLES
        // =====================

        obstacles.forEach(
            obstacle=>{

                obstacle.rotation.y +=
                0.03;

                obstacle.position.z +=
                speed;

                if(
                    obstacle.position.z > 15
                ){

                    respawnObject(
                        obstacle
                    );

                }

                if(
                    checkCollision(
                        car,
                        obstacle
                    )
                ){

                    lives--;

                    updateLives();

                    respawnObject(
                        obstacle
                    );

                    if(
                        lives <= 0
                    ){

                        gameOver();

                    }

                }

            }
        );

        // =====================
        // CAMERA FOLLOW
        // =====================

        camera.position.x +=

        (
            car.position.x -
            camera.position.x
        ) * 0.08;

        camera.position.y = 8;

        camera.position.z = 15;

        camera.lookAt(

            car.position.x,

            1,

            0

        );

    }

    renderer.render(
        scene,
        camera
    );

}

// =====================================
// INITIALIZE
// =====================================

updateLives();

animate();

// =====================================
// RESIZE
// =====================================

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect =

        window.innerWidth /

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }
);