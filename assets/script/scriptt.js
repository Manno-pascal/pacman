const canvas = document.querySelector('#pacman-map');
const ctx = canvas.getContext('2d');


const maxWidth = 420;
const maxHeigth = 440;
let pacmanTableSkin = [];
let pacmanSkin = 0;
let refresh = 2;


let pacmanMunch = true;
let soundTable = {
    munch1: new Audio('/assets/sound/munch_1.wav'),
    munch2: new Audio('/assets/sound/munch_2.wav')
};



let pacman = {
    positionX: 0,
    positionY: 0,
    skin: "",
}

let direction = "ArrowLeft";
let move = "";

const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [5, 5, 5, 5, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 5, 5, 5, 5],
    [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 5, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0],

    [2, 2, 2, 2, 2, 1, 2, 2, 0, 5, 5, 5, 0, 2, 2, 1, 2, 2, 2, 2, 2],

    [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0],
    [5, 5, 5, 5, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 5, 5, 5, 5],
    [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 3, 1, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1, 1, 3, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const blockSize = 20;
//===========================



// initialisation des intervals
setInterval(pacmanMove, 50 * refresh)
// ===================


function soundbox(sound) {
    console.log(sound);
    switch (sound) {

        case "potatoes":
            soundTable.munch2.play();
            break;
        case "apple":
            soundTable.munch1.play();
            break;

        default:
            break;
    }



}

//animation de pacman
for (let i = 0; i < 4; i++) {
    img = new Image();
    img.src = `/assets/image/pac-${i}.gif`;
    pacmanTableSkin.push(img)
    setInterval(animatePacman, 500)


}

function animatePacman() {
    if (pacmanSkin == 4) {
        pacmanSkin = 0
    }
    pacman.skin = pacmanTableSkin[pacmanSkin]
    pacmanSkin++
}

function drawPacman(calcul) {

    map[pacman.positionY][pacman.positionX] = 2
    ctx.fillStyle = 'black';
    ctx.fillRect(pacman.positionX * blockSize, pacman.positionY * blockSize, blockSize, blockSize);
    switch (calcul) {
        case "ArrowLeft":
            pacman.positionX--
            if (map[pacman.positionY][pacman.positionX] == 1) {

                let whatMunch = pacmanMunch ? "apple" : "potatoes"
                soundbox(whatMunch)
                pacmanMunch = !pacmanMunch
            }
            break;
        case "ArrowRight":
            pacman.positionX++
            if (map[pacman.positionY][pacman.positionX] == 1) {
                let whatMunch = pacmanMunch ? "apple" : "potatoes"
                soundbox(whatMunch)
                pacmanMunch = !pacmanMunch
            }
            break;
        case "ArrowUp":
            pacman.positionY--
            if (map[pacman.positionY][pacman.positionX] == 1) {

                let whatMunch = pacmanMunch ? "apple" : "potatoes"
                soundbox(whatMunch)
                pacmanMunch = !pacmanMunch
            }
            break;
        case "ArrowDown":
            pacman.positionY++
            if (map[pacman.positionY][pacman.positionX] == 1) {

                let whatMunch = pacmanMunch ? "apple" : "potatoes"
                soundbox(whatMunch)
                pacmanMunch = !pacmanMunch
            }
            break;

        default:
            break;
    }
    map[pacman.positionY][pacman.positionX] = 4
    ctx.fillStyle = 'black';
    ctx.fillRect(pacman.positionX * blockSize, pacman.positionY * blockSize, blockSize, blockSize);
    ctx.beginPath();
    ctx.fillStyle = "yellow"
    ctx.arc((pacman.positionX * blockSize) + 10, (pacman.positionY * blockSize + 10), 10, 0, Math.PI * 3);
    ctx.fill();
    
}
//====================






//Génération de la map
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        ctx.fillStyle = 'orange';
        if (map[y][x] === 1) { //affichage des chemins avec bonus
            ctx.fillStyle = 'black';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            ctx.beginPath();
            ctx.fillStyle = "yellow"
            ctx.arc((x * blockSize) + 10, (y * blockSize + 10), 2, 0, Math.PI * 3);
            ctx.fill();
        } else if (map[y][x] === 2) { // affichage des chemins sans bonus
            ctx.fillStyle = 'black';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        } else if (map[y][x] === 0) { //affichage des murs
            ctx.fillStyle = 'white';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        } else if (map[y][x] === 3) { // affichage des bonus oranges
            ctx.fillStyle = 'black';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            superBonusInterval = window.setInterval(() => {
                ctx.beginPath();
                ctx.fillStyle = "orange"
                ctx.arc((x * blockSize) + 10, (y * blockSize + 10), 4, 0, Math.PI * 3);
                ctx.fill();
                setTimeout(() => {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }, 600);
            }, 1000)
        } else if (map[y][x] === 5) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        } else if (map[y][x] === 4) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            ctx.beginPath();
            ctx.fillStyle = "yellow"
            ctx.arc((x * blockSize) + 10, (y * blockSize + 10), 10, 0, Math.PI * 3);
            ctx.fill();
        }

    }

}
//====================



//écoute du clavier
document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown") {
        direction = event.key
    }

})
//=================


for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 4) {
            pacman.positionX = j
            pacman.positionY = i
        }
    }
}



function pacmanMove() {


    if (pacman.positionY == 10 && pacman.positionX== 0) {
        pacman.positionX = 20
        map[10][0] = 2
        ctx.fillStyle = 'black';
        ctx.fillRect(0 * blockSize, 10 * blockSize, blockSize, blockSize);


    }else if (pacman.positionY == 10 && pacman.positionX == 20) {
        pacman.positionX = 0
        map[10][20] = 2
        ctx.fillStyle = 'black';
        ctx.fillRect(20 * blockSize, 10 * blockSize, blockSize, blockSize);
    }


    if (move == "") {
        move = direction
    }

    if (move != "") {

        if (move != direction) {
            if (direction == "ArrowLeft" && (map[pacman.positionY][pacman.positionX - 1] == 1 || map[pacman.positionY][pacman.positionX - 1] == 2 || map[pacman.positionY][pacman.positionX - 1] == 3)) {
                drawPacman(direction)
                move = direction

            } else if (direction == "ArrowRight" && (map[pacman.positionY][pacman.positionX + 1] == 1 || map[pacman.positionY][pacman.positionX + 1] == 2 || map[pacman.positionY][pacman.positionX + 1] == 3)) {
                drawPacman(direction)
                move = direction

            } else if (direction == "ArrowUp" && (map[pacman.positionY - 1][pacman.positionX] == 1 || map[pacman.positionY - 1][pacman.positionX] == 2 || map[pacman.positionY - 1][pacman.positionX] == 3)) {

                drawPacman(direction)
                move = direction

            } else if (direction == "ArrowDown" && (map[pacman.positionY + 1][pacman.positionX] == 1 || map[pacman.positionY + 1][pacman.positionX] == 2 || map[pacman.positionY + 1][pacman.positionX] == 3)) {
                drawPacman(direction)
                move = direction

            } else {
                if (move == "ArrowLeft" && (map[pacman.positionY][pacman.positionX - 1] == 1 || map[pacman.positionY][pacman.positionX - 1] == 2 || map[pacman.positionY][pacman.positionX - 1] == 3)) {
                    drawPacman(move)

                } else if (move == "ArrowRight" && (map[pacman.positionY][pacman.positionX + 1] == 1 || map[pacman.positionY][pacman.positionX + 1] == 2 || map[pacman.positionY][pacman.positionX + 1] == 3)) {
                    drawPacman(move)

                } else if (move == "ArrowUp" && (map[pacman.positionY - 1][pacman.positionX] == 1 || map[pacman.positionY - 1][pacman.positionX] == 2 || map[pacman.positionY - 1][pacman.positionX] == 3)) {
                    drawPacman(move)

                } else if (move == "ArrowDown" && (map[pacman.positionY + 1][pacman.positionX] == 1 || map[pacman.positionY + 1][pacman.positionX] == 2 || map[pacman.positionY + 1][pacman.positionX] == 3)) {
                    drawPacman(move)

                }

            }

        } else if (move == direction) {
            ctx.fillStyle = 'green';




            if (move == "ArrowLeft" && (map[pacman.positionY][pacman.positionX - 1] == 1 || map[pacman.positionY][pacman.positionX - 1] == 2 || map[pacman.positionY][pacman.positionX - 1] == 3)) {
                drawPacman(move)
            } else if (move == "ArrowRight" && (map[pacman.positionY][pacman.positionX + 1] == 1 || map[pacman.positionY][pacman.positionX + 1] == 2 || map[pacman.positionY][pacman.positionX + 1] == 3)) {
                drawPacman(move)
            } else if (move == "ArrowUp" && (map[pacman.positionY - 1][pacman.positionX] == 1 || map[pacman.positionY - 1][pacman.positionX] == 2 || map[pacman.positionY - 1][pacman.positionX] == 3)) {
                drawPacman(move)
            } else if (move == "ArrowDown" && (map[pacman.positionY + 1][pacman.positionX] == 1 || map[pacman.positionY + 1][pacman.positionX] == 2 || map[pacman.positionY + 1][pacman.positionX] == 3)) {
                drawPacman(move)
            }
        }
    }
}





// fonction pour tracer les murs carrés
function rectArrondi(ctx, x, y, width, heigth, rayon) {

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(x, y + rayon);
    ctx.lineTo(x, y + heigth - rayon);
    ctx.quadraticCurveTo(x, y + heigth, x + rayon, y + heigth);
    ctx.lineTo(x + width - rayon, y + heigth);
    ctx.quadraticCurveTo(x + width, y + heigth, x + width, y + heigth - rayon);
    ctx.lineTo(x + width, y + rayon);
    ctx.quadraticCurveTo(x + width, y, x + width - rayon, y);
    ctx.lineTo(x + rayon, y);
    ctx.quadraticCurveTo(x, y, x, y + rayon);
    ctx.stroke();
}

//fonction pour tracer les murs
function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}






















































// ctx.strokeStyle = "blue";
// rectArrondi(ctx, 2 * blockSize + 5, 2 * blockSize + 5, 50, 30, 10)
// rectArrondi(ctx, 6 * blockSize + 5, 2 * blockSize + 5, 50, 30, 10)
// rectArrondi(ctx, 16 * blockSize + 5, 2 * blockSize + 5, 50, 30, 10)
// rectArrondi(ctx, 12 * blockSize + 5, 2 * blockSize + 5, 50, 30, 10)
// rectArrondi(ctx, 2 * blockSize + 5, 5 * blockSize + 5, 50, 10, 5)
// rectArrondi(ctx, 16 * blockSize + 5, 5 * blockSize + 5, 50, 10, 5)
// rectArrondi(ctx, 6 * blockSize + 5, 11 * blockSize + 5, 10, 50, 5)
// rectArrondi(ctx, 14 * blockSize + 5, 11 * blockSize + 5, 10, 50, 5)
// rectArrondi(ctx, 12 * blockSize + 5, 15 * blockSize + 5, 50, 10, 5)
// rectArrondi(ctx, 6 * blockSize + 5, 15 * blockSize + 5, 50, 10, 5)
// rectArrondi(ctx, 8 * blockSize + 5, 9 * blockSize + 5, 90, 50, 10)
// rectArrondi(ctx, 8 * blockSize + 10, 9 * blockSize + 10, 80, 40, 10)


// // rectArrondiss(ctx, 6.5 * blockSize + 5, 7 * blockSize + 5, 40, 10, 5)
// rectArrondisss(ctx, 6 * blockSize + 5, 5 * blockSize + 5, 10, 90, 5)


// function rectArrondisss(ctx, x, y, width, heigth, rayon) {
    // ctx.beginPath();
    // ctx.strokeStyle = "blue";
    // ctx.moveTo(6 * blockSize + 5, 5 * blockSize + 5 + rayon);
    // ctx.lineTo(6 * blockSize + 5, 5 * blockSize + 5 + heigth - rayon);
    // ctx.quadraticCurveTo(6 * blockSize + 5, 5 * blockSize + 5 + heigth, 6 * blockSize + 5 + rayon, 5 * blockSize + 5 + heigth);
    // ctx.lineTo(6 * blockSize + 5 + width - rayon, 5 * blockSize + 5 + heigth);
    // ctx.quadraticCurveTo(6 * blockSize + 5 + width, 5 * blockSize + 5 + heigth, 6 * blockSize + 5 + width, 5 * blockSize + 5 + heigth - rayon);
    // ctx.lineTo(6 * blockSize + 5 + width, (5 * blockSize + 5+(5 * blockSize + 5)/2 + rayon));
    // ctx.quadraticCurveTo( 6.5 * blockSize + 5, 7 * blockSize + 5 + 10,  6.5 * blockSize + 5 + rayon, 7 * blockSize + 5 + 10);
    // ctx.lineTo( 6.5 * blockSize + 5 + 40 - rayon, 7 * blockSize + 5 + 10);
    // ctx.quadraticCurveTo( 6.5 * blockSize + 5 + 40, 7 * blockSize + 5 + 10,  6.5 * blockSize + 5 + 40, 7 * blockSize + 5 + 10 - rayon);
    // ctx.lineTo( 6.5 * blockSize + 5 + 40, 7 * blockSize + 5 + rayon);
    // ctx.quadraticCurveTo( 6.5 * blockSize + 5 + 40, 7 * blockSize + 5,  6.5 * blockSize + 5 + 40 - rayon, 7 * blockSize + 5);
    // ctx.lineTo( 6.5 * blockSize + 5 + rayon, 7 * blockSize + 5);
    // ctx.quadraticCurveTo( 6.5 * blockSize + 5, 7 * blockSize + 5,  6.5 * blockSize + 5, 7 * blockSize + 5 - rayon);
    // ctx.lineTo(6 * blockSize + 5 + width, y + rayon);
    // ctx.quadraticCurveTo(6 * blockSize + 5+ width, y, 6 * blockSize + 5 + width - rayon, y);
    // ctx.lineTo(6 * blockSize + 5 + rayon, y);
    // ctx.quadraticCurveTo(6 * blockSize + 5, y, 6 * blockSize + 5, y + rayon);
    // ctx.stroke();

// }




