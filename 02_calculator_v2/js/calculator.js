"use strict"

const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");
//　イベントを登録
elementSelect.addEventListener("change",update);
elementNum1.addEventListener("change",update);
elementNum2.addEventListener("change",update);
function update(){

    const result= calculate(
        Number(elementNum1.value),
        Number(elementNum2.value),
        elementSelect.value
    );
   
    
    //画面に表示
    elementResult.innerHTML =result; //テキストを代入
}

function calculate(num1, num2, calcType ){
    let result;
    switch (calcType){
        case "type-add":
        result=num1+num2;
        break;

        case "type-substract":
        result=num1-num2;
        break;

        case "type-multiply":
        result=num1*num2;
        break;

        case "type-divide":
        result=num1/num2;
        break;
    }
    return result;
}


