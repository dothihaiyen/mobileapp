"use strict";
let flag = "pen-flag";
let counter = 9;
//class=square" を取得
const square = document.getElementsByClassName("square");
//array ni 変換
//https://developer.mozilla.org/ja/docs/Web/JavaScrips/Reference/Global_Objects/Array/from
const squaresArray = Array.from(square);
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const levels =document.querySelectorAll(".level");
const level_1= document.getElementById("level_1");
const level_2= document.getElementById("level_2");
const level_3= document.getElementById("level_3");

//newgame ボタン取得
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

//win or lose judgment line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);
const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
const lineRandom =cornerLine(squaresArray,["a_1","a_3","c_1","c_3"]);
let winningLine = null;

//メッセージ
const msgtxt1 = '<p class ="image"><img src="img/penguins.jpg" width=61 height=61px></p><p class="text">Penguins Attack!(your turn) </p>';
const msgtxt2 = '<p class ="image"><img src="img/whitebear.jpg" width=61 height=61px></p><p class="text">WhiteBear Attack!(computer turn)</p>';

const msgtxt3 = '<p class ="image"><img src="img/penguins.jpg" width=61 height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!!</p>';
const msgtxt4 = '<p class ="image"><img src="img/whitebear.jpg" width=61 height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Whitebear Win!!!</p>';
const msgtxt5 = '<p class ="image"><img src="img/penguins.jpg" width=61 height=61px><img src="img/whitebear.jpg" width=61 height=61px></p><p class ="text animate__bounceIn">Draw!!!</p>';

//サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

window.addEventListener("DOMContentLoaded",
    function () {
        setMessage("pen-turn");
        //square　がクリック可能を判断するクリック追加
        squaresArray.forEach(function (square) {
            square.classList.add("js-clickable");
        });
        LevelSetting(0);

    }, false
);
let index;
levels.forEach((level)=>{
    level.addEventListener("click",() =>{
        index =[].slice.call(levels).indexOf(level);
        LevelSetting(index);
    });
});
function LevelSetting(index){
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level-non-selected");
    level_2.classList.remove("level-non-selected");
    level_3.classList.remove("level-non-selected");
    
 if(sessionStorage.getItem("tic_tac_toe_access")){
    switch(index){
        case 0:
            sessionStorage.setItem("tic_tac_toe_access","1");
            level_1.classList.add("level-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-non-selected");
        break;
        
        case 1:
         sessionStorage.setItem("tic_tac_toe_access","2");
         level_1.classList.add("level-non-selected");
         level_2.classList.add("level-selected");
         level_3.classList.add("level-non-selected");
        break;
        case 2:
            sessionStorage.setItem("tic_tac_toe_access","3");
            level_1.classList.add("level-non-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-selected");
        break;
        default:
            level_1.classList.add("level-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-non-selected");
        break;

    }
 }else{
    sessionStorage.setItem("tic_tac_toe_access","1");
    level_1.classList.add("level-selected");
    level_2.classList.add("level-non-selected");
    level_3.classList.add("level-selected");
 }
}


squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {

        let gameOverFlg = isSelect(square);
        //gameover ではない場合、くまのターン（auto)
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function () {
                    bearTurn();
                },
                "2000"
            );
        }
    });
});


/*a_1.addEventListener("click",
    function () {
        isSelect(a_1);
    }, false
);

a_2.addEventListener("click", () => {
    isSelect(a_2);
});

a_3.addEventListener("click", () => {
    isSelect(a_3);
});

b_1.addEventListener("click", () => {
    isSelect(b_1);
});

b_2.addEventListener("click", () => {
    isSelect(b_2);
});

b_3.addEventListener("click", () => {
    isSelect(b_3);
});

c_1.addEventListener("click", () => {
    isSelect(c_1);
});

c_2.addEventListener("click", () => {
    isSelect(c_2);
});

c_3.addEventListener("click", () => {
    isSelect(c_3);
}); */

function isSelect(selectSquare) {
    let gameOverFlg = 0;
    if (flag === "pen-flag") {
        //クリックサウンド
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        //penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = "bear-flag";
    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        //white- bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }
    counter--;

    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}

function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) { winningLine = line }
        return subResult;
    });
    return result;
}

function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;

        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;

        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;

        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;

        case "draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;
            break;

        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

function gameOver(status) {
    let w_sound
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();


    //all square unlickable
    // squaresArray.forEach(function ( square){
    //  square.classList.add("js-unclickable");
    //});
    // const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");

    //display new game button*display
    newgamebtn_display.classList.remove("js-hidden");

    //winEffect
    if (status === "penguins") {
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }
        //penguins win >>>snow color is pink
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === "bear") {
        //winner-line bear hight-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

newgamebtn.addEventListener("click", function () {
    //penguinsのタ－ン
    flag = "pen-flag";
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");

    });
    //const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});

function bearTurn() {
    let bearTurnEnd = "0";
    let gameOverFlg = "0";
    //クリックできるマス目をランダムに選ぶ
    while(bearTurnEnd === "0"){
        bearTurnEnd = isReach("bear");
        if (bearTurnEnd === "1"){
            gameOverFlg = "1";
            break;
        }
        bearTurnEnd = isReach ("penguins");
        if(bearTurnEnd === "1"){
            break;
        }
        const bearSquare = squaresArray.filter(function (square) {
            return square.classList.contains("js-clickable");
    
        });
        let n = Math.floor(Math.random() * bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);
       break;

    }
    

    if (gameOverFlg === "0") {
        //const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");
    }
}
function isReach(status){
    let bearTurnEnd = "0";
    lineArray.some(function (line){
       let bearCheckCnt = 0;
       let penCheckCnt = 0;
       line.forEach(function (square){
        if (square.classList.contains("js-bear-checked")){
            bearCheckCnt++;
        }
        if (square.classList.contains("js-pen-checked")){
            penCheckCnt++;
        }

       })
       if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0){
        bearTurnEnd = "1";
       }
       if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2){
        bearTurnEnd = "1";
       }

       //クマがペンギンのリーチ　あり場合、空いているマス目を選択する
       if (bearTurnEnd ==="1"){
        line.some(function (square){
            if(square.classList.contains("js-clickable")){
                isSelect(square);
                return true;
            
            }
        })
        return true;
       }
    });
    return bearTurnEnd;
}