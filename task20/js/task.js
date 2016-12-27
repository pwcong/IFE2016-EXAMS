/**
 * Created by Pwcong on 2016/12/26.
 */
/**
 * Created by Pwcong on 2016/12/26.
 */
var task = [];

function render(highlight) {

    var display = document.getElementById("display");
    display.innerHTML="";

    for (var i=0;i<task.length;i++){
        var div=document.createElement("div");
        div.className="block";
        div.innerHTML="<span>"+task[i]+"</span>";

        if(highlight){
            for (var j=0;j<highlight.length;j++){
                if(highlight[j]==task[i])
                    div.style.backgroundColor = "orange";

            }
        }

        display.appendChild(div);
    }

}


function handleInput(value,callback) {

    callback(value.split(/[^\u4e00-\u9fa5a-zA-Z]/));

}

function initView() {

    var input = document.getElementById("input-value");

    document.getElementById("btn-add").onclick=function () {
        if(input.value){
            handleInput(input.value,function (res) {
                for(var k=0;k<res.length;k++)
                    res[k]&&task.push(res[k]);
                render();
            });
            input.value="";

        }

    };

    document.getElementById("btn-search").onclick=function () {
        if(input.value){
            handleInput(input.value,function (highlight) {
                render(highlight);
            });
            input.value="";
        }
    }

}

function init() {
    initView();
}

init();