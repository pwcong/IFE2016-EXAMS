/**
 * Created by Pwcong on 2016/12/31.
 */

var config = {

    attr: ["name"],
    course: ["chinese","math","english"]

};

var translation = {
    name: "姓名",
    chinese: "语文",
    math: "数学",
    english: "英语",
    total: "总分"
};

var names = ["小明","小红","小亮","小黄","小彭"];

var students = [];

function Student(params) {

    for(var i=0;i<config.attr.length;i++){
        if(params[config.attr[i]])
            this[config.attr[i]]=params[config.attr[i]]
    }


    this.total = 0;

    for(var j=0;j<config.course.length;j++){

        if(params[config.course[j]]){
            this[config.course[j]]=params[config.course[j]];
            this.total+=params[config.course[j]];
        }
    }

}

function initData() {

    names.forEach(function (name) {

        students.push(new Student({
            name: name,
            chinese: Math.round(Math.random()*60+40),
            math: Math.round(Math.random()*60+40),
            english: Math.round(Math.random()*60+40)

        }));

    });

}

function sortByCourse(course) {

    for(var i=0;i<students.length-1;i++){

        for(var j=i+1;j<students.length;j++){

            if(students[i][course]<students[j][course]){
                var t = students[i];
                students[i]=students[j];
                students[j]=t;
            }
        }

    }

}

function render() {
    var container = document.getElementById("container");
    container.innerHTML = "";
    container.appendChild(createTableView());
}

function createTableView() {

    var table = document.createElement("table");
    table.cellSpacing = 0;

    var tr_head = document.createElement("tr");

    config.attr.forEach(function (attr) {
        var th = document.createElement("th");
        th.innerHTML = (translation[attr]||attr);
        tr_head.appendChild(th);
    });

    config.course.forEach(function (course) {
        var th = document.createElement("th");
        th.onclick = function () {
            sortByCourse(course)  ;
            render();
        };
        th.innerHTML = (translation[course]||course) + '<span class="fa fa-sort"></span>';
        tr_head.appendChild(th);
    });

    var th_total = document.createElement("th");
    th_total.onclick = function () {
        sortByCourse("total");
        render();
    };
    th_total.innerHTML = (translation["total"]||"total") + '<span class="fa fa-sort"></span>';
    tr_head.appendChild(th_total);

    table.appendChild(tr_head);

    students.forEach(function (student) {

        var tr = document.createElement("tr");

        config.attr.forEach(function (attr) {

            var td = document.createElement("td");

            if(student[attr])
                td.innerHTML = student[attr];
            else
                td.innerHTML = "";

            tr.appendChild(td);

        });

        config.course.forEach(function (course) {
            var td = document.createElement("td");

            if(student[course])
                td.innerHTML = student[course];
            else
                td.innerHTML = "";

            tr.appendChild(td);
        });

        var td_total = document.createElement("td");
        td_total.innerHTML = student.total;
        tr.appendChild(td_total);

        table.appendChild(tr);

    });

    return table;

}

function initView() {

    render();

}

function init() {
    initData();
    initView();
}

init();
