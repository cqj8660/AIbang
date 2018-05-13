  var chess = document.getElementById("chess");
  var chessBoard = [];//记录棋盘的下子情况
  var context = chess.getContext("2d");
  var me = true;//记录当前是否由玩家下棋
  var gameover = false;//记录游戏是否结束
  var img = new Image();
  var MIN = -1000000;//min_value
  var MAX = 1000000;//max_value;
  var ONE = 10;//定义每一种棋型的分数
  var TWO = 100;
  var THREE = 1000;
  var FOUR = 10000;
  var FIVE = 100000;
  var HALF_ONE = 1;//被阻塞了一处的情况
  var HALF_TWO = 10;
  var HALF_THREE = 100;
  var HALF_FOUR = 1000;
  img.src = "./photo/background.png";
  for (var i = 0; i < 15; i++)//棋盘初始化
  {
      chessBoard[i] = [];
      for (var j = 0; j < 15; j++)
      chessBoard[i][j] = 0;
  }
  
  img.onload = function()
  {
    context.drawImage(img,0,0,450,450);
    drawLine();
    //画棋子
  }
  var onestep = function(i,j,type)//画棋子的函数，每次点击调用
  {
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    var gra = context.createRadialGradient(15+i*30,15+j*30,15,15+i*30,15+j*30,0);
    if(type)//如果是黑棋
    {
      gra.addColorStop(0,"#0a0a0a");
      gra.addColorStop(1,"#636766");
    }//否则是白棋
    else
    {
      gra.addColorStop(0,"#D1D1D1");
      gra.addColorStop(1,"#F9F9F9");
    }
    context.fillStyle = gra;
    context.fill();
        if(type) chessBoard[i][j] = 1;
    else chessBoard[i][j] = 2;
  }

  var type = true;//决定是白字还是黑子
  chess.onclick = function(e)
  {
	  if(!me) return;
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x/30);
    var j = Math.floor(y/30);
    if(chessBoard[i][j] == 0)
    {
    onestep(i,j,type);
    type = !type;
    }
	 if(!gameover)
   {
      me = !me;
      ai();
      me = !me;
   }
  }
  function ai()
  {
    var point = maxmin(chessBoard,2);
    onestep(point[0],point[1],type);
	
  }
  var maxmin = function(board,depth)
  {
    var best = MIN;
    var points = generate(board,depth);
    //生成待选的列表
    var choices = [];//可以下的那些棋(即作出的决策)
    for(var i = 0; i < points.length; i++)
    {
      var P = points[i];//从中选出一个结点
      board[P[0]][P[1]] = 2;//将这个位置标记为白子（？？？？）
      var v = min(board,depth - 1);//找最大值(?为什么)

      if(v == best)
        choices.push(P);

      if(v > best)
      {
        best = v;
        choices = [];
        choices.push(P);
      }

      board[P[0]][P[1]] = 0;
      var strategy = choices[Math.floor(choices.length * Math.random())];//在可以作出的决策中随机返回一个作为落子
      return strategy;
    }
  }
  var min = function(board,depth)
  {
     var value = evaluate(board);//对当前局面进行评估
     if(depth <= 0 || win(board))
      return value;

    var best = MAX;
    var points = generate(board,depth);

    for(var i = 0; i < points.length; i++)
    {
      var P = points[i];
      board[P[0]][P[0]] = 1;//将这个位置标记为黑子（？？？？）
      var v = max(board,depth - 1);
      board[P[0]][P[1]] = 0;//回溯回来要置零
      if(v < best)
        best = v;
    }
    return best;//返回当前需要的最小值
  }

  var max = function(board,depth)
  {
     var value = evaluate(board);//对当前局面进行评估
     if(depth <= 0 || win(board))
      return value;

    var best = MIN;
    var points = generate(board,depth);

    for(var i = 0; i < points.length; i++)
    {
      var P = points[i];
      board[P[0]][P[0]] = 2;//将这个位置标记为黑子（？？？？）
      var v = max(board,depth - 1);
      board[P[0]][P[1]] = 0;//回溯回来要置零
      if(v > best)
        best = v;
    }
    return best;//返回当前需要的最大值

  }
  function drawLine(){
  for(var i = 0; i < 15; i++){
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
    context.stroke();
    context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.stroke();
    }
  }