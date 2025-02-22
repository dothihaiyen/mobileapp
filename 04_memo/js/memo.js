"use strict"
window.addEventListener("DOMContentLoaded",
  function(){
    if(typeof this.localStorage==="undefined"){
        window.alert("このブラウザはLocal Strorage 機能が実装されていません");
        return;
    }else{
        saveLocalStrorage();
    }
 }
);

function saveLocalStrorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key= document.getElementById("textKey").value;
        const value= document.getElementById("textMemo").value;
        if(key==""|| value==""){
            window.alert("Key,Memoはいずれも必須です");
            return;
        }else{
            localStorage.setItem(key,value);
            let w_msg ="LocalStorageに" +key +""+value+"を保存しました";
            window.alert(w_msg)
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
        }
    },false
    
    );
};