/**
 * Created by Pwcong on 2016/12/25.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
};

var nums = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

/**
 * 渲染图表
 */
function renderChart() {

    var city_select = document.getElementById("city-select");
    var aqi_chart_wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
    aqi_chart_wrap.innerHTML = "";

    var data = chartData[city_select.options[pageState.nowSelectCity].innerHTML][pageState.nowGraTime];

    var width = "";
    switch (pageState.nowGraTime){
        case "day":
            width = "20px";
            break;
        case "week":
            width = "80px";
            break;
        case "month":
            width = "100px";
            break;
        default:break;
    }
    for(var item in data){
        var div = document.createElement("div");
        div.className = "aqi-chart-wrap-item";
        div.innerHTML = "<p>"+item+"</p><p>"+data[item]+"</p>";
        div.style.height = data[item]+"px";
        div.style.width = width;
        div.style.backgroundColor = "#"+nums[Math.round(Math.random()*15)]+nums[Math.round(Math.random()*15)]+
            nums[Math.round(Math.random()*15)]+nums[Math.round(Math.random()*15)]+
            nums[Math.round(Math.random()*15)]+nums[Math.round(Math.random()*15)];

        console.log(div.style.color);
        aqi_chart_wrap.appendChild(div);
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
    // 确定是否选项发生了变化
    if(pageState["nowGraTime"]==value)
        return;

    // 设置对应数据
    pageState["nowGraTime"]=value;

    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(selectedIndex) {
    // 确定是否选项发生了变化
    if(pageState["nowSelectCity"]==selectedIndex)
        return;

    // 设置对应数据
    pageState["nowSelectCity"]=selectedIndex;

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var gra_times = document.getElementsByName("gra-time");
    for(var i=0;i<gra_times.length;i++){
        gra_times[i].onclick = function () {
            graTimeChange(this.value);
        };
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    var select = document.getElementById("city-select");
    select.innerHTML="";

    for(var city in aqiSourceData){

        var option = document.createElement("option");
        option.innerHTML = city;
        select.appendChild(option);
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.onchange = function () {

        citySelectChange(select.selectedIndex);


    };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    for(var city in aqiSourceData){

        chartData[city] = {};

        var weekCount = 0;
        var weekIndex = 1;
        var weekSum = 0;

        var str = "";

        var monthKey = "";
        var lastKey = "";
        for(var t1 in aqiSourceData[city]){
            str = t1.split("-");
            monthKey = str[0]+"-"+str[1];
            break;
        }
        var monthCount = 0;
        var monthSum = 0;

        var day = {};
        var week = {};
        var month = {};

        for(var d in aqiSourceData[city]){
            day[d]=aqiSourceData[city][d];

            weekSum += day[d];
            weekCount++;

            if(weekCount>=7){
                week["第"+weekIndex+"周"]=weekSum/weekCount;
                weekIndex++;
                weekSum=0;
                weekCount=0;
            }

            str = d.split("-");
            lastKey = str[0]+"-"+str[1];
            monthCount++;
            monthSum+=day[d];
            if (monthKey!=(str[0]+"-"+str[1])){

                month[monthKey]=monthSum/monthCount;
                monthCount=0;
                monthSum=0;
                monthKey=str[0]+"-"+str[1];

            }

        }
        if(weekCount>0)
            week["第"+weekIndex+"周"]=weekSum/weekCount;
        month[lastKey] = monthSum/monthCount;

        chartData[city]["day"]=day;
        chartData[city]["week"]=week;
        chartData[city]["month"]=month;



    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();