/**
 * Created by Pwcong on 2016/12/29.
 */

var input = document.getElementById("input");
var button = document.getElementById("input-button");
var tips = document.getElementById("tips");

button.onclick = function () {

    if(!input.value){
        input.className = "error";
        tips.innerHTML = "输入内容不能为空";
        tips.className = "error";
    }else if(input.value.length<4||input.value.length>16){
        input.value = "";
        input.className = "error";
        tips.innerHTML = "输入内容长度有误";
        tips.className = "error";
    }else {
        input.className = "success";
        tips.innerHTML = "输入格式正确";
        tips.className = "success";

        setTimeout(function () {
            input.value = "";
            input.className = "";
            tips.innerHTML = "必填，长度为4-16个字符";
            tips.className = "";
        },2000)

    }

};