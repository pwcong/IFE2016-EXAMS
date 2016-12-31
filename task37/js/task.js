/**
 * Created by Pwcong on 2016/12/30.
 */

function showFloatLayer() {
    var mask_layer = document.getElementById("mask-layer");
    mask_layer.className = "active";
    var float_layer = document.getElementById("float-layer");
    float_layer.className = "active";
    var float_layer_main = document.getElementById("float-layer-main");
    float_layer_main.className = "active";
}

function hideFloatLayer() {

    var mask_layer = document.getElementById("mask-layer");
    mask_layer.className = "";

    var float_layer = document.getElementById("float-layer");
    float_layer.className = "";

    var float_layer_main = document.getElementById("float-layer-main");
    float_layer_main.className = "";

}

function initButton() {
    document.getElementById("btn_show").onclick = function () {
      showFloatLayer();
    };

    document.getElementById("btn_hide").onclick = function () {
        hideFloatLayer();
    };


}

function initView() {

    initButton();

}

function init() {
    initView();
}

init();