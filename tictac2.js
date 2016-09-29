function Board(t){

board = {};//{ tl:'',tm:'',tr:'',ml:'',mm:'',mr:'',bl:'',bm:'',br:''};
areas = { 0:'tl',1:'tm',2:'tr',3:'ml',4:'mm',5:'mr',6:'bl',7:'bm',8:'br'};
positions = {X:[[0,0,0],[0,0,0],[0,0,0]],
O:[[0,0,0],[0,0,0],[0,0,0]]}; 
turn = t;

win = false;
cturn = false;
full = false;
this.updateBoard = function(event){
	var x = event.target.id;
	
	

    switch (x) {
		case "tl":
			updateCase(0,0,"tl");
		break;
		case "tm":
			updateCase(0,1,"tm");
		break;
		case "tr":
			updateCase(0,2,"tr");
		break;
		case "ml":
			updateCase(1,0,"ml");
		break;
		case "mm":
			updateCase(1,1,"mm");
		break;
		case "mr":
			updateCase(1,2,"mr");
		break;
		case "bl":
			updateCase(2,0,"bl");
		break;
		case "bm":
			updateCase(2,1,"bm");
		break;
		case "br":
			updateCase(2,2,"br");
		break;		
		}//end switch
		
		
	}// end updateBoard function
	updateSquare = function(x){
			
			document.getElementById(x).innerHTML = turn;
			if( turn == 'X')
			document.getElementById(x).style.color = '#9900FF';
			else
				document.getElementById(x).style.color = '#FF0066';

	}
	updateTurn = function(){
	
		full = boardFull();
		
		if( turn == 'X')
			turn = 'O';
		else
			turn = 'X';

		if( full){
		win = true;
		alert("TIE!");	
		document.location.reload();
		replay();}
		
	}
	
			
		
		

	
  updateCase = function(i,j,pos){

			if(!board[pos] && !win ){
			board[pos] = turn;
			updatePos(i,j);
			updateSquare(pos);

			if(winner(positions[turn])){
				alert(turn + " WINS!");	
				document.location.reload();
				win = true;	
				replay();
			}
			if( !win){
				updateTurn();
				computerTurn();
				
				}
			
			}

	}

  updatePos = function(x,y){
	
	positions[turn][x][y] = 1;
	
	

	}

 winner = function(position){
		wins = false;
		
		for( var i = 0; i < 3; i++ )
			wins |= ((position[i][0] + position[i][1] + position[i][2]) == 3);
		
		for(  i = 0; i < 3; i++ )
			wins |= ((position[0][i] + position[1][i] + position[2][i]) == 3);
		
		wins |= ((position[0][0] + position[1][1] + position[2][2]) == 3);
		wins |= ((position[0][2] + position[1][1] + position[2][0]) == 3);
	
		
		return wins;

	
	
	

	}	


computerTurn = function(){
	xpos = 0;
	ypos = 0;
	full = boardFull();
	
	if(!full){
		do{
			xpos = Math.floor(Math.random() * 3);
			ypos = Math.floor(Math.random() * 3);

		}while( !win && positions.X[xpos][ypos] == 1 || positions.O[xpos][ypos] == 1);
	
	
	npos = think();
	npos.sort(function(a,b){
			return b[2] - a[2];});
	
	if( npos[0][2] != 0 ){
	xpos = npos[0][0];
	ypos = npos[0][1];}
	else if(Object.keys(board).length <= 2 ){
	if( positions.X[1][1] == 0 && positions.O[1][1] == 0){
			xpos = 1;
			ypos = 1;
		
		}
	else if( positions.X[0][0] == 0 && positions.O[0][0] == 0){
			xpos = 0;
			ypos = 0;
		
		}
	else if( positions.X[0][2] == 0 && positions.O[0][2] == 0){
			xpos = 0;
			ypos = 2;
		
		}
	else if( positions.X[2][0] == 0 && positions.O[2][0] == 0){
			xpos = 2;
			ypos = 0;
		
		}
	else if( positions.X[2][2] == 0 && positions.O[2][2] == 0){
			xpos = 2;
			ypos = 2;
		
		}
	

	}
	
	y = areas[3*xpos+ypos];
	board[y] = turn;
		document.getElementById(y).innerHTML = turn;
			if( turn == 'X')
			document.getElementById(y).style.color = '#9900FF';
			else
				document.getElementById(y).style.color = '#FF0066';		

	updatePos(xpos,ypos);
	if(winner(positions[turn])){
				alert(turn + " WINS!");	
				document.location.reload();
				win = true;	
				replay();}
	updateTurn();
	}// if !full
	
}

boardFull= function(){

		
			if( Object.keys(board).length == 9 )
				return true;
			


return false;	

}

think = function(){

	xs = JSON.parse(JSON.stringify(positions.X));
	os = JSON.parse(JSON.stringify(positions.O));
	value = 0;
	moves = [];
	temp = [];
	nextTurn = (turn === 'X') ? 'O' : 'X';
	
	for( var i = 0; i < 3; i++ )
		for( var j = 0; j < 3; j++ ){
			if( xs[i][j] == 0 && os[i][j] == 0 ){
				os[i][j] = 1;
				value = thinking(xs,os,nextTurn);
				if( value == 1 ){			
				temp.push(i,j,2);
				moves.push(temp);
				temp = [];}
				os[i][j] = 0;
				xs[i][j] = 1;
				value = thinking(xs,os,nextTurn);
				if( value == -1 ){
				temp.push(i,j,1);
				moves.push(temp);
				temp = [];

				}
				xs[i][j] = 0;
				temp.push(i,j,0);
				moves.push(temp);
				temp = [];
			} 
			
			
		}
	
	return moves;
}

thinking = function(xs, os, who ){
		nxs = JSON.parse(JSON.stringify(xs));
		nos = JSON.parse(JSON.stringify(os));
		
				
				
				if( winner(nxs))
					return -1;
				
			
				if( winner(nos) )
				return 1;

				
				return 0;
			
			

		


		
		
}
clearBoard = function(){
	board = { tl:'',tm:'',tr:'',ml:'',mm:'',mr:'',bl:'',bm:'',br:''};
areas = { 0:'tl',1:'tm',2:'tr',3:'ml',4:'mm',5:'mr',6:'bl',7:'bm',8:'br'};
positions = {X:[[0,0,0],[0,0,0],[0,0,0]],
O:[[0,0,0],[0,0,0],[0,0,0]]}; 
turn = t;
win = false;
cturn = false;
full = false;

for( var i = 0; i < 9; i++ )
		document.getElementById(areas[i]).innerHTML = '';

	

}

replay = function(){
		result = window.confirm("Play Again?");
				if( result ){
						
						clearBoard();
						
						
				}

		}

this.callComputer = function(){
	
	
if( Math.floor(Math.random() * 2)){
	updateTurn();
	computerTurn();
}

}


}//end of Board constructor



startx = function(event){

var board = new Board('X');
board.callComputer();


var parent = document.getElementById('board');
parent.addEventListener('click', board.updateBoard);
document.getElementById("menu").style.zIndex = 0;



}
starto = function(event){

var board = new Board('O');
board.callComputer();


var parent = document.getElementById('board');
parent.addEventListener('click', board.updateBoard);
document.getElementById("menu").style.zIndex = 0;



}


var h = document.getElementById("selectx");
h.onclick=startx;
var h1 = document.getElementById("selecto");
h1.onclick=starto;


    

