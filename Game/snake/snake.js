var DIR={
	DIR_LEFT:1,
	DIR_TOP:2,
	DIR_RIGHT:3,
	DIR_BOTTOM:4
};

// 全局变量
var map={width:900,height:500};//主界面宽高
var box={width:50, height:50};//小盒子宽高
var nums={
	hNum:map.width/box.width,
	vNum:map.height/box.height
};
var snake=[];//保存蛇身体
var other=[];//除蛇外其他部分
var dir=DIR.DIR_RIGHT;//默认蛇向右移动

window.onload=function(){
	initMap();//初始化界面
    showFood();//随机产生食物
    setInterval(snakeMove,400);
    document.onkeyup=function(e){
    	switch(e.keyCode){
    		case 37:{if(dir==DIR.DIR_RIGHT)break;else{dir=DIR.DIR_LEFT;break;}}
    		case 38:{if(dir==DIR.DIR_BOTTOM)break;else{dir=DIR.DIR_TOP;break;}}
    		case 39:{if(dir==DIR.DIR_LEFT)break;else{dir=DIR.DIR_RIGHT;break;}}
    		case 40:{if(dir==DIR.DIR_TOP)break;else{dir=DIR.DIR_BOTTOM;break;}}
    		default:break;
    	}
    }
 
}
function initMap(){
	var map_target=document.getElementById("map");
	map_target.style.width=map.width+"px";
	map_target.style.height=map.height+"px";
	var newSpan=null;
	for(var i=1;i<=nums.hNum*nums.vNum;i++){
		newSpan=document.createElement("span");
		newSpan.style.width=box.width+"px";
		newSpan.style.height=box.height+"px";
		newSpan.id=i;
		map_target.appendChild(newSpan);
		if(i<=5){
            newSpan.className="snake";
            snake.push(newSpan);
		}else{
			newSpan.className="";
			other.push(newSpan);
		}
	}
}
//随机产生食物
function showFood(){
	var index=Math.floor(Math.random()*other.length);
	other[index].className="food";
}
// 蛇移动
function snakeMove(){
	var headId;//蛇头ID
	switch(dir){
		case DIR.DIR_LEFT:
		     headId=parseInt(snake[snake.length-1].id)-1;
		     if(headId%nums.hNum==0) headId+=nums.hNum;
		     break; 
		case DIR.DIR_TOP:
             headId=parseInt(snake[snake.length-1].id)-nums.hNum;
             if(headId<1) headId+=nums.hNum*nums.vNum;
             break;
	    case DIR.DIR_RIGHT:
	         headId=parseInt(snake[snake.length-1].id)+1;
             if(headId%nums.hNum==1) headId-=nums.hNum;
             break;
	    case DIR.DIR_BOTTOM:
	         headId=parseInt(snake[snake.length-1].id)+nums.hNum;
	         if(headId>nums.hNum*nums.vNum) headId-=nums.hNum*nums.vNum;
	         break; 
	    default:break;
	}
	// 判断游戏是否结束
	var head=document.getElementById(headId);// 判断蛇头是否在蛇身上
	for(var i=1;i<snake.length;i++){
		if(headId==snake[i].id){
			alert("Game Over!");
			window.location.href=window.location.href;
		}
	}
	// 计算蛇头位置
	var index;
	for(var i=1;i<other.length;i++){
		if(headId==other[i].id){
			index=i;break;
		}
	}
    other.splice(index,1);
	snake.push(head);
	if(head.className=="food"){
		showFood();
	}else{
		snake[0].className="";
		other.push(snake.shift());
	}
    head.className="snake";




}