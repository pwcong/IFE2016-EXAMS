/**
 * Created by Pwcong on 2016/12/29.
 */

var input = document.getElementById("input");
var button = document.getElementById("input-button");
var tips = document.getElementById("tips");

var canPost = false;

input.onfocus = function () {
    tips.innerHTML = "必填，长度为4-16个字符";
    tips.className = "";
};

input.onblur = function () {

    if(!input.value){
        input.className = "error";
        tips.innerHTML = "输入内容不能为空";
        tips.className = "error";
        canPost = false;

    }else if(input.value.length<4||input.value.length>16){
        input.className = "error";
        tips.innerHTML = "输入内容长度有误";
        tips.className = "error";
        canPost = false
    }else {
        input.className = "success";
        tips.innerHTML = "输入格式正确";
        tips.className = "success";
        canPost = true;
    }
};


button.onclick = function () {

    if(canPost){

        alert("提交成功！");
        input.value = "";
        input.className = "";
        tips.innerHTML = "必填，长度为4-16个字符";
        tips.className = "";

        canPost = false;
    }


};