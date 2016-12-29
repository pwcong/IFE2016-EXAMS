/**
 * Created by Pwcong on 2016/12/29.
 */

var selectedOption = {
    city: null,
    school: null
};

function getCityWithSchool() {
    return {
        shenzhen: {
            name: "深圳",
            school: {
                shenzhendaxue: "深圳大学",
                nanfangkejidaxue: "南方科技大学"
            }
        },
        beijing: {
            name: "北京",
            school: {
                beijingdaxue: "北京大学",
                qinghuadaxue: "清华大学"
            }
        },
        shanghai: {
            name: "上海",
            school: {
                fudandaxue: "复旦大学",
                shanghaidaxue: "上海大学"
            }
        }
    };
}

function initSelect() {

    var select_city = document.getElementById("select-city");
    var select_school = document.getElementById("select-school");

    select_city.innerHTML = "";
    select_school.innerHTML = "";

    var cws = getCityWithSchool();

    var ready = false;

    for (var city in  cws){

        var option = document.createElement("option");
        option.value = city;
        option.innerHTML = cws[city].name;
        select_city.appendChild(option);

        if(!ready){

            selectedOption.city = city;

            var childReady = false;

            for(var school in cws[city].school){
                var childOption = document.createElement("option");
                childOption.value = school;
                childOption.innerHTML = cws[city].school[school];
                select_school.appendChild(childOption);

                if(!childReady){
                    selectedOption.school=school;
                    childReady = true;
                }

            }
            ready = true;
        }

    }

    select_city.onchange = function () {

        select_school.innerHTML = "";

        var childReady = false;

        var city = select_city.options[select_city.selectedIndex].value;
        selectedOption.city = city;

        for(var school in cws[city].school){

            var childOption = document.createElement("option");
            childOption.value = school;
            childOption.innerHTML = cws[city].school[school];
            select_school.appendChild(childOption);

            if(!childReady){
                selectedOption.school=school;
                childReady = true;
            }

        }
    };

    select_school.onchange = function () {

        var school = select_school.options[select_school.selectedIndex].value;
        selectedOption.school = school;

    }

}


function initRadio() {
    var radio_role_student = document.getElementById("radio-role-student");
    var radio_role_other = document.getElementById("radio-role-other");

    var radio_result_select = document.getElementById("radio-result-select");
    var radio_result_input = document.getElementById("radio-result-input");

    radio_role_student.onclick = function () {
        radio_result_select.className = "";
        radio_result_input.className = "disable";
    };

    radio_role_other.onclick = function () {
        radio_result_select.className = "disable";
        radio_result_input.className = "";
    };
}



function initView() {

    initRadio();
    initSelect();
}




function init() {
    initView();
}


init();








