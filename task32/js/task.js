/**
 * Created by Pwcong on 2016/12/29.
 */

var config_input = {
    label: '名称',                      // 表单标签
    type: 'text',                      // 表单类型
    validator: function (value) {

        return !(value.length < 4 || value.length > 16);

    },                                  // 表单验证规
    rules: '必填，长度为4-16个字符',    // 填写规则提示
    success: '格式正确',                // 验证通过提示
    fail: '格式不正确'                // 验证失败提示
};

function createInput() {

    var input_root = document.createElement("div");
    input_root.className = "input-root";


    var input_main = document.createElement("div");
    input_main.className = "input-main";
    input_root.appendChild(input_main);
    var input_tips = document.createElement("div");
    input_tips.className = "input-tips";
    input_root.appendChild(input_tips);


    var span_name = document.createElement("span");
    span_name.innerHTML = "<strong>"+config_input.label+"</strong>";
    input_main.appendChild(span_name);

    var input_value = document.createElement("input");
    input_value.type = config_input.type;
    input_main.appendChild(input_value);

    var button = document.createElement("button");
    button.innerHTML = "验证";
    input_main.appendChild(button);

    var span_tips = document.createElement("span");
    span_tips.innerHTML = config_input.rules;
    input_tips.appendChild(span_tips);


    input_value.onfocus = function () {
        span_tips.innerHTML = config_input.rules;
        span_tips.className = "";
    };

    var canPost = false;

    input_value.onblur = function () {

        if(config_input.validator(input_value.value)){

            input_value.className = "success";
            span_tips.innerHTML = config_input.success;
            span_tips.className = "success";
            canPost = true;
        }else {
            input_value.className = "error";
            span_tips.innerHTML = config_input.fail;
            span_tips.className = "error";
            canPost = false
        }
    };

    button.onclick = function () {
        if(canPost){
            alert("提交成功！");
            input_value.value = "";
            input_value.className = "";
            span_tips.innerHTML = config_input.rules;
            span_tips.className = "";

            canPost = false;
        }

    };


    return input_root;

}

function initView() {
    var container = document.getElementById("container");
    container.appendChild(createInput());
}

function init() {
    initView();
}

init();

