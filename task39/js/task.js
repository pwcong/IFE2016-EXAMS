/**
 * Created by Pwcong on 2017/1/3.
 */

function initView(){

    var table_container = document.getElementById("table-container");
    table_container.onscroll = function () {
        console.log(table_container.scrollHeight+"***"+table_container.scrollTop);
    }


}

function init() {
    initView();
}

init();