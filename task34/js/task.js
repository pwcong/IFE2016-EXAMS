var config = {
    row: 10,
    col: 10
};

var direction = ["up","right","down","left"];

var step = {
    row: config.row/2,
    col: config.col/2,
    direction: 0
};

var blocks = [];

function render() {

    var player = document.getElementById("player");
    player.style.left = blocks[step.row][step.col].offsetLeft+"px";
    player.style.top = blocks[step.row][step.col].offsetTop+"px";

    switch (direction[step.direction]){
        case "up":
            player.style.transform = "rotate(0deg)";
            break;
        case "right":
            player.style.transform = "rotate(90deg)";
            break;
        case "down":
            player.style.transform = "rotate(180deg)";
            break;
        case "left":
            player.style.transform = "rotate(270deg)";
            break;
        default:break;
    }

}

function initHeader(parent,col) {

    var row_header = document.createElement("div");
    row_header.className = "row";

    var block_header_first = document.createElement("div");
    block_header_first.className = "block block-header";
    row_header.appendChild(block_header_first);

    for(var i=0;i<col;i++){
        var block_header = document.createElement("div");
        block_header.className = "block block-header";
        block_header.innerHTML = "<span>" + i + "</span>";
        row_header.appendChild(block_header);
    }

    parent.appendChild(row_header);

}

function initRow(parent,row,col) {

    for(var i=0;i<row;i++){

        var row_main = document.createElement("div");
        row_main.className = "row";

        var block_header = document.createElement("div");
        block_header.className = "block block-header";
        block_header.innerHTML = "<span>" + i + "</span>";
        row_main.appendChild(block_header);

        blocks[i] = [];

        for(var j=0;j<col;j++){
            var block = document.createElement("div");
            block.className = "block";

            blocks[i][j]=block;

            row_main.appendChild(block);
        }

        parent.appendChild(row_main);
    }

}


function checkCommand(command,callback) {

    var args = command.trim().split(" ");

    if(args.length<1 || args.length>2)
        return null;

    var doWhat = args[0];
    var arg = null;

    if(args.length>1)
        arg = args[1];

    switch (doWhat){

        case "GO":
            switch (direction[step.direction]){

                case "up":
                    if(step.row-1>=0)
                        step.row -= 1;
                    break;
                case "right":
                    if(step.col+1<config.col)
                        step.col+=1;
                    break;
                case "down":
                    if(step.row+1<config.row)
                        step.row+=1;
                    break;
                case "left":
                    if(step.col-1>=0)
                        step.col-=1;
                    break;
                default:break;

            }
            break;
        case "TUN":
            if(arg){
                switch (arg){
                    case "LEF":

                        step.direction = (step.direction+direction.length-1)%direction.length;

                        break;
                    case "RIG":

                        step.direction = (step.direction+direction.length+1)%direction.length;

                        break;
                    case "BAC":

                        step.direction = (step.direction+direction.length+2)%direction.length;

                        break;
                    default:break;

                }
            }

            break;
        default:break;

    }

    callback();

}


function initTools() {

    var input_command = document.getElementById("input-command");
    var button = document.getElementById("button");

    button.onclick = function () {
        var command = input_command.value;
        checkCommand(command,function () {
            render();
        })

    }


}

function initView() {

    var container = document.getElementById("container");
    initHeader(container,config.col);
    initRow(container,config.row,config.col);
    initTools();

}

function init() {
    initView();
    render();
}

init();