var window_width;
var window_height;
var RADIUS;
var margin_left;
var margin_top;
const endTime=new Date(2017,6,7,0,0,0);
var curShowTimeSeconds=0;
var balls=[];
const colors=["#33B5E","#0099CC","#AA66CC","#9933CC","#669900"]
window.onload=function(){
	window_height=document.body.clientHeight;
	window_width=document.body.clientWidth;
	margin_left=Math.round(window_width/10);
	margin_top=Math.round(window_height/5)+100;
	RADIUS=Math.round(window_width*4/10/108)-1;
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=window_width;
	canvas.height=window_height;
	curShowTimeSeconds=getCurrentShowTimeSeconds();
	setInterval(
		function(){
			render(context);
			update();
		},50)
}
function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;
	var nextDays=parseInt(curShowTimeSeconds/3600/24);
	var nextReDays=parseInt(nextDays/100);

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;
	var curDays=parseInt(curShowTimeSeconds/3600/24);
	var curReDays=parseInt(curDays/100);
	if(nextSeconds!=curSeconds){
		if(parseInt(nextDays/100)!=parseInt(curDays/100)){
			addBalls(margin_left+0,30,parseInt(curDays/100));
		}
		if(parseInt(nextDays/10-10*nextReDays)!=parseInt(curDays/10-10*curReDays)){
			addBalls(margin_left+15*(RADIUS+1),30,parseInt(curDays/10-10*curReDays));
		}
		if(parseInt(nextDays%10)!=parseInt(curDays%10)){
			addBalls(margin_left+39*(RADIUS+1),30,parseInt(nextDays%100));
		}
		//
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(margin_left+0,margin_top,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(margin_left+15*(RADIUS+1),margin_top,parseInt(curHours/10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(margin_left+39,margin_top,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(margin_left+54*(RADIUS+1),margin_top,parseInt(curMinutes/10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(margin_left+78*(RADIUS+1),margin_top,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(margin_left+93*(RADIUS+1),margin_top,parseInt(nextSeconds/10));
		}

		curShowTimeSeconds=nextShowTimeSeconds;
	}
	updateBalls();
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=window_height-RADIUS){
			balls[i].y=window_height-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<window_width){
			balls[cnt++]=balls[i];
		}
	}
	while(balls.length>cnt){
		balls.pop();
	}
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}
function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}
function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);
	var days=parseInt(curShowTimeSeconds/3600/24);
	var hours=parseInt(curShowTimeSeconds/3600-days*24);
	var minutes=parseInt((curShowTimeSeconds-hours*3600-days*24*3600)/60);
	var seconds=curShowTimeSeconds%60;
	var reDays=parseInt(days/100);
	//天数
	renderDigit(margin_left+200,30,parseInt(days/100),cxt);
	renderDigit(margin_left+15*(RADIUS+1)+200,30,parseInt(days/10-10*reDays),cxt);
	renderDigit(margin_left+30*(RADIUS+1)+200,30,parseInt(days%10),cxt);
	// 时间
	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
	renderDigit(margin_left+15*(RADIUS+1),margin_top,parseInt(hours%10),cxt);
	renderDigit(margin_left+30*(RADIUS+1),margin_top,10,cxt);
	renderDigit(margin_left+39*(RADIUS+1),margin_top,parseInt(minutes/10),cxt);
	renderDigit(margin_left+54*(RADIUS+1),margin_top,parseInt(minutes%10),cxt);
	renderDigit(margin_left+69*(RADIUS+1),margin_top,10,cxt);
	renderDigit(margin_left+78*(RADIUS+1),margin_top,parseInt(seconds/10),cxt);
	renderDigit(margin_left+93*(RADIUS+1),margin_top,parseInt(seconds%10),cxt);
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}

}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="#006699";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}