var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");
//ucitavanje slika
var bg= new Image();
var bird=new Image();
var fg=new Image();
var pipeNorth=new Image();
var pipeSouth=new Image();
var gameover=new Image();





bg.src="images/bg.png"
bird.src="images/bird.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";
gameover.src="images/gameover.png";

// variables
var gap = 85;
var score = 0;
var bx = 10;
var by = 150;
var gravity = 1.25;
var prvi=document.getElementById("prvi");
var dugme=document.getElementById("start");
var localStorageName="crackalien";
var sisa=document.getElementById("kurac");
//restart igre
function re(){
  location.reload();
}
dugme.onclick=re;

//ucitavanje zvuka
var fly= new Audio();
var scor= new Audio();
var dead= new Audio();

fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";
dead.src="sounds/dead.mp3";

// kretanje
document.addEventListener("keydown",dizi);
function dizi(){
	by-=40;
	fly.play();
}
// cevi
var pipe=[];
pipe[0]={
	x:cvs.width,
	y:0
}
//funkcija koja crta 

function crtaj(){
 ctx.drawImage(bg,0,0);
 ctx.drawImage(bird,bx,by);
 
 for (var i=0;i<pipe.length;i++){
 var constant= pipeNorth.height+gap;
 ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
 ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
 pipe[i].x--;
  if ( pipe[i].x == 115){
  	pipe.push({
  		x: cvs.width,
  		y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
  	});
  }
  // sudar
  if(bx+bird.width >= pipe[i].x && bx<=pipe[i].x+pipeNorth.width &&
  	(by <=pipe[i].y+pipeNorth.height || by+bird.height>=pipe[i].y+constant )|| by+bird.height>=cvs.height-fg.height){
  		dead.play();
    if(localStorage.getItem(localStorageName) == null) {
    highScore = 0;
} else {
    highScore = localStorage.getItem(localStorageName);
}
    // pamcenje highscora
    highScore = Math.max(score, highScore);
    localStorage.setItem(localStorageName, highScore);
    
   // game over na ekranu
    ctx.font="30px Comic Sans MS";
    ctx.fillText("GAME OVER" ,55,180);
    
  
  clearInterval(game);
}
   if( pipe[i].x==5){
  	score ++;
  	scor.play();
  	
  }	}
 

 
 ctx.drawImage(fg,0,cvs.height-fg.height);

 by += gravity; 
 //score 
ctx.fillStyle="black";
 ctx.font="20px Comic Sans MS";
 ctx.fillText("SCORE: " + score,10,cvs.height-20);
//highscore
ctx.fillStyle="black";
 nesto= localStorage.getItem("crackalien");
 ctx.font="20px Comic Sans MS";
 ctx.fillText("HIGHSCORE: " + nesto,130,cvs.height-20);

}

game=setInterval(crtaj,1000/60);

