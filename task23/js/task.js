/**
 * Created by Pwcong on 2016/12/27.
 */

function createNode(id) {

    return {
        id:id,
        nodes: []
    };

}


function initTree() {
    var tree  =createNode("a");

    tree.nodes.push(createNode("b"));
    tree.nodes.push(createNode("c"));
    tree.nodes.push(createNode("d"));

    tree.nodes[0].nodes.push(createNode("e"));
    tree.nodes[1].nodes.push(createNode("f"));
    tree.nodes[1].nodes.push(createNode("g"));
    tree.nodes[2].nodes.push(createNode("h"));
    tree.nodes[2].nodes.push(createNode("i"));
    tree.nodes[2].nodes.push(createNode("j"));

    tree.nodes[0].nodes[0].nodes.push(createNode("k"));
    tree.nodes[1].nodes[0].nodes.push(createNode("l"));
    tree.nodes[1].nodes[0].nodes.push(createNode("m"));
    tree.nodes[1].nodes[1].nodes.push(createNode("n"));
    tree.nodes[2].nodes[0].nodes.push(createNode("o"));
    tree.nodes[2].nodes[0].nodes.push(createNode("p"));
    tree.nodes[2].nodes[1].nodes.push(createNode("q"));
    tree.nodes[2].nodes[2].nodes.push(createNode("r"));
    tree.nodes[2].nodes[2].nodes.push(createNode("s"));


    return tree;

}

function DLR(node,callback) {

    callback(node.id);

    if(node.nodes){
        for (var i=0;i<node.nodes.length;i++){
            DLR(node.nodes[i],callback);
        }
    }


}


function createView(parent,node) {

    for(var i=0;i<node.nodes.length;i++){
        var div = document.createElement("div");
        div.id=node.nodes[i].id;
        div.className="node";
        div.innerHTML="<span>"+node.nodes[i].id+"</span>";
        parent.appendChild(div);
        createView(div,node.nodes[i]);

    }


}

function displayNode(nodeDivs,queue,callback) {

    var index = 0;

    var timer = setInterval(function () {

        for(var i=0;i<nodeDivs.length;i++){
            if(queue[index]==nodeDivs[i].id)
                nodeDivs[i].className="node active";
            else
                nodeDivs[i].className="node";
        }

        if(index<queue.length-1)
            index++;


    },500);

    setTimeout(function () {
        clearInterval(timer);

        for(var i=0;i<nodeDivs.length;i++){
            nodeDivs[i].className="node";
        }
        if(callback)
            callback();
    },500*queue.length+500);

}

function init() {

    var tree = initTree();
    var container = document.getElementById("container");
    var root = document.createElement("div");
    root.className="node";
    root.id=tree.id;
    root.innerHTML="<span>"+tree.id+"</span>";
    container.appendChild(root);

    createView(root,tree);

    var nodeDivs = document.getElementsByClassName("node");

    var queue = [];


    document.getElementById("btn-dlr").onclick=function () {

        queue = [];
        DLR(tree,function (id) {
            queue.push(id);
        });
        displayNode(nodeDivs,queue);


    };

    var input = document.getElementById("input-value");

    document.getElementById("btn-search").onclick=function () {
        queue = [];

        if(input.value){
            DLR(tree,function (id) {
                queue.push(id)
            });

            var value = input.value;

            if(queue.indexOf(value)!=-1){
                queue.splice(queue.indexOf(value),queue.length-queue.indexOf(value));
                console.log(queue);
                displayNode(nodeDivs,queue,function () {
                    document.getElementById(value).className="node result";
                });
            }else {
                displayNode(nodeDivs,queue,function () {
                    alert("所要查找的信息不存在！")
                })
            }

            input.value="";


        }


    };
}


init();


