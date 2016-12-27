/**
 * Created by Pwcong on 2016/12/27.
 */

function createNode(id,left,right) {

    return {
        id:id,
        left:left,
        right:right
    };

}


function initTree() {
    var root  =createNode("a",null,null);

    root.left = createNode("b",null,null);

    root.right = createNode("c",null,null);

    root.left.left = createNode("d",null,null);
    root.left.right = createNode("e",null,null);

    root.right.left = createNode("f",null,null);
    root.right.right = createNode("g",null,null);

    root.left.left.left = createNode("h",null,null);
    root.left.left.right = createNode("i",null,null);
    root.left.right.left = createNode("j",null,null);
    root.left.right.right = createNode("k",null,null);

    root.right.left.left = createNode("l",null,null);
    root.right.left.right = createNode("m",null,null);
    root.right.right.left = createNode("n",null,null);
    root.right.right.right = createNode("o",null,null);

    return root;

}

function DLR(node,callback) {

    if(callback)
        callback(node.id);
    if(node.left)
        DLR(node.left,callback);
    if(node.right)
        DLR(node.right,callback);



}

function LDR(node,callback) {

    if(node.left)
        DLR(node.left);

    if(callback)
        callback(node.id,callback);

    if(node.right)
        DLR(node.right,callback);

}

function LRD(node,callback) {

    if(node.left)
        DLR(node.left,callback);

    if(node.right)
        DLR(node.right,callback);

    if(callback)
        callback(node.id);

}


function createView(parent,node) {



    if(node.left){
        var leftDiv = document.createElement("div");
        leftDiv.className="node";
        leftDiv.id=node.left.id;

        parent.appendChild(leftDiv);

        createView(leftDiv,node.left);
    }

    if(node.right){
        var rightDiv = document.createElement("div");
        rightDiv.className="node";
        rightDiv.id=node.right.id;

        parent.appendChild(rightDiv);
        createView(rightDiv,node.right);
    }
}

function displayNode(nodeDivs,queue) {

    var index=0;

    var timer = setInterval(function () {

        for(var i=0;i<nodeDivs.length;i++){


            if(nodeDivs[i].id==queue[index])
                nodeDivs[i].className="node active";

            else
                nodeDivs[i].className="node";
        }

        index++;
    },1000);

    setTimeout(function () {
        clearInterval(timer);

        for(var i=0;i<nodeDivs.length;i++){

            nodeDivs[i].className="node";

        }

    },queue.length*1000+1000);
}

function init() {

    var tree = initTree();
    var container = document.getElementById("container");
    var root = document.createElement("div");
    root.className="node";
    root.id=tree.id;
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
    document.getElementById("btn-ldr").onclick=function () {

        queue = [];

        LDR(tree,function (id) {
            queue.push(id);
        });

        displayNode(nodeDivs,queue);

    };
    document.getElementById("btn-lrd").onclick=function () {

        queue = [];

        LRD(tree,function (id) {
            queue.push(id);
        });

        displayNode(nodeDivs,queue);
    };
}


init();


