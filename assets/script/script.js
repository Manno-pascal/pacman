const canvas = document.querySelector('#pacmanMap');
const ctx = canvas.getContext('2d');
const menu = document.querySelector('#menu')
const pacmanMap = document.querySelector('#pacmanMap')
const btnStartGame = document.querySelector('#startGame')
const displayScore = document.querySelector('#score')
const fruit = document.querySelector('#fruit')
const lifes = document.querySelectorAll('.life')
const maxWidth = 420;
const maxHeigth = 440;
const blockSize = 20;
let appears = true
let play = false

const sprite = new Image(); 
sprite.src = "./assets/image/spriteSheet.png"; 

let pacman = {
    positionX: 200,
    positionY: 320,
    height: blockSize,
    width: blockSize,
    moveDirection: "",
    tableSkin: [
        [4,54,104,4,"right"],
        [4,204,254,4,"down"],
        [4,354,404,4,"left"],
        [4,504,554,4,"up"],
    ],
    skinIndex: 0,
    currentSkin: 0,
    keyDirection: "",
    canEatGhost:false,
    munchs: false,
    life:2,

}



let game = {
    fruitValue: 100,
    fruitIndexSkin :0,
    fruitTableSkin:[3,53,103],
    bonus : 0,
    fruit : 0,
    superbonus : 0,
    score: 0,
    ghostSkinIndex : 0,
    tableSkin: [
        [554,604,"right"],
        [104,154,"down"],
    ],
    currentSkin: 0,
}

let pinkGhost = {
    positionX: 200,
    positionY: 200,
    height: blockSize,
    width: blockSize,
    moveDirection: "",
    newDirection:"",
    tableSkin: [
        [4,54,"right"],
        [104,154,"down"],
        [204,254,"left"],
        [304,354,"up"],
    ],
    currentSkin: 0,

}

let redGhost = {
    positionX: 200,
    positionY: 200,
    height: blockSize,
    width: blockSize,
    moveDirection: "",
    newDirection:"",
    tableSkin: [
        [4,54,"right"],
        [104,154,"down"],
        [204,254,"left"],
        [304,354,"up"],
    ],
    currentSkin: 0,
}

let blueGhost = {
    positionX: 200,
    positionY: 200,
    height: blockSize,
    width: blockSize,
    moveDirection: "",
    newDirection:"",
    tableSkin: [
        [4,54,"right"],
        [104,154,"down"],
        [204,254,"left"],
        [304,354,"up"],
    ],
    currentSkin: 0,
}

let orangeGhost = {
    positionX: 200,
    positionY: 200,
    height: blockSize,
    width: blockSize,
    moveDirection: "",
    newDirection:"",
    tableSkin: [
        [4,54,"right"],
        [104,154,"down"],
        [204,254,"left"],
        [304,354,"up"],
    ],
    currentSkin: 0,
}



//====Gestion du son=============================
let soundTable = {
    munch1: new Audio('./assets/sound/munch_1.wav'),
    munch2: new Audio('./assets/sound/munch_2.wav'),
    death1: new Audio('./assets/sound/death_1.wav'),
    death2: new Audio('./assets/sound/death_2.wav'),
    credit: new Audio('./assets/sound/credit.wav'),
    eatFruit: new Audio('./assets/sound/eat_fruit.wav'),
    eatGhost: new Audio('./assets/sound/eat_ghost.wav'),
    extend: new Audio('./assets/sound/extend.wav'),
    gameStart: new Audio('./assets/sound/game_start.wav'),
    intermission: new Audio('./assets/sound/intermission.wav'),
    powerPellet: new Audio('./assets/sound/power_pellet.wav'),
    retreating: new Audio('./assets/sound/retreating.wav'),
    siren1: new Audio('./assets/sound/siren_1.wav'),
    siren2: new Audio('./assets/sound/siren_2.wav'),
    siren3: new Audio('./assets/sound/siren_3.wav'),
    siren4: new Audio('./assets/sound/siren_4.wav'),
    siren5: new Audio('./assets/sound/siren_5.wav'),
};

function soundBox(sound) {
    switch (sound) {

        case "patate":
            soundTable.munch1.play();
            break;
        case "pomme":
            soundTable.munch2.play();
            break;
        case "tartiflette":
            soundTable.death1.play();
            break;
        case "raclette":
            soundTable.death2.play();
            break;
        case "blanquette":
            soundTable.credit.play();
            break;
        case "ragout":
            soundTable.eatFruit.play();
            break;
        case "ratatouille":
            soundTable.eatGhost.play();
            break;
        case "hachisPermentier":
            soundTable.extend.play();
            break;
        case "carbonara":
            soundTable.gameStart.play();
            break;
        case "bolognaise":
            soundTable.intermission.play();
            break;
        case "lasagnes":
            soundTable.powerPellet.play();
            break;
        case "pouletBasquaise":
            soundTable.retreating.play();
            break;
        case "fondueSavoyarde":
            soundTable.siren1.play();
            break;
        case "bouillabaisse":
            soundTable.siren2.play();
            break;
        case "boeufBourguignon":
            soundTable.siren3.play();
            break;
        case "coqAuVin":
            soundTable.siren4.play();
            break;
        case "choucroute":
            soundTable.siren5.play();
            break;
    }

}
//========================================================================




// Future map pour les IA ------WIP---------  =============================
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],

    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],

    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
//=======================================================================


//Gestion des murs =====================================================
const walls = [
    [0, 0, maxWidth, blockSize],
    [maxWidth - blockSize, 0, blockSize, blockSize * 8],
    [maxWidth - (5 * blockSize), 7 * blockSize, blockSize * 5, blockSize],
    [maxWidth - (5 * blockSize), 7 * blockSize, blockSize, blockSize * 3],
    [maxWidth - (5 * blockSize), 9 * blockSize, blockSize * 6, blockSize],
    [maxWidth - (5 * blockSize), 11 * blockSize, blockSize * 6, blockSize],
    [maxWidth - (5 * blockSize), 11 * blockSize, blockSize, blockSize * 3],
    [maxWidth - (5 * blockSize), 13 * blockSize, blockSize * 5, blockSize],
    [maxWidth - blockSize, 13 * blockSize, blockSize, blockSize * 9],
    [0, maxHeigth - blockSize, maxWidth, blockSize],
    [0, 13 * blockSize, blockSize, blockSize * 9],
    [0, 13 * blockSize, blockSize * 5, blockSize],
    [4 * blockSize, 11 * blockSize, blockSize, blockSize * 3],
    [-10, 11 * blockSize, blockSize * 5, blockSize],
    [-10, 9 * blockSize, blockSize * 5, blockSize],
    [4 * blockSize, 7 * blockSize, blockSize, blockSize * 3],
    [0, 7 * blockSize, blockSize * 5, blockSize],
    [0, 0, blockSize, blockSize * 8],
    [10 * blockSize, 0 * blockSize, blockSize, blockSize * 4],
    [2 * blockSize, 2 * blockSize, blockSize * 3, blockSize * 2],
    [6 * blockSize, 2 * blockSize, blockSize * 3, blockSize * 2],
    [12 * blockSize, 2 * blockSize, blockSize * 3, blockSize * 2],
    [16 * blockSize, 2 * blockSize, blockSize * 3, blockSize * 2],
    [2 * blockSize, 5 * blockSize, blockSize * 3, blockSize],
    [8 * blockSize, 5 * blockSize, blockSize * 5, blockSize],
    [16 * blockSize, 5 * blockSize, blockSize * 3, blockSize],
    [6 * blockSize, 5 * blockSize, blockSize, blockSize * 5],
    [14 * blockSize, 5 * blockSize, blockSize, blockSize * 5],
    [10 * blockSize, 5 * blockSize, blockSize, blockSize * 3],
    [6 * blockSize, 7 * blockSize, blockSize * 3, blockSize],
    [12 * blockSize, 7 * blockSize, blockSize * 3, blockSize],
    [8 * blockSize, 9 * blockSize, blockSize * 2, blockSize],
    [12 * blockSize, 9 * blockSize, blockSize, blockSize * 3],
    [8 * blockSize, 9 * blockSize, blockSize, blockSize * 3],
    [11 * blockSize, 9 * blockSize, blockSize * 2, blockSize],
    [6 * blockSize, 11 * blockSize, blockSize * 1, blockSize * 3],
    [14 * blockSize, 11 * blockSize, blockSize * 1, blockSize * 3],
    [8 * blockSize, 11 * blockSize, blockSize * 5, blockSize],
    [8 * blockSize, 13 * blockSize, blockSize * 5, blockSize],
    [10 * blockSize, 13 * blockSize, blockSize * 1, blockSize * 3],
    [6 * blockSize, 15 * blockSize, blockSize * 3, blockSize],
    [12 * blockSize, 15 * blockSize, blockSize * 3, blockSize],
    [2 * blockSize, 15 * blockSize, blockSize * 3, blockSize],
    [4 * blockSize, 15 * blockSize, blockSize, blockSize * 3],
    [16 * blockSize, 15 * blockSize, blockSize * 3, blockSize],
    [16 * blockSize, 15 * blockSize, blockSize, blockSize * 3],
    [8 * blockSize, 17 * blockSize, blockSize * 5, blockSize],
    [10 * blockSize, 17 * blockSize, blockSize * 1, blockSize * 3],
    [12 * blockSize, 19 * blockSize, blockSize * 7, blockSize],
    [6 * blockSize, 17 * blockSize, blockSize * 1, blockSize * 3],
    [2 * blockSize, 19 * blockSize, blockSize * 7, blockSize],
    [14 * blockSize, 17 * blockSize, blockSize * 1, blockSize * 3],
    [0, 17 * blockSize, blockSize * 3, blockSize],
    [maxWidth - (3 * blockSize), 17 * blockSize, blockSize * 3, blockSize],
]

//=======================================================================



//===Gestion des intersections==============================================
const node = [
    //[xPos,yPos,top,right,bottom,left]
    [(blockSize * 2) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 2) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 5) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 7) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 9) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 9) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 9) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 9) - 10, false, false, false, false],

    [(blockSize * 11) - 10, (blockSize * 9) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 11) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 11) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 11) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 11) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 13) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 13) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 15) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 4) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 18) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 17) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 4) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 6) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 8) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 14) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 16) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 18) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 19) - 10, false, false, false, false],
    [(blockSize * 2) - 10, (blockSize * 21) - 10, false, false, false, false],
    [(blockSize * 10) - 10, (blockSize * 21) - 10, false, false, false, false],
    [(blockSize * 12) - 10, (blockSize * 21) - 10, false, false, false, false],
    [(blockSize * 20) - 10, (blockSize * 21) - 10, false, false, false, false],
]
    for (let i = 0; i < node.length; i++) {

            if (collisions(node[i][0]-blockSize-blockSize+10, node[i][1]-blockSize+10, blockSize,blockSize)) {
                node[i][5] = true
            }
            if (collisions(node[i][0]+blockSize-blockSize+10, node[i][1]-blockSize+10, blockSize,blockSize)) {
                node[i][3] = true
            }
            if (collisions(node[i][0]-blockSize+10, node[i][1]+blockSize-blockSize+10, blockSize,blockSize)) {
                node[i][4] = true
            }
            if (collisions(node[i][0]-blockSize+10, node[i][1]-blockSize-blockSize+10, blockSize,blockSize)) {
                node[i][2] = true
            }

    }
    node[26][4] = true

const direction = ["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]
//================================================================================





// Génération des bonus sur la map ================================================

    

let bonus = [];
function bonusGeneration() {
bonus.length = 0
for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        if (collisions(i * blockSize, j * blockSize, 10, 10) == false) {
            if (!((i * blockSize) + 10 > 0 && (i * blockSize) < 5 * blockSize && j * blockSize + 10 > 8 * blockSize && j * blockSize < 8 * blockSize + 5 * blockSize) && !((i * blockSize) + 10 > (maxWidth - 5 * blockSize) && (i * blockSize) < (maxWidth - 5 * blockSize) + 5 * blockSize && j * blockSize + 10 > 8 * blockSize && j * blockSize < 8 * blockSize + 5 * blockSize) && !((i * blockSize) + 10 > (6 * blockSize) && (i * blockSize) < (6 * blockSize) + 9 * blockSize && j * blockSize + 10 > 7 * blockSize && j * blockSize < 7 * blockSize + 7 * blockSize)) {
                bonus.unshift([(i * 20) + 10, (j * 20) + 10, 2, true, "littleBonus", i, j])
            }
        }
    }
}
bonus.unshift([(10 * blockSize) + 10, (12 * blockSize) + 10, 2, true, "fruit", 22, 22])
bonus[10][4] = "bigBonus"
bonus[4][4] = "bigBonus"
bonus[163][4] = "bigBonus"
bonus[169][4] = "bigBonus"
bonus[86][3] = false
}
bonusGeneration()


setInterval(function () { appears = !appears }, 400);

function displayGame() {
    menu.style.display = "none"
    pacmanMap.style.display = "block"
    pannel.style.display = "flex"
    soundBox("carbonara")
    setTimeout(() => {
        play = true
        refreshGhosts()
    }, 4000)
}
// displayGame()
//================================================================================






// Boucle de jeu principale =================================
window.requestAnimationFrame(gameLoop);
function gameLoop() {
    if (pacman.canEatGhost == false && play == true) {
        soundTable.powerPellet.pause()
        switch (game.superbonus) {
            case 0:
                soundBox("fondueSavoyarde")
                break;
            case 1:
                soundBox("bouillabaisse")
                break;
            case 2:
                soundBox("boeufBourguignon")
                break;
            case 3:
                soundBox("coqAuVin")
                break;
            case 4:
                soundBox("choucroute")
                break;

        }
    }
    
    if (pacman.canEatGhost == true && play == true) {
        soundTable.siren1.pause()
        soundTable.siren2.pause()
        soundTable.siren3.pause()
        soundTable.siren4.pause()
        soundTable.siren5.pause()
        soundBox("lasagnes")
    }
    // testfunction()
    if (game.bonus == 166 && game.fruit == 1 & game.superbonus == 4 ) {
        soundBox("bolognaise")
        play = false
        win()
        setTimeout(() => {
            play = true
            refreshGhosts()
            
        }, 5000)


    }

    directionAnimation()


    for (let i = 0; i < bonus.length; i++) {
        if (pacman.positionX + 10 == bonus[i][0] && pacman.positionY + 10 == bonus[i][1] && bonus[i][3] == true && bonus[i][4] == "littleBonus") {
            bonus[i][3] = false
            pacman.munchs ? soundBox("patate") : soundBox("pomme")
            pacman.munchs = !pacman.munchs

            game.bonus++
        }
        if (pacman.positionX + 10 == bonus[i][0] && pacman.positionY + 10 == bonus[i][1] && bonus[i][3] == true && bonus[i][4] == "fruit") {
            bonus[i][3] = false
            soundBox("ragout")
            game.fruit++
        }
        if (pacman.positionX + 10 == bonus[i][0] && pacman.positionY + 10 == bonus[i][1] && bonus[i][3] == true && bonus[i][4] == "bigBonus") {
            bonus[i][3] = false
            pacman.canEatGhost = true
            game.superbonus++
            
            setTimeout(() => {
                pacman.canEatGhost = false
              }, 6000)


        }

    }

    if (pacman.positionX == 0 && pacman.positionY == blockSize * 10) {
        pacman.positionX = maxWidth - 10
    }
    if (pacman.positionX == maxWidth && pacman.positionY == blockSize * 10) {
        pacman.positionX = 0
    }
    if (pacman.keyDirection == " ") {
        pacman.moveDirection = ""
        pacman.keyDirection = ""
    }

    if (pacman.moveDirection == "ArrowUp" && pacman.keyDirection == "ArrowDown") {
        pacman.moveDirection = pacman.keyDirection
    }
    if (pacman.moveDirection == "ArrowDown" && pacman.keyDirection == "ArrowUp") {
        pacman.moveDirection = pacman.keyDirection
    }
    if (pacman.moveDirection == "ArrowLeft" && pacman.keyDirection == "ArrowRight") {
        pacman.moveDirection = pacman.keyDirection
    }
    if (pacman.moveDirection == "ArrowRight" && pacman.keyDirection == "ArrowLeft") {
        pacman.moveDirection = pacman.keyDirection
    }
    if (collisions(pacman.positionX, pacman.positionY, pacman.width, pacman.height, "pacman") == false) {
        switch (pacman.moveDirection) {
            case "ArrowLeft":
                pacman.positionX = pacman.positionX - 2
                break;
            case "ArrowRight":
                pacman.positionX = pacman.positionX + 2
                break;
            case "ArrowUp":
                pacman.positionY = pacman.positionY - 2
                break;
            case "ArrowDown":
                pacman.positionY = pacman.positionY + 2
                break;

        }
    } else {
        pacman.moveDirection = ""
        pacman.keyDirection = ""
    }
    for (let i = 0; i < node.length; i++) {
        if (pacman.positionX + 10 == node[i][0] && pacman.positionY + 10 == node[i][1]) {
            if (pacman.keyDirection == "ArrowLeft" && node[i][5] == false) {
                pacman.moveDirection = pacman.keyDirection
            }
            if (pacman.keyDirection == "ArrowUp" && node[i][2] == false) {
                pacman.moveDirection = pacman.keyDirection
            }
            if (pacman.keyDirection == "ArrowRight" && node[i][3] == false) {
                pacman.moveDirection = pacman.keyDirection
            }
            if (pacman.keyDirection == "ArrowDown" && node[i][4] == false) {
                pacman.moveDirection = pacman.keyDirection
            }

        }

    }
    game.score = game.bonus * 10 + game.fruit*100
    displayScore.innerText = game.score
    ghostsMoves(pinkGhost)
    ghostsMoves(redGhost)
    ghostsMoves(orangeGhost)
    ghostsMoves(blueGhost)
    
    

    ctx.clearRect(0, 0, maxWidth, maxHeigth);
    draw()



    window.requestAnimationFrame(gameLoop);

}
//============================================================================================


function ghostsMoves(elem) {      
    switch (elem.moveDirection) {
        case "ArrowLeft":
            elem.positionX = elem.positionX - 2
            break;
        case "ArrowRight":
            elem.positionX = elem.positionX + 2
            break;
        case "ArrowUp":
            elem.positionY = elem.positionY - 2
            break;
        case "ArrowDown":
            elem.positionY = elem.positionY + 2
            break;

    }
    for (let i = 0; i < node.length; i++) {

        if (elem.positionX+10 == node[i][0] && elem.positionY+10 == node[i][1]) {
            let randomDirection = random(0,3)
            elem.moveDirection = ""
            if (node[i][2+randomDirection] == false) {
                elem.moveDirection = direction[randomDirection]
            }
        }
        
    }
    if (elem.positionX == 0 && elem.positionY == blockSize * 10) {
        elem.positionX = maxWidth - 10
    }
    if (elem.positionX == maxWidth && elem.positionY == blockSize * 10) {
        elem.positionX = 0
    }
    isLoose(elem)
}

function isLoose(ghost) {
    if (pacman.positionX == ghost.positionX && pacman.positionY == ghost.positionY && pacman.canEatGhost == false) {
        soundBox("tartiflette")
        death()
    }    if (pacman.positionX == ghost.positionX && pacman.positionY == ghost.positionY && pacman.canEatGhost == true) {
        soundBox("ratatouille")
        ghost.moveDirection = ""
        ghost.positionX = 200
        ghost.positionY = 200
        setTimeout(() => {
            ghost.moveDirection = "ArrowUp"
            
        }, 10000)

    }
}

function death(){
    if (pacman.life == 0) {
        play = false
        setTimeout(() => {
            document.location.reload()
            
        }, 2000)
        
    }

    pacman.life--
    redGhost.positionX = 200
    redGhost.positionY = 200
    pinkGhost.positionX = 200
    pinkGhost.positionY = 200
    orangeGhost.positionX = 200
    orangeGhost.positionY = 200
    blueGhost.positionX = 200
    blueGhost.positionY = 200
    pinkGhost.moveDirection = ""
    redGhost.moveDirection = ""
    blueGhost.moveDirection = ""
    orangeGhost.moveDirection = ""
    pacman.positionX = 200
    pacman.positionY = 320
    pacman.keyDirection = ""
    pacman.moveDirection = ""
    refreshGhosts()

}

function refreshGhosts(){

    redGhost.moveDirection = "ArrowUp"
    setTimeout(() => {
        pinkGhost.moveDirection = "ArrowUp"
        
    }, 1000)
    setTimeout(() => {
        blueGhost.moveDirection = "ArrowUp"
        
    }, 5000)
    setTimeout(() => {
        orangeGhost.moveDirection = "ArrowUp"
        
    }, 7500)
}

function win(){
    pacman.moveDirection = ""
    redGhost.moveDirection = ""
    pinkGhost.moveDirection = ""
    orangeGhost.moveDirection = ""
    blueGhost.moveDirection = ""
    redGhost.positionX = 200
    redGhost.positionY = 200
    pinkGhost.positionX = 200
    pinkGhost.positionY = 200
    orangeGhost.positionX = 200
    orangeGhost.positionY = 200
    blueGhost.positionX = 200
    blueGhost.positionY = 200
    pacman.positionX = 200
    pacman.positionY = 320
    game.fruitIndexSkin++

    game.bonus = 0
    game.fruit = 0
    game.superbonus = 0
    let bonus = [""]
    
    bonusGeneration()
    console.table(bonus);
}







// Gestion des dessins ==============================================================================

function draw() {
    drawWalls()
    drawBonus()
    drawPacman()
    drawGhosts()
    displayPannel()
    // drawNodes()

}

function drawNodes(){
    for (let i = 0; i < node.length; i++) {

        ctx.beginPath()
        ctx.fillStyle = "green"
        ctx.arc(node[i][0], node[i][1], blockSize/2, 0, Math.PI * 3);
        ctx.fill()
    }
}


function drawBonus() {
    for (let i = 0; i < bonus.length; i++) {
        if (bonus[i][3] == true && bonus[i][4] == "littleBonus") {
            ctx.beginPath()
            ctx.fillStyle = "yellow"
            ctx.arc(bonus[i][0], bonus[i][1], bonus[i][2], 0, Math.PI * 3);
            ctx.fill()
        }
        if (bonus[i][3] == true && bonus[i][4] == "bigBonus" && appears == true) {
            ctx.beginPath()
            ctx.fillStyle = "orange"
            ctx.arc(bonus[i][0], bonus[i][1], 5, 0, Math.PI * 3);
            ctx.fill()
        }
        if (bonus[i][3] == true && bonus[i][4] == "fruit") {
            ctx.drawImage(
                sprite, 
                601, game.fruitTableSkin[game.fruitIndexSkin], 36, 36, 
                bonus[i][0]-10, bonus[i][1]-10, blockSize, blockSize
                );
        }
    }

}

function drawWalls() {
    ctx.fillStyle = 'blue';
    for (let i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);
    }
    ctx.fillStyle = 'black';
    for (let i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i][0] + 2, walls[i][1] + 2, walls[i][2] - 4, walls[i][3] - 4);
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(200, 180, 20, 2);
}

function drawPacman() {
            // [852,4,35,35,"all"],
    ctx.drawImage(
        sprite, 
        852, pacman.tableSkin[pacman.currentSkin][pacman.skinIndex], 35, 35, 
        pacman.positionX, pacman.positionY, blockSize, blockSize
        );
    }

function drawGhosts() {

    if (pacman.canEatGhost == false) {
    ctx.drawImage(
        sprite, 
        651, redGhost.tableSkin[redGhost.currentSkin][game.ghostSkinIndex], 35, 35, 
        redGhost.positionX, redGhost.positionY, blockSize, blockSize
        );
    ctx.drawImage(
        sprite, 
        701, pinkGhost.tableSkin[pinkGhost.currentSkin][game.ghostSkinIndex], 35, 35, 
        pinkGhost.positionX, pinkGhost.positionY, blockSize, blockSize
        );
    ctx.drawImage(
        sprite, 
        751, blueGhost.tableSkin[blueGhost.currentSkin][game.ghostSkinIndex], 35, 35, 
        blueGhost.positionX, blueGhost.positionY, blockSize, blockSize
        );
    ctx.drawImage(
        sprite, 
        801, orangeGhost.tableSkin[orangeGhost.currentSkin][game.ghostSkinIndex], 35, 35, 
        orangeGhost.positionX, orangeGhost.positionY, blockSize, blockSize
        );
    }
    if (pacman.canEatGhost == true) {
        ctx.drawImage(
            sprite, 
            1, game.tableSkin[0][game.ghostSkinIndex], 35, 35, 
            redGhost.positionX, redGhost.positionY, blockSize, blockSize
            );
        ctx.drawImage(
            sprite, 
            1, game.tableSkin[0][game.ghostSkinIndex], 35, 35, 
            pinkGhost.positionX, pinkGhost.positionY, blockSize, blockSize
            );
        ctx.drawImage(
            sprite, 
            1, game.tableSkin[0][game.ghostSkinIndex], 35, 35,  
            blueGhost.positionX, blueGhost.positionY, blockSize, blockSize
            );
        ctx.drawImage(
            sprite, 
            1, game.tableSkin[0][game.ghostSkinIndex], 35, 35,  
            orangeGhost.positionX, orangeGhost.positionY, blockSize, blockSize
            );
        }
}

setInterval(animate,200)

function animate(){
    pacman.skinIndex++
 if (pacman.skinIndex == 4) {
    pacman.skinIndex = 0
 }
 
 game.ghostSkinIndex++
 if (game.ghostSkinIndex == 2) {
    game.ghostSkinIndex = 0
 }
 
}

function directionAnimation(){
    switch (pacman.moveDirection) {
        case "ArrowRight":
            pacman.currentSkin = 0
            break;
        case "ArrowDown":
            pacman.currentSkin = 1
            break;
        case "ArrowLeft":
            pacman.currentSkin = 2
            break;
        case "ArrowUp":
            pacman.currentSkin = 3
            break;
     }

     
     switch (orangeGhost.moveDirection) {
        case "ArrowRight":
            orangeGhost.currentSkin = 0
            break;
        case "ArrowDown":
            orangeGhost.currentSkin = 1
            break;
        case "ArrowLeft":
            orangeGhost.currentSkin = 2
            break;
        case "ArrowUp":
            orangeGhost.currentSkin = 3
            break;
     }
     switch (redGhost.moveDirection) {
        case "ArrowRight":
            redGhost.currentSkin = 0
            break;
        case "ArrowDown":
            redGhost.currentSkin = 1
            break;
        case "ArrowLeft":
            redGhost.currentSkin = 2
            break;
        case "ArrowUp":
            redGhost.currentSkin = 3
            break;
     }
     switch (blueGhost.moveDirection) {
        case "ArrowRight":
            blueGhost.currentSkin = 0
            break;
        case "ArrowDown":
            blueGhost.currentSkin = 1
            break;
        case "ArrowLeft":
            blueGhost.currentSkin = 2
            break;
        case "ArrowUp":
            blueGhost.currentSkin = 3
            break;
     }
     switch (pinkGhost.moveDirection) {
        case "ArrowRight":
            pinkGhost.currentSkin = 0
            break;
        case "ArrowDown":
            pinkGhost.currentSkin = 1
            break;
        case "ArrowLeft":
            pinkGhost.currentSkin = 2
            break;
        case "ArrowUp":
            pinkGhost.currentSkin = 3
            break;
     }
    }

    function displayPannel(){
        switch (pacman.life) {
            case 2:
                lifes[0].style.display = "block"
                lifes[1].style.display = "block"
                lifes[2].style.display = "block"
                break;
            case 1:
                lifes[0].style.display = "block"
                lifes[1].style.display = "block"
                lifes[2].style.display = "none"
                break;
            case 0:
                lifes[0].style.display = "block"
                lifes[1].style.display = "none"
                lifes[2].style.display = "none"
                break;
        

        }
    }

//=======================================================================================================

//Gestion des collisions contre les murs==================================
function collisions(posX, posY, width, height, whatUsing) {
    for (let i = 0; i < walls.length; i++) {
        if (posX + width > walls[i][0] && posX < walls[i][0] + walls[i][2] && posY + height > walls[i][1] && posY < walls[i][1] + walls[i][3]) {
            if (whatUsing == "pacman") {
                switch (pacman.moveDirection) {
                    case "ArrowLeft":
                        pacman.positionX = pacman.positionX + 2
                        drawPacman()
                        return true
                    case "ArrowRight":
                        pacman.positionX = pacman.positionX - 2
                        drawPacman()
                        return true
                    case "ArrowUp":
                        pacman.positionY = pacman.positionY + 2
                        drawPacman()
                        return true
                    case "ArrowDown":
                        pacman.positionY = pacman.positionY - 2
                        drawPacman()
                        return true
                }

            }
            return true
        }
    }
    return false
}
//===============================================================


//Outils ==============================
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

document.addEventListener("keydown", (event) => {
    if ((event.key == "ArrowRight" || event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == " ") && play == true) {

        pacman.keyDirection = event.key
        if (pacman.moveDirection == "") {
            pacman.moveDirection = pacman.keyDirection
        }

    }
    if (event.key == "a") {
        // if (test.style.display != "block") {
        //     test.style.display = "block"
        // }
        // else if (test.style.display == "block") {
        //     test.style.display = "none"
        // }
    }


})

//============================================================













//=============================Zone de test=============================================
// function drawMap() {
//     for (let i = 0; i < map.length; i++) {
//         for (let j = 0; j < map[i].length; j++) {

//             switch (map[i][j]) {
//                 case 0:
//                     path.fillStyle = 'blue';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 2:
//                     path.fillStyle = 'green';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 3:
//                     path.fillStyle = 'yellow';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 4:
//                     path.fillStyle = 'red';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 5:
//                     path.fillStyle = 'orange';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 6:
//                     path.fillStyle = 'cyan';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 7:
//                     path.fillStyle = 'pink';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 8:
//                     path.fillStyle = 'lightblue';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;
//                 case 9:
//                     path.fillStyle = 'lightgreen';
//                     path.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//                     break;

//             }

//         }

//     }
    

// }
// let isGood = false
// function testfunction() {
//     let pacmanposX = Math.round(pacman.positionX / 20)
//     let pacmanposY = Math.round(pacman.positionY / 20)
//     let redposX = Math.round(redGhost.positionX / 20)
//     let redposY = Math.round(redGhost.positionY / 20)
//     let orangeposX = Math.round(orangeGhost.positionX / 20)
//     let orangeposY = Math.round(orangeGhost.positionY / 20)
//     let blueposX = Math.round(blueGhost.positionX / 20)
//     let blueposY = Math.round(blueGhost.positionY / 20)
//     let pinkposX = Math.round(pinkGhost.positionX / 20)
//     let pinkposY = Math.round(pinkGhost.positionY / 20)
//     map[redposY][redposX] = 4
//     map[orangeposY][orangeposX] = 5
//     map[blueposY][blueposX] = 6
//     map[pinkposY][pinkposX] = 7
//     map[pacmanposY][pacmanposX] = 3
//     path.clearRect(0, 0, maxWidth, maxHeigth);
//     drawMap()
//     map[pacmanposY][pacmanposX] = 1
// }


//======================================================================================




