/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {


    var cityInput = document.getElementById("aqi-city-input");
    var city = cityInput.value;
    city = city.trim();

    var valueInput = document.getElementById("aqi-value-input");
    var value = valueInput.value;
    value = value.trim();

    if(!city.match(/[^\u4e00-\u9fa5a-zA-Z]/) && value.match(/^\d+$/)){
        aqiData[city]=value;
        cityInput.value = "";
        valueInput.value = "";

    }else {
        alert("输入的内容不合法！");
    }


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    var table = document.getElementById("aqi-table");
    table.innerHTML = "";

    var tr_top = document.createElement("tr");
    tr_top.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    table.appendChild(tr_top);

    for (var t in aqiData){

        var tr = document.createElement("tr");

        var tdCity = document.createElement("td");
        tdCity.innerHTML = t;
        tr.appendChild(tdCity);

        var tdValue = document.createElement("td");
        tdValue.innerHTML = aqiData[t];
        tr.appendChild(tdValue);

        var button = document.createElement("button");
        button.innerHTML = "删除";
        button.name = t;
        button.onclick = delBtnHandle;

        tr.appendChild(button);

        table.appendChild(tr);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    delete aqiData[event.target.name];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();