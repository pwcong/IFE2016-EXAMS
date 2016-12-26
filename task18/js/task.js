/**
 * Created by Pwcong on 2016/12/26.
 */

var task = [];

function render() {

    var display = document.getElementById("display");
    display.innerHTML="";

    for (var i=0;i<task.length;i++){
        var span=document.createElement("span");
        span.className="block";
        span.innerHTML=task[i];
        display.appendChild(span);
    }

}

function initView() {

    var input = document.getElementById("input-value");

    document.getElementById("btn-add-left").onclick=function () {
        if(input.value){
            task.unshift(input.value);
            input.value="";
            render();
        }

    };
    document.getElementById("btn-add-right").onclick=function () {
        if(input.value){
            task.push(input.value);
            input.value="";
            render();
        }
    };
    document.getElementById("btn-remove-left").onclick=function () {
        task.shift();
        render();
    };
    document.getElementById("btn-remove-right").onclick=function () {
        task.pop();
        render();
    }

}

function init() {
    initView();
}

init();