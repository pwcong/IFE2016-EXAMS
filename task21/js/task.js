/**
 * Created by Pwcong on 2016/12/26.
 */
/**
 * Created by Pwcong on 2016/12/26.
 */
var task = [];

function render() {

    var display = document.getElementById("display");
    display.innerHTML="";

    task.forEach(function (value) {
        var div=document.createElement("div");
        div.className="block";
        div.innerHTML="<span class='value'>"+value+"</span><span class='tips'>删除</span> ";

        div.onclick=function () {
            var index = task.indexOf(value);
            task.splice(index,1);
            render();
        };

        display.appendChild(div);
    });



}


function handleInput(value,callback) {

    callback(value.split(/[\s,]/));

}

function initView() {

    var input = document.getElementById("input-value");

    document.getElementById("btn-add").onclick=function () {

        if(input.value){

            handleInput(input.value,function (res) {

                for(var k=0;k<res.length;k++)

                    res[k]&&task.push(res[k])&&task.length>10&&task.shift();


                render();
            });

            input.value="";

        }

    };


}

function init() {
    initView();
}

init();