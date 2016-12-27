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


function createView(parent,node,id) {
    if(node.left){
        var leftDiv = document.createElement("div");
        if(node.left.id==id)
            leftDiv.className="node active";


        else
            leftDiv.className="node";
        parent.appendChild(leftDiv);
        createView(leftDiv,node.left,id);
    }
    if(node.right){
        var rightDiv = document.createElement("div");
        if(node.left.id==id)
            rightDiv.className="node active";

        else
            rightDiv.className="node";
        parent.appendChild(rightDiv);
        createView(rightDiv,node.right,id);
    }
}


var tree = initTree();
var root = document.getElementById("root");


DLR(tree,function (id) {
    root.innerHTML="";
    createView(root,tree,id);
    console.log(id);
});








