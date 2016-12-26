/**
 * Created by Pwcong on 2016/12/26.
 */
var task = [];

function render() {

    var display = document.getElementById("display");
    display.innerHTML="";

    for (var i=0;i<task.length;i++){
        var div=document.createElement("div");
        div.className="block";
        div.innerHTML="<span>"+task[i]+"</span>";
        div.style.height=task[i]*3+"px";
        display.appendChild(div);
    }

}

function sortData(callback) {

    for(var j=0;j<task.length-1;j++){

        for (var k=j+1;k<task.length;k++){
            if(task[j]>task[k]){
                var t = task[j];
                task[j]=task[k];
                task[k]=t;
            }

        }

    }


    callback();
}

function checkInput(value) {

    return !(task.length > 60 || !value.match(/^\d+$/) || Number(value) < 10 || Number(value) > 100);

}

function initView() {

    var input = document.getElementById("input-value");

    document.getElementById("btn-add").onclick=function () {
        if(input.value){
            if(checkInput(input.value)){
                task.push(Number(input.value));

                sortData(function () {
                    render();
                });

            }else {
                alert("请输入大于等于10且小于等于100的数字！")
            }
            input.value="";
        }

    };

}

function init() {
    initView();
}

init();